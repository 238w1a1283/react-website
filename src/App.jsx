import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './Pages/Home/HomePage'
import './App.css'
import { useState, useEffect } from 'react'
import { CheckoutPage } from './Pages/checkout/CheckoutPage'
import { OrdersPage } from './Pages/orders/OrdersPage'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
    const response = await axios.get('/api/cart-items?expand=product');

      setCart(response.data);
    }
    fetchAppData();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
    </Routes>
  );
}

export default App;