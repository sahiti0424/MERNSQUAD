import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cricket from './categories/Cricket';
import Football from './categories/Football';
import Badminton from './categories/Badminton';
import ProductDetails from './Views/ProductDetails';
import FootballDetails from './Views/FootballDetails';
import BadmintonDetails from './Views/BadmintonDetails';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import Seller from './Auth/Seller';
import OrderForm from './components/Checkout';
import Cart from './components/Cart';
import ContactForm from './components/ContactForm';
import ForgotPassword from './Auth/ForgotPassword';
import ResetPassword from './Auth/ResetPassword';
import Hockey from './categories/Hockey';
import HockeyDetails from './Views/HockeyDetails';

function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/sell' element={<Seller />} />
        <Route path='/login' element={<Login />} />
        <Route path="/cricket" element={<Cricket />} />
        <Route path="/cricket/:id" element={<ProductDetails />} />
        <Route path="/football" element={<Football />} />
        <Route path="/football/:id" element={<FootballDetails/>} />
        <Route path="/badminton" element={<Badminton />} />
        <Route path="/badminton/:id" element={<BadmintonDetails />} />
        <Route path="/hockey" element={<Hockey />} />
        <Route path="/hockey/:id" element={<HockeyDetails />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
