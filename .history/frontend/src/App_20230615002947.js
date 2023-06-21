import logo from './logo.svg';
import './App.css';
import Login from './components/login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './components/Singup';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Login}></Route>
        <Route exact path='/singup' Component={SignUp}></Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
