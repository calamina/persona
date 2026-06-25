import IconCheck from '../components/icons/IconCheck.vue'
import IconCheckNot from '../components/icons/IconCheckNot.vue'
import IconFaviconToggle from '../components/icons/IconFaviconToggle.vue'
import IconFavoriteAdd from '../components/icons/IconFavoriteAdd.vue'
import IconFavoriteDelete from '../components/icons/IconFavoriteDelete.vue'
import IconFavoriteSearch from '../components/icons/IconFavoriteSearch.vue'
import IconFolder from '../components/icons/IconFolder.vue'
import IconHide from '../components/icons/IconHide.vue'
import IconLoading from '../components/icons/IconLoading.vue'
import IconLogout from '../components/icons/IconLogout.vue'
import IconShow from '../components/icons/IconShow.vue'
import IconTheme from '../components/icons/IconTheme.vue'
import IconUser from '../components/icons/IconUser.vue'

export const iconMap = {
  show: IconShow,
  hide: IconHide,
  user: IconUser,
  logout: IconLogout,
  favoriteAdd: IconFavoriteAdd,
  favoriteDelete: IconFavoriteDelete,
  folder: IconFolder,
  faviconToggle: IconFaviconToggle,
  favoriteSearch: IconFavoriteSearch,
  loading: IconLoading,
  check: IconCheck,
  checkNot: IconCheckNot,
  theme: IconTheme,
}
export type IconName = keyof typeof iconMap
