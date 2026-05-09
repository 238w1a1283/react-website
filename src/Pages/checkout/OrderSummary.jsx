import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import DeliveryOptions from './DeliveryOptions';
export default function ProductsGrid({ cart , deliveryOptions , handleDeliveryChange }) {

  return (
    <div className="order-summary">

      {deliveryOptions.length > 0 && cart.map((cartItem) => {

        const selectedDeliveryOption = deliveryOptions.find(
          (deliveryOption) =>
            deliveryOption.id === cartItem.selectedDeliveryOptionId
        );

        return (
          <div key={cartItem.productId} className="cart-item-container">

            <div className="delivery-date">
              Delivery date: {
                selectedDeliveryOption
                  ? dayjs(selectedDeliveryOption.estimatedDeliveryTime)
                      .format('dddd, MMMM D')
                  : "Loading..."
              }
            </div>

            <div className="cart-item-details-grid">

              <img
                className="product-image"
                src={cartItem.product?.image || "/images/default.png"}
                alt="product"
              />

              <div className="cart-item-details">

                <div className="product-name">
                  {cartItem.product?.name}
                </div>

                <div className="product-price">
                  {formatMoney(cartItem.product?.priceCents || 0)}
                </div>

                <div className="product-quantity">
                  Quantity: {cartItem.quantity}
                </div>

              </div>

              {/* DELIVERY OPTIONS */}
             <DeliveryOptions
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
              handleDeliveryChange={handleDeliveryChange}
            />

            </div>
          </div>
        );
      })}

    </div>
  );
}