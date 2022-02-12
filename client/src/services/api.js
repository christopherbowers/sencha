import Axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL

const Client = Axios.create({
  baseURL: baseURL,
  timeout: 5000,
  // headers: {
  //   Authorization: localStorage.getItem('access_token')
  //     ? 'Bearer ' + localStorage.getItem('access_token')
  //     : null,
  //   'Content-Type': 'application/json',
  //   accept: 'application/json',
  // },
})


Client.interceptors.request.use(
  (config) => {
    // Reads the token in localstorage
    const token = localStorage.getItem('access_token')
    // if the token exists, we set the authorization header
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config // We return the new config if the token exists or the default config if no token exists.
    // Provides the token to each request that passes through axios
  },
  (error) => Promise.reject(error)
)

export default Client
