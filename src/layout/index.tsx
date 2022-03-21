import React from "react";
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import './index.scss'

interface HeaderProps {
    content?: React.ReactNode
}

/** 布局组件 */
const Layout: React.FC = (props) => {
    return (
        <section className="best-search">
            {props.children}
        </section>
    )
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className="best-search-header">
            <Link to="/" className="title pc">Best<small className="sub">Search</small></Link>
            <Link to="/" className="title mobile">ST</Link>
            <div className="content">{props.content}</div>
        </header>
    )
}

const Content: React.FC = (props) => {
    return (
        <Container component="div" maxWidth="md">
            <main className="best-search-content">{props.children}</main>
        </Container>
    )
}

export {
    Layout,
    Header,
    Content
}