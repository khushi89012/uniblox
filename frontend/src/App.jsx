import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavComponent from './components/nav';
import Cart from './components/cart';
import Checkout from './components/checkout';
import Admin from './components/admin';
// import './App.css'

function App() {
  return (
    <Router>
<div style={{
  backgroundImage: "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)",
  margin: "0", 
  padding: "0", 
  width: "100vw", 
  height: "100vh"
}}>
  <NavComponent />
  <Routes>
    <Route path="/" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/admin" element={<Admin />} />
  </Routes>
</div>
    </Router>
  );
}

export default App;
