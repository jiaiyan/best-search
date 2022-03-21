import React from 'react'
import { Home, Search, NotFound } from '../pages'

export type RouterType = {
    path: string,
    component: React.LazyExoticComponent<any>,
    children?: RouterType[]
}

const Routers: RouterType[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/search/:keyword',
        component: Search
    },
    {
        path: '*',
        component: NotFound
    }
]

export {
    Routers
}