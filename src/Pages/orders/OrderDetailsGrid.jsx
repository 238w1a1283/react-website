import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';
import dayjs from 'dayjs';

import axios from 'axios'; 
export default function OrderDetailsGrid({ order,loadCart }) {


const [loadingProducts, setLoadingProducts] = useState({});
const [editingProductId, setEditingProductId] = useState(null);

const [productQuantities, setProductQuantities] = useState({});
const [savedQuantities, setSavedQuantities] = useState({});
const [addedMessages, setAddedMessages] = useState({});
const [cartAddedProducts, setCartAddedProducts] = useState({});
const addToCart = async (productId) => {

  try {

   setLoadingProducts({
      ...loadingProducts,
      [productId]: true
    });

    console.log('Product Id:', productId);
      console.log(
    'Quantity:',
    productQuantities[productId] || 1
    );
    console.log('loadCart:', loadCart);
    if (cartAddedProducts[productId]) {
      return;
    }
    await axios.post('/api/cart-items', {
 
      productId: productId,
      quantity:
      productQuantities[productId]
|| savedQuantities[productId]
|| 1
        });
          setCartAddedProducts({
          ...cartAddedProducts,
          [productId]: true
        });
      setAddedMessages({
      ...addedMessages,
      [productId]: true
    });

    setTimeout(() => {

      setAddedMessages((prev) => ({
        ...prev,
        [productId]: false
      }));

    }, 2000);

    if (loadCart) {
      await loadCart();
    }

  } catch (error) {
    console.log(error);
  } finally {
    setLoadingProducts({
  ...loadingProducts,
  [productId]: false
    });
  }
   };
      const updateQuantity = async (productId) => {

  try {

    await axios.put('/api/cart-items', {
      productId: productId,
      quantity: productQuantities[productId]
    });

    setSavedQuantities({
  ...savedQuantities,
  [productId]: productQuantities[productId]
    });

    if (loadCart) {
      await loadCart();
    }

    setEditingProductId(null);
      } catch (error) {
        console.log(error);
      }
    };
  const deleteItem = async (productId) => {

  try {

    await axios.delete(`/api/cart-items/${productId}`);

    setCartAddedProducts((prev) => ({
      ...prev,
      [productId]: false
    }));

    if (loadCart) {
      await loadCart();
    }

  } catch (error) {
    console.log(error);
  }
};
      return (


        <div className="order-details-grid">
             {
         order.products.map((orderProduct)=>{
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
                  Arriving on: {dayjs(order.orderTimeMs)
                .add(orderProduct.quantity + 2, 'day').format('MMMM D')}
                </div>
                  <div className="quantity-container">

  <span className="quantity-label">
    Quantity:
  </span>

  {editingProductId !== orderProduct.productId? (

    <>
      <span className="quantity-text">
    {
        savedQuantities[orderProduct.productId]
        || orderProduct.quantity
      }
      </span>

      <button
        className="quantity-update-button"
        onClick={() =>
          setEditingProductId(orderProduct.productId)
        }
      >
        Update
      </button>
    </>

  ) : (

    <>
      <select
        className="quantity-select"
             value={
              productQuantities[orderProduct.productId]
              || savedQuantities[orderProduct.productId]
              || orderProduct.quantity
            }
        onChange={(e) =>
        setProductQuantities({
          ...productQuantities,
          [orderProduct.productId]: Number(e.target.value)
        })
      }
      >
        {[...Array(10).keys()].map((num) => (
          <option
            key={num + 1}
            value={num + 1}
          >
            {num + 1}
          </option>
        ))}
      </select>

      <button
        className="quantity-update-button"
        onClick={() =>
          updateQuantity(orderProduct.productId)
        }
      >
            Save
          </button>
        </>

      )}

      <button
        className="quantity-delete-button"
        onClick={() => deleteItem(orderProduct.productId)}
      >
        Delete
      </button>

    </div>
                   <button
                  className="buy-again-button button-primary"
                  onClick={() => addToCart(orderProduct.productId)}
                 disabled={
                  loadingProducts[orderProduct.productId]
                  || cartAddedProducts[orderProduct.productId]
                }
                  data-testid="add-to-cart-button"
                >
                  <img className="buy-again-icon" src="/images/icons/buy-again.png" alt="buy again" />
                 <span className="buy-again-message">
                  {
                  loadingProducts[orderProduct.productId]
              ? 'Updating Cart...'
              : cartAddedProducts[orderProduct.productId]
              ? 'Added To Cart'
              : 'Add to Cart'
                }
                </span>
                </button>
                <div
              style={{
                opacity:
                  addedMessages[orderProduct.productId]
                  ? 1
                  : 0
              }}
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