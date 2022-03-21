export interface SearchMsv {
    date: string;
    sv: number;
}

export interface ProductTrend {
    name?: string;
    update_dt?: string;
    two_year_exploding?: number,
    group?: string;
    growth?: number,
    search_msv?: SearchMsv[];
}

/** 定义store状态类型 */
export interface Store {
    keyword: string;                 // 当前关键词
    keyword_history: string[];       // 搜索历史记录
    product_trends: ProductTrend[];  // 搜索结果集
}