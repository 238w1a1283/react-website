import axios from 'axios';
import {useState , useEffect} from 'react';
import { Header } from '../../components/Header';
import './OrdersPage.css';


import OrderHeader from './OrderHeader';
import OrderDetailsGrid from './OrderDetailsGrid';
export function OrdersPage({cart}) {

const [orders, setOrders] = useState([]);

useEffect(()=>{
  const loadOrders = async ()=>{
       const response = await axios.get('/api/orders?expand=products');
        setOrders(response.data);

  };
  loadOrders();


},[]);

  return (
    <>
      {/* ✅ Always pass cart (even empty array) */}
      <Header  cart={cart}/>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
      {orders.map((order)=>{
          return(
              <div  key={order.id}className="order-container">

           

           <OrderHeader order={order}/>
           <OrderDetailsGrid order={order}/>
          </div>
          );
      })
      }
          {/* ORDER 1 */}
         
        </div>
      </div>
    </>
  );
}