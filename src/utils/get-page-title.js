import defaultSettings from '@/settings'

const title = defaultSettings.title || 'δΈηεε°'

export default function getPageTitle(pageTitle) {
  // if (pageTitle) {
  //   return `${pageTitle} - ${title}`
  // }
  return `${title}`
}
