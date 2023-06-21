import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Singup';
import Home from './components/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SingUp />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
