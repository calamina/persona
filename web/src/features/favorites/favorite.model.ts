import type { UnpackData } from '../../utils/api-client'
import type { getFavorites } from './favorites.service'

export type FavoriteDisplay = UnpackData<typeof getFavorites>
