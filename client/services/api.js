import Axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL

const Client = Axios.create({
  baseURL: baseURL,
  timeout: 5000
})

Client.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === 'undefined') {
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + 'token/refresh/'
    ) {
      window.location.href = '/login/';
      return Promise.reject(error);
    }

    if (
      error.response.data.code === 'token_not_valid' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return Client
            .post('/token/refresh/', { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('refresh_token', response.data.refresh);

              Client.defaults.headers['Authorization'] =
                'Bearer ' + response.data.access;
              originalRequest.headers['Authorization'] =
                'Bearer ' + response.data.access;

              return Client(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now);
          window.location.href = '/login/';
        }
      } else {
        console.log('Refresh token not available.');
        window.location.href = '/login/';
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
)

export default Client
