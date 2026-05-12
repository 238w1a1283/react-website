import { Link } from 'react-router-dom';
import { Fragment} from 'react';
import dayjs from 'dayjs';
import axios from 'axios'; 
export default function OrderDetailsGrid({ order,loadCart }) {
const addToCart = async (productId) => {

  await axios.post('/api/cart-items', {
    productId: productId,
    quantity: 1
  });
  
  await loadCart();
};
  return (


        <div className="order-details-grid">
              {order.products.map((orderProduct)=>{
                return(
                  <Fragment key={orderProduct.productId}>
                   <div className="product-image-container">
                <img src={orderProduct.product.image} />
              </div>

              <div className="product-details">
                <div className="product-name">
                {orderProduct.product.name}
                </div>
                <div className="product-delivery-date">
                  Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMS).format('MMMM D')}
                </div>
                <div className="product-quantity">
                  Quantity: {orderProduct.quantity}
                </div>
                      <button
                      className="buy-again-button button-primary"
                      onClick={() => addToCart(orderProduct.productId)}
                    >
                  <img className="buy-again-icon" src="/images/icons/buy-again.png" alt="buy again" />
                  <span className="buy-again-message">Add to Cart</span>
                </button>
              </div>

              <div className="product-actions">
              <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </Link>
              </div>
                   </Fragment>
                );
               
              })}

             
            </div>
    
  );
}