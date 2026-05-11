
import DeliveryOptions from './DeliveryOptions';
import CartItemDetails from './CartItemDetails';
export default function ProductsGrid({ cart , deliveryOptions , handleDeliveryChange,loadCart }) {

  return (
    <div className="order-summary">

      {deliveryOptions.length > 0 && cart.map((cartItem) => {

    
        return (
          <div key={cartItem.productId} className="cart-item-container">

            

            <div className="cart-item-details-grid">
              <CartItemDetails cartItem={cartItem} />
              

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