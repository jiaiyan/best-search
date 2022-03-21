import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { Layout, Header, Content } from './layout'
import { Routers } from './routes'
import SearchInput from './components/SearchInput'

function App() {
  const { pathname } = useLocation()
  return (
    <Layout>
      <Header content={<CSSTransition classNames="fade" timeout={1000} in={pathname !== '/'} unmountOnExit={true}><SearchInput /></CSSTransition>} />
      <Content>
        <Suspense fallback={<div><p style={{ fontSize: '42px', fontWeight: 'lighter', margin: '8vh 0', textAlign: 'center' }}>loading...</p></div>}>
          <Routes>
            {Routers.map(route => <Route element={<route.component />} path={route.path} key={route.path} />)}
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
}

export default App;
