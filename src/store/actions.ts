import { ProductTrend, Store } from './types';
import Search from './../api/search'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

/** 设置当前关键词 */
export const SET_KEYWORD = 'SET_KEYWORD';
/** 设置当前搜索记录 */
export const SET_KEYWORD_HISTORY = 'SET_KEYWORD_HISTORY';
/** 添加当前搜索记录 */
export const ADD_KEYWORD_HISTORY = 'ADD_KEYWORD_HISTORY';
/** 设置当前搜索结果集 */
export const SET_PRODUCT_TRENDS = 'SET_PRODUCT_TRENDS';
/** 远程加载搜索结果集 */
export const LOAD_PRODUCT_TRENDS = 'LOAD_PRODUCT_TRENDS';

export type ActionTypes =
    | { type: typeof SET_KEYWORD, payload: string }
    | { type: typeof SET_KEYWORD_HISTORY, payload: string[] }
    | { type: typeof ADD_KEYWORD_HISTORY, payload: string }
    | { type: typeof SET_PRODUCT_TRENDS, payload: ProductTrend[] }
    | { type: typeof LOAD_PRODUCT_TRENDS, payload: string };


export const setKeyword = (keyword: string): ActionTypes => {
    return {
        type: 'SET_KEYWORD',
        payload: keyword
    }
}

export const setKeywordHistory = (keywordHistory: string[]): ActionTypes => {
    return {
        type: 'SET_KEYWORD_HISTORY',
        payload: keywordHistory
    }
}

export const addKeywordHistory = (keyword: string): ActionTypes => {
    return {
        type: 'ADD_KEYWORD_HISTORY',
        payload: keyword
    }
}

export const setProductTrends = (productTrends: ProductTrend[]): ActionTypes => {
    return {
        type: 'SET_PRODUCT_TRENDS',
        payload: productTrends
    }
}

export const loadProductTrends = (search_phrase: string): ThunkAction<void, Store, unknown, Action<string>> => async (dispatch) => {
    const { product_trends } = await Search.keyword({ search_phrase });
    dispatch(setProductTrends(product_trends))
}