import IconCategAdd from '../components/icons/IconCategAdd.vue'
import IconChan from '../components/icons/IconChan.vue'
import IconCheck from '../components/icons/IconCheck.vue'
import IconCheckNot from '../components/icons/IconCheckNot.vue'
import IconClose from '../components/icons/IconClose.vue'
import IconFaviconToggle from '../components/icons/IconFaviconToggle.vue'
import IconFavorite from '../components/icons/IconFavorite.vue'
import IconFavoriteAdd from '../components/icons/IconFavoriteAdd.vue'
import IconFavoriteDelete from '../components/icons/IconFavoriteDelete.vue'
import IconFavoriteSearch from '../components/icons/IconFavoriteSearch.vue'
import IconFold from '../components/icons/IconFold.vue'
import IconFolder from '../components/icons/IconFolder.vue'
import IconFullscreen from '../components/icons/IconFullscreen.vue'
import IconHide from '../components/icons/IconHide.vue'
import IconLoading from '../components/icons/IconLoading.vue'
import IconLogout from '../components/icons/IconLogout.vue'
import IconNote from '../components/icons/IconNote.vue'
import IconPlus from '../components/icons/IconPlus.vue'
import IconRss from '../components/icons/IconRss.vue'
import IconSearch from '../components/icons/IconSearch.vue'
import IconShow from '../components/icons/IconShow.vue'
import IconSmile from '../components/icons/IconSmile.vue'
import IconSoul from '../components/icons/IconSoul.vue'
import IconTheme from '../components/icons/IconTheme.vue'
import IconTodoList from '../components/icons/IconTodoList.vue'
import IconUser from '../components/icons/IconUser.vue'
import IconYoutube from '../components/icons/IconYoutube.vue'

export const iconMap = {
  show: IconShow,
  hide: IconHide,
  user: IconUser,
  logout: IconLogout,
  favoriteAdd: IconFavoriteAdd,
  favoriteDelete: IconFavoriteDelete,
  folder: IconFolder,
  favorite: IconFavorite,
  faviconToggle: IconFaviconToggle,
  favoriteSearch: IconFavoriteSearch,
  loading: IconLoading,
  check: IconCheck,
  checkNot: IconCheckNot,
  checkPlus: IconPlus,
  theme: IconTheme,
  fold: IconFold,
  smile: IconSmile,
  chan: IconChan,
  note: IconNote,
  todolist: IconTodoList,
  rss: IconRss,
  youtube: IconYoutube,
  soul: IconSoul,
  search: IconSearch,
  categAdd: IconCategAdd,
  close: IconClose,
  fullscreen: IconFullscreen,
}
export type IconName = keyof typeof iconMap
