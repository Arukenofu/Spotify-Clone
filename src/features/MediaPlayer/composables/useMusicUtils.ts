import { storeToRefs } from 'pinia';

import useMusicStore from '@/features/MediaPlayer/store/useMusicStore';
import usePlaylistStore from '@/features/MediaPlayer/store/usePlaylistStore';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';

import getCommaSeparatedString from '@/shared/utils/getCommaSeparatedString';
import setTitle from '@/shared/utils/setTitle';
import type { Music } from '@/shared/models/Music';

export default function () {
  const musicStore = useMusicStore();
  const playlistStore = usePlaylistStore();
  const currentMusicStore = useCurrentMusicStore();

  const { audio, isPlaying } = storeToRefs(musicStore);
  const { currentQueue, currentPlaylist } = storeToRefs(playlistStore);
  const { currentAudioId, currentAudioData, currentAudioIndexInQueue } =
    storeToRefs(currentMusicStore);

  function playAudio() {
    audio.value!.play().then(() => {
      isPlaying.value = true;
    });

    const artistsString: string = getCommaSeparatedString(
      currentAudioData.value.artists,
      'name'
    );

    setTitle(`${currentAudioData.value.name} • ${artistsString}`, {
      temporarily: true
    });
  }

  function pauseAudio() {
    audio.value!.pause();
    isPlaying.value = false;

    setTitle('', {
      temporarily: true
    });
  }

  function loadSong(data: Music, album?: Music[]) {
    if (album) {
      currentQueue.value = album;
    }

    currentAudioId.value = data.id;

    if (audio.value && audio.value.src) {
      pauseAudio();
      audio.value.src = '';
    }

    audio.value = new Audio();
    audio.value.src = data.url;

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data.name,
        artist: getCommaSeparatedString(data.artists, 'name'),
        album: currentPlaylist.value?.name || undefined,
        artwork: [{ src: data.avatar, type: 'image/jpg', sizes: '500x500' }]
      });
      navigator.mediaSession.setActionHandler('play', playAudio);
      navigator.mediaSession.setActionHandler('pause', pauseAudio);
      navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
      navigator.mediaSession.setActionHandler('previoustrack', previousTrack);
    }

    playAudio();
  }

  function nextTrack() {
    if (currentAudioIndexInQueue.value + 1 === currentQueue.value.length) {
      return loadSong(currentQueue.value[0]);
    }

    return loadSong(currentQueue.value[currentAudioIndexInQueue.value + 1]);
  }

  function previousTrack() {
    if (currentAudioIndexInQueue.value === 0) {
      return loadSong(currentQueue.value[currentQueue.value.length - 1]);
    }

    return loadSong(currentQueue.value[currentAudioIndexInQueue.value - 1]);
  }

  function toggleTrackPlaying() {
    if (audio.value?.paused) {
      return playAudio();
    }

    pauseAudio();
  }

  return {
    loadSong,
    toggleTrackPlaying,
    nextTrack,
    previousTrack
  };
}
