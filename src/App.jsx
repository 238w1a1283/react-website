import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './Pages/Home/HomePage'
import './App.css'
import { useState, useEffect } from 'react'
import { CheckoutPage } from './Pages/checkout/CheckoutPage'
import { OrdersPage } from './Pages/orders/OrdersPage'
import { TrackingPage } from './Pages/tracking/TrackingPage';
import { NotFoundPage } from './Pages/notfound/NotFoundPage';
function App() {
  const [cart, setCart] = useState([]);
const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');

      setCart(response.data);
    }
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
       <Route
              path="/tracking/:orderId/:productId"
              element={<TrackingPage cart={cart} />}
            />
            <Route
                    path="*"
                    element={<NotFoundPage cart={cart} />}
                  />
    </Routes>
    
  );
}

export default App;