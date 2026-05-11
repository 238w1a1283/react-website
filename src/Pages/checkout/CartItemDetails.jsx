import { formatMoney } from '../../utils/money';
export default function CartItemDetails({
  cartItem,
  deleteCartItem
}){
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
  Quantity:
  <span className="quantity-label">
    {cartItem.quantity}
  </span>

  <span className="update-quantity-link link-primary">
    Update
  </span>

  <span
    className="delete-quantity-link link-primary"
    onClick={deleteCartItem}
  >
    Delete
  </span>
</div>

              </div>
        </>
    );
}