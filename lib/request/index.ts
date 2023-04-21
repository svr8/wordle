export const sendGetRequest = async (url: string, query: any) => {
  const formattedUrl = addQueryToUrl(url, query)
  const response = await fetch(formattedUrl)
  return await response.json()
}

const addQueryToUrl = (url: string, query: any) => {
  const queryKeys = Object.keys(query)
  if (queryKeys.length === 0) {
    return url
  }
  const queryStrings = queryKeys.map((key) => `${key}=${query[key]}`)
  return `${url}?${queryStrings.join('&')}`
}