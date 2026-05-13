import { Header } from '../../components/Header';
import './TrackingPage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);
    useEffect(() => {

  const loadOrder = async () => {

    const response = await axios.get(
      `/api/orders/${orderId}?expand=products`
    );

    setOrder(response.data);
  };

  loadOrder();

}, [orderId]);

console.log(orderId);
console.log(productId);

 if (!order) {
  return null;
}

const orderProduct = order.products.find(
  (product) => product.productId === productId
);
const totalDeliveryTimeMs =
  orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
const timePassedMs =
  dayjs().valueOf() - order.orderTimeMs;

let deliveryPercent =
  (timePassedMs / totalDeliveryTimeMs) * 100;

if (deliveryPercent > 100) {
  deliveryPercent = 100;
}


return (
  <>
    <Header cart={cart} />

   <div className="product-info">

  <img
    className="product-image"
    src={orderProduct.product.image}
    alt="product"
  />

  <div className="product-name">
    {orderProduct.product.name}
  </div>

  <div className="product-quantity">
    Quantity: {orderProduct.quantity}
  </div>

  <div className="product-delivery-date">
  {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'}{' '}
  {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
</div>
  <div className="progress-bar-container">
  <div
    className="progress-bar"
    style={{ width: `${deliveryPercent}%` }}
  ></div>
</div>

<div className="tracking-container">

  <div className={`tracking-step ${deliveryPercent >= 10 ? 'active-step' : ''}`}>
    <div className="tracking-icon">📦</div>
    <div className="tracking-title">Order Placed</div>
    <div className="tracking-date">
      {dayjs(order.orderTimeMs).format('MMM D')}
    </div>
  </div>

  <div className={`tracking-step ${deliveryPercent >= 35 ? 'active-step' : ''}`}>
    <div className="tracking-icon">📋</div>
    <div className="tracking-title">Packed</div>
    <div className="tracking-date">
      {dayjs(order.orderTimeMs).add(1, 'day').format('MMM D')}
    </div>
  </div>

  <div className={`tracking-step ${deliveryPercent >= 65 ? 'active-step' : ''}`}>
    <div className="tracking-icon">🚚</div>
    <div className="tracking-title">Shipped</div>
    <div className="tracking-date">
      {dayjs(order.orderTimeMs).add(2, 'day').format('MMM D')}
    </div>
  </div>

  <div className={`tracking-step ${deliveryPercent >= 85 ? 'active-step' : ''}`}>
    <div className="tracking-icon">🏠</div>
    <div className="tracking-title">Out for delivery</div>
    <div className="tracking-date">
      {dayjs(orderProduct.estimatedDeliveryTimeMs).subtract(1, 'day').format('MMM D')}
    </div>
  </div>

  <div className={`tracking-step ${deliveryPercent >= 100 ? 'active-step' : ''}`}>
    <div className="tracking-icon">✅</div>
    <div className="tracking-title">Delivered</div>
    <div className="tracking-date">
      {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMM D')}
    </div>
  </div>

</div>
 

</div>

  </>
);
}


  