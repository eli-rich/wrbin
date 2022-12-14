import { Route, Routes } from '@solidjs/router';
import Home from './pages/Home';
import HomeData from './pages/Home.data';
import Posts from './pages/Posts';
import PostsData from './pages/Posts.data';
import View from './pages/View';
import ViewData from './pages/View.data';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' component={Home} data={HomeData} />
        <Route path='/bin/:slug' component={View} data={ViewData} />
        <Route path='/posts' component={Posts} data={PostsData} />
      </Routes>
    </>
  );
}
