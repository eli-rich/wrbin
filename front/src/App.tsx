import { Route, Routes } from '@solidjs/router';
import Home from './pages/Home';
import View from './pages/View';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' component={Home} />
        <Route path='/:slug' component={View} />
      </Routes>
    </>
  );
}
