import { formatMoney } from '../../utils/money';

export default function CartItemDetails({cartItem}){
    return(
        <>
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
        </>
    );
}