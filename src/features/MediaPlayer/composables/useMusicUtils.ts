import {storeToRefs} from 'pinia';

import useMusicStore from '@/features/MediaPlayer/store/useMusicStore';
import usePlaylistStore from '@/features/MediaPlayer/store/usePlaylistStore';
import useCurrentMusicStore from '@/features/MediaPlayer/store/useCurrentMusicStore';

import musicInfoService from "@/services/api/music/apiMusicService";
import getCommaSeparatedString from '@/shared/utils/format/getCommaSeparatedString';
import setTitle from '@/shared/utils/setTitle';
import type {Track} from '@/services/types/Entities/Track';
import type {PlaylistInfo} from "@/services/api/music/types/PlaylistInfo";
import type {Playlist} from "@/services/types/Entities/Playlist";

interface LoadPlaylistOptions {
  musicId?: number;
  playlist?: PlaylistInfo;
}

interface LoadSongOrPlaylistOptions {
  index?: number;
  play?: boolean;
}

export default function () {
  const musicStore = useMusicStore();
  const playlistStore = usePlaylistStore();
  const currentMusicStore = useCurrentMusicStore();

  const { audio, isPlaying } = storeToRefs(musicStore);
  const { currentQueue, currentPlaylistInfo } = storeToRefs(playlistStore);
  const { currentAudioId, currentAudioData, currentAudioIndexInQueue } = storeToRefs(currentMusicStore);

  const {setAudioUrl} = musicStore;

  function playAudio() {
    audio.value!.play().then(() => {
      isPlaying.value = true;
    });

    if (currentAudioData.value !== null) {
      const artistsString: string = getCommaSeparatedString(
          currentAudioData.value.artists || [],
          'name'
      );

      setTitle(`${currentAudioData.value.name} • ${artistsString}`, {
        temporarily: true
      });
    }
  }

  function pauseAudio() {
    audio.value!.pause();
    isPlaying.value = false;

    setTitle('', {
      temporarily: true
    });
  }

  async function loadPlaylist(
      id: number | string,
      options: LoadPlaylistOptions = {}
  ) {
    const playlist = options.playlist;
    const musicId = options.musicId;

    if (id === playlistStore.currentPlaylistInfo?.id) {
      toggleTrackPlaying(); return;
    }

    if (!playlist) {
      const music = await musicInfoService.getPlaylistInfo(id);
      let index = music.playlistQueue.findIndex(({id}) => id === musicId);

      if (index < 0) {
        index = 0;
      }

      loadSongOrPlaylist(music, {
        index
      });
      return;
    }

    loadSongOrPlaylist(playlist);
  }

  function loadSongOrPlaylist(
      playlist: PlaylistInfo,
      options: LoadSongOrPlaylistOptions = {}
  ) {
    const index = options.index ?? 0;
    const play = options.play ?? true;

    const isSamePlaylist = playlist.playlistInfoDossier && playlist.playlistInfoDossier.id === currentPlaylistInfo.value?.id;
    const isSameTrack = index === currentAudioIndexInQueue.value;

    if (isSamePlaylist && isSameTrack) {
      toggleTrackPlaying(); return;
    }

    if (isSamePlaylist) {
      loadSongFromCurrentQueue(currentQueue.value[index], play); return;
    }

    playlistStore.setCurrentPlaylistInfo(playlist['playlistInfoDossier']);
    playlistStore.setNewQueue(playlist['playlistQueue']);

    loadSongFromCurrentQueue(currentQueue.value[index], play);
  }

  function loadSongFromCurrentQueue(data: Track, play: boolean = true) {
    currentAudioId.value = data.id;

    if (audio.value && audio.value.src) {
      pauseAudio();
      audio.value.src = '';
    }

    setAudioUrl(data.url);

    if ('mediaSession' in navigator && data.artists && data.avatar)  {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: data.name,
        artist: getCommaSeparatedString(data.artists, 'name'),
        album: currentPlaylistInfo.value?.name || undefined,
        artwork: [{ src: data.avatar, type: 'image/jpg', sizes: '500x500' }]
      });
      navigator.mediaSession.setActionHandler('play', playAudio);
      navigator.mediaSession.setActionHandler('pause', pauseAudio);
      navigator.mediaSession.setActionHandler('nexttrack', nextTrack);
      navigator.mediaSession.setActionHandler('previoustrack', previousTrack);
    }

    play && playAudio();
  }

  function nextTrack() {
    if (currentAudioIndexInQueue.value === null) {
      return;
    }

    if (currentAudioIndexInQueue.value + 1 === currentQueue.value.length) {
      return loadSongFromCurrentQueue(currentQueue.value[0]);
    }

    return loadSongFromCurrentQueue(currentQueue.value[currentAudioIndexInQueue.value + 1]);
  }

  function previousTrack() {
    if (currentAudioIndexInQueue.value === null) {
      return;
    }

    if (currentAudioIndexInQueue.value === 0) {
      return loadSongFromCurrentQueue(currentQueue.value[currentQueue.value.length - 1]);
    }

    return loadSongFromCurrentQueue(currentQueue.value[currentAudioIndexInQueue.value - 1]);
  }

  function toggleTrackPlaying() {
    if (!audio.value) {
      return;
    }

    if (audio.value.paused) {
      return playAudio();
    }

    pauseAudio();
  }

  function isThisMusic(musicId: string | number | null, playing: boolean = false) {
    if (playing && !isPlaying.value) {
      return false;
    }

    return musicId === currentAudioId.value;
  }

  function isThisPlaylist(playlistId: Playlist['id'] | null, playing: boolean = false) {
    if (playing && !isPlaying.value || !currentPlaylistInfo.value) {
      return false;
    }

    return playlistId === currentPlaylistInfo.value.id;
  }

  function isThisPlaylistAndMusic(musicId: string | number | null, playlistId: Playlist['id'] | null, playing: boolean = false) {
    if (playing && !isPlaying.value) {
      return false;
    }

    return isThisMusic(musicId) && isThisPlaylist(playlistId);
  }

  function createCustomPlaylist(id: string, queue: Track[], index: number = 0) {
    const dossier: Playlist = {
      id: id,
      name: '',
      image: null,
      color: null,
      description: null,
      info: {
        uploadedDate: '1970-01-01',
        savedQuantity: 0,
        tracksAmount: 0,
        totalDuration: 0,
      },
      creators: [],
      isAdded: false
    };

    loadSongOrPlaylist({
      playlistInfoDossier: dossier,
      playlistQueue: queue
    }, {index});
  }

  return {
    loadPlaylist,
    loadSongOrPlaylist,
    loadSongFromCurrentQueue,
    toggleTrackPlaying,
    nextTrack,
    previousTrack,
    isThisMusic,
    isThisPlaylist,
    isThisPlaylistAndMusic,
    createCustomPlaylist
  };
}
