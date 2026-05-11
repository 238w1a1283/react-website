
import DeliveryOptions from './DeliveryOptions';
import CartItemDetails from './CartItemDetails';
import axios from 'axios';
import dayjs from 'dayjs';
export default function ProductsGrid({ cart , deliveryOptions , handleDeliveryChange,loadCart }) {

  return (
    <div className="order-summary">

      {deliveryOptions.length > 0 && cart.map((cartItem) => {
  
        const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
      return deliveryOption.id === cartItem.deliveryOptionId;

        });
        const deleteCartItem = async() =>{
        await axios.delete(`/api/cart-items/${cartItem.productId}`)
         await loadCart();
        };
    
        return (
          <div key={cartItem.productId} className="cart-item-container">
            <div className="delivery-date">
              Delivery date:{dayjs(selectedDeliveryOption.
                estimatedDeliveryTimeMs
              ).format('dddd,MMMM D')}

            </div>
            

            <div className="cart-item-details-grid">

                <CartItemDetails
                cartItem={cartItem}
                deleteCartItem={deleteCartItem}
                loadCart={loadCart}
              />

              

              {/* DELIVERY OPTIONS */}
             <DeliveryOptions
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
              handleDeliveryChange={handleDeliveryChange}
              loadCart={loadCart}
            />

            </div>
          </div>
        );
      })}

    </div>
  );
}