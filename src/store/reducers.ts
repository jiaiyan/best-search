import {
    ActionTypes,
    SET_KEYWORD,
    SET_KEYWORD_HISTORY,
    ADD_KEYWORD_HISTORY,
    SET_PRODUCT_TRENDS
} from './actions';
import { Store } from './types';

export const addKeywordHistory = (keyword_history: string[], keyword: string): string[] => {
    if(keyword_history.includes(keyword)) return keyword_history
    keyword_history = [...keyword_history, keyword];
    /** 搜索记录数据持久化 */
    localStorage.setItem('keyword_history', JSON.stringify(keyword_history));
    return keyword_history;
}

export function reducer(
    state: Store = { product_trends: [], keyword: '', keyword_history: [] },
    action: ActionTypes
) {
    switch (action.type) {
        case SET_KEYWORD:
            return {
                ...state,
                keyword: action.payload
            }
        case SET_KEYWORD_HISTORY:
            return {
                ...state,
                keyword_history: action.payload
            }
        case ADD_KEYWORD_HISTORY:
            return {
                ...state,
                keyword_history: addKeywordHistory(state.keyword_history, action.payload)
            }
        case SET_PRODUCT_TRENDS:
            return {
                ...state,
                product_trends: action.payload
            }
        default:
            return state
    }
}
