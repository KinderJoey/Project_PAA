import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Singup';
import Home from './components/home';
import Profile from './components/profile';
import triller from './components/triller';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/triller" element={<triller />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
