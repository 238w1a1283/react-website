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
const isPreparing = deliveryPercent < 33;

const isShipped =
  deliveryPercent >= 33 && deliveryPercent < 100;

const isDelivered = deliveryPercent === 100;

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

<div className="progress-labels-container">

  <div
    className={`progress-label ${isPreparing && 'current-status'}`}
  >
    Preparing
  </div>

  <div
    className={`progress-label ${isShipped && 'current-status'}`}
  >
    Shipped
  </div>

  <div
    className={`progress-label ${isDelivered && 'current-status'}`}
  >
    Delivered
  </div>

</div>
 

</div>

  </>
);
}


  