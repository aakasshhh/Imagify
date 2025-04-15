import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './components/Login'
import {AppContext}  from './context/AppContext';
import GoogleAuthRedirect from './pages/GoogleAuthRedirect';

const App = () => {
  const { showLogin, theme } = useContext(AppContext);

  return (
    <div
      className={`px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'  // Dark mode: dark background with white text
          : 'bg-gradient-to-b from-teal-50 to-orange-50 text-black'  // Light mode: light background with black text
      }`}
    >
      <ToastContainer position='bottom-right' />
      <NavBar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>
        <Route path="/google-auth-success" element={<GoogleAuthRedirect />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
