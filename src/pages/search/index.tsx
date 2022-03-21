import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from '../../store/types'
import { useParams } from 'react-router-dom'
import { SET_KEYWORD, ADD_KEYWORD_HISTORY, SET_PRODUCT_TRENDS, loadProductTrends } from '../../store/actions'
import * as Product from './../../components/Product'
import './index.scss'


export default function Home() {

    const dispatch = useDispatch()
    const productTrends = useSelector((state: Store) => state.product_trends)

    const [loading, setLoading] = useState<boolean>(true)

    let { keyword } = useParams()
    keyword = (keyword as string).replaceAll('+', ' ').replaceAll('%2F', '/')


    useEffect(() => {
        // 更新当前keyword
        dispatch({
            type: SET_KEYWORD,
            payload: keyword
        })

        // 添加搜索记录
        dispatch({
            type: ADD_KEYWORD_HISTORY,
            payload: keyword
        })

        // 获取远程数据
        async function fetchData() {
            await dispatch(loadProductTrends((keyword as string)))
            setLoading(false)
        }

        fetchData();
    }, [keyword, dispatch])

    /** 组件卸载前清除keyword */
    useEffect(() => () => {
        dispatch({
            type: SET_KEYWORD,
            payload: ''
        })
        dispatch({
            type: SET_PRODUCT_TRENDS,
            payload: []
        })
    }, [dispatch])

    return (
        <div className="search">
            <h3 className="title">Related product trends</h3>
            <Product.Trends>
                {loading ?
                    [{}, {}, {}, {}].map((s, index) => <Product.Trend {...s} key={index} loading />) :
                    productTrends.map((s, index) => <Product.Trend {...s} key={`${index}${s.name}`} />)}
            </Product.Trends>
        </div>
    )
}