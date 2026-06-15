export function cleanUrl(url: string) {
  const urlNoProtocol = url.replace(/^https?:\/\//i, '')
  url = new URL('https://' + urlNoProtocol).href.slice(0, -1)
}

// export function checkUrl(url :string) {
//   const urlRegex = /^https?:\/\/(?:www\.)?([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/
//   if (urlRegex.test(url)) input.setCustomValidity('')
//   else input.setCustomValidity('Invalid URL')
// }
