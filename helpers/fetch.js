var fetchUrl = (url = "", config = {}) => {
  const { headers = {}, restConfig = {} } = config;
  return fetch(url, {
    method: "GET",
    headers: {
      // body: JSON.stringify(config.data),
      headers: { 'Content-Type': 'application/json' },
      ...headers
    },
    ...restConfig
  })
}