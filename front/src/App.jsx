import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import MisTurnos from './views/MisTurnos/MisTurnos';
import Register from './views/Register/Register';
import PageNotFound from './views/PageNotFound/PageNotFound';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/appointments' element={<MisTurnos />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;