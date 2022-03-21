import Axios from 'axios'
const loginToken = 'INTERVIEW_SIMPLY2021'

interface AxiosConfig {
    baseURL: string
    timeout: number
    headers: {
        'Content-Type': string
    }
}

const config: AxiosConfig = {
    baseURL: 'http://3.141.23.218:5000',
    timeout: 600000,
    headers: {
        'Content-Type': 'application/json'
    }
}

const axios = Axios.create(config)

// 请求前拦截
axios.interceptors.request.use(
    (req) => {
        (req.headers as any).login_token = loginToken
        return req
    },
    (err) => {
        return Promise.reject(err)
    }
)

// 返回后拦截
axios.interceptors.response.use(
    (response): Promise<any> => {
        const { data } = response
        if (data) {
            return Promise.resolve(data.data)
        }
        return Promise.reject(response)
    },
    (err) => {
        return Promise.reject(err)
    }
)

// post请求
// @ts-ignore
axios.post = (url: string, params?: object): Promise<any> =>
    axios({
        method: 'post',
        url,
        data: { ...params, login_token: loginToken }
    })

// get请求
axios.get = (url: string, params?: object): Promise<any> =>
    axios({
        method: 'get',
        url,
        params: { ...params, login_token: loginToken }
    })

export default axios