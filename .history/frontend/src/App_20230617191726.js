import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Singup';
import Home from './components/home';
import Profile from './components/profile';
import Triller from './components/triller';
import Booking from './components/Booking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/triller" element={<Triller />} />
        <Route path="/Booking" element={<Brooking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
