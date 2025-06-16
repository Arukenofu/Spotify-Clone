import { sdk } from '@/services/sdk'
import { resolveWithCache } from '@/services/sdk/utils/resolveWithCache.ts'

async function getCurrentUserProfile() {
  return resolveWithCache(['currentUser'], () => sdk.currentUser.profile())
}

async function getCurrentUserCollection() {
  return resolveWithCache(['currentUserCollection'], () => sdk.currentUser.tracks.savedTracks(50))
}

async function getCurrentUserAlbums() {
  return resolveWithCache(['currentUserAlbums'], () => sdk.currentUser.albums.savedAlbums(50))
}

async function getCurrentUserPlaylists() {
  return resolveWithCache(['currentUserPlaylists'], () => sdk.currentUser.playlists.playlists(50))
}

async function getUserProfile(id: string) {
  return resolveWithCache(['user', id], () => sdk.users.profile(id))
}

export {
  getCurrentUserAlbums,
  getCurrentUserCollection,
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getUserProfile,
}
