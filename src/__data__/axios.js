import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://opentdb.com/api.php?amount=10'
})

export default axiosInstance
