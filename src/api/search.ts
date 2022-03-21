import axios from '../utils/axios'
import { ProductTrend } from './../store/types'


interface Permission {
    product_trends: ProductTrend[]
}
const search = {
    // 获取数据
    keyword(params?: object): Promise<Permission> {
        return axios.post('/interview/keyword_search', params)
    }
}

export default search
