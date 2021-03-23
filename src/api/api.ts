import axios from 'axios'

export const api = (url: string, method = 'get') => {
    return axios[method](url)
}


export const handleFetchTrivia = async () => {
    const res = await api('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
    return res.data?.results
  }