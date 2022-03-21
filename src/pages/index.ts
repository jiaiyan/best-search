import { lazy } from 'react';

const Home = lazy(() => import('./home'));
const Search = lazy(() => import('./search'))
const NotFound = lazy(() => import('./notFound'));


export {
    Home,
    Search,
    NotFound
}