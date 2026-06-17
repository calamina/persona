export function cleanUrl(url: string) {
  const urlNoProtocol = url.replace(/^https?:\/\//i, '')
  return (url = new URL('https://' + urlNoProtocol).href.slice(0, -1))
}
