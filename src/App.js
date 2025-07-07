import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import HostState from './context/HostState';
import Home from './pages/Home';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <HostState>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </Router>
      </HostState>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />

    </>
  );
}

export default App;
