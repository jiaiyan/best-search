import React from "react";
import './index.scss'
import SearchInput from './../../components/SearchInput'

/** 首页 */
export default function Home() {
    return (
        <div className="home">
            <h1 className="title">Search Trends</h1>
            <SearchInput animation="fade-in-down" />
        </div>
    )
}