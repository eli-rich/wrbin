import { JSX } from 'solid-js/jsx-runtime';
import NavBar from '../components/NavBar';
interface LayoutProps {
  children: JSX.Element;
}
export default function Main(props: LayoutProps) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      {props.children}
    </>
  );
}
