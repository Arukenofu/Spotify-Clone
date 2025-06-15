import type { RouteLocation } from 'vue-router'
import type { MediaLibTypes } from '@/services/api/medialib/types/MediaLibTypes'

export default function handleIsMedialibActive(
  id: string | number,
  type: MediaLibTypes['type'],
  route: RouteLocation,
) {
  if (type === 'Collection') {
    return route.path === '/collection'
  }

  return route.path === `/${type}/${id}`.toLowerCase()
}
