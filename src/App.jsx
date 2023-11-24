import './reset.css';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { Outlet } from 'react-router';



function App() {
  return (
    <>
      <Navbar />
      <Footer />
      <Outlet />
    </>
  )
}

export default App;
