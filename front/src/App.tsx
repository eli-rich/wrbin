import { Route, Routes } from '@solidjs/router';
import { lazy } from 'solid-js';
import Home from './pages/Home';
const View = lazy(() => import('./pages/View'));
import ViewData from './pages/View.data';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' component={Home} />
        <Route path='/bin/:slug' component={View} data={ViewData} />
      </Routes>
    </>
  );
}
