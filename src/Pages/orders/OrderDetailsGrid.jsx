import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import dayjs from 'dayjs';

import axios from 'axios'; 
export default function OrderDetailsGrid({ order,loadCart }) {
  const [quantity, setQuantity] = useState(1);
const [showAddedMessage, setShowAddedMessage] = useState(false);
const [loading, setLoading] = useState(false);
const addToCart = async (productId) => {

  try {

    setLoading(true);

    await axios.post('/api/cart-items', {
      productId: productId,
      quantity: quantity
    });

    setShowAddedMessage(true);

    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);

    await loadCart();

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
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
                </div><select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  data-testid="quantity-selector"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option
                      key={num + 1}
                      value={num + 1}
                    >
                      Qty: {num + 1}
                    </option>
                  ))}
                </select>
                                      <button
                  className="buy-again-button button-primary"
                  onClick={() => addToCart(orderProduct.productId)}
                  disabled={loading}
                  data-testid="add-to-cart-button"
                >
                  <img className="buy-again-icon" src="/images/icons/buy-again.png" alt="buy again" />
                 <span className="buy-again-message">
                  {loading ? 'Adding...' : 'Add to Cart'}
                </span>
                </button>
                <div
                        style={{ opacity: showAddedMessage ? 1 : 0 }}
                        data-testid="added-message"
                      >
                        ✓ Added
                      </div>
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