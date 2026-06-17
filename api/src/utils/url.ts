export const getUrlTitle = async (url: string) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 2000)
  const title = await fetch(url, { signal: controller.signal })
    .then((res) => {
      clearTimeout(timeoutId)
      return res.text()
    })
    .then((body: string) => {
      const match = body.match(/<title>([^<]*)<\/title>/)
      if (!match || typeof match[1] !== 'string') return url
      return match[1]
    })
    .catch((_err) => url)
  return title
}

export async function isValidUrl(url: string) {
  return fetch(url, { method: 'HEAD' }).then((res) => res?.status === 200)
}
