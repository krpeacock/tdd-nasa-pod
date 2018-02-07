const API_KEY = '0OB81KTgzuo2F4U5o8G3CfVHCnj5g7C4tFuJ8utj'
const API = "https://api.nasa.gov/planetary/apod"

export const fetchNasaPicture = (date, injectedFetch = fetch) => {
  const query = `${API}?date=${date}&api_key=${API_KEY}`
  return injectedFetch(query)
    .then(response => response.json())
    .then(data => data)
}