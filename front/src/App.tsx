import { Route, Routes } from '@solidjs/router';
import { lazy } from 'solid-js';
const Home = lazy(() => import('./pages/Home'));
import HomeData from './pages/Home.data';
const View = lazy(() => import('./pages/View'));
import ViewData from './pages/View.data';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' component={Home} data={HomeData} />
        <Route path='/bin/:slug' component={View} data={ViewData} />
      </Routes>
    </>
  );
}
