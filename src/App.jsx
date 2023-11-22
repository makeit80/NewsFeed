import Router from './shared/Router';
import './reset.css';
import Navbar from 'components/Navbar';
import { Outlet } from 'react-router';
import Home from 'pages/Home';


function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App;
