import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://opentdb.com/api.php'
})

export default axiosInstance
