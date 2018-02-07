import fetchMock from 'fetch-mock'
import {fetchNasaPicture} from './fetchNasaPicture'

const API_KEY = '0OB81KTgzuo2F4U5o8G3CfVHCnj5g7C4tFuJ8utj'

test('fetches picture', async()=>{
  const date = '2017-10-10'
  const dataToReturn = {hello:'world'}
  const myMock = fetchMock.sandbox().mock(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`, dataToReturn)

  const data = await fetchNasaPicture(date, myMock)
  expect(data).toEqual(dataToReturn)
})