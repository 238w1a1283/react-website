import { formatMoney } from '../../utils/money';
import { useState } from 'react';
import axios from 'axios'

export default function CartItemDetails({
  cartItem,
  deleteCartItem,loadCart
}){
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const updateQuantity = async () => {

  await axios.put(
    `/api/cart-items/${cartItem.productId}`,
    {
      quantity: Number(quantity)
    }
  );

  await loadCart();

  setIsUpdatingQuantity(false);
};
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
 {isUpdatingQuantity && (
  <input
    type="text"
    className="quantity-input"
    value={quantity}
    onChange={(event) => {
      setQuantity(event.target.value);
    }}
    onKeyDown={(event) => {

  if (event.key === 'Enter') {
    updateQuantity();
  }

  if (event.key === 'Escape') {

    setQuantity(cartItem.quantity);

    setIsUpdatingQuantity(false);

  }

}}
  />
)}
 {!isUpdatingQuantity && (
  <span className="quantity-label">
    {cartItem.quantity}
 </span>
)}


  <span className="update-quantity-link link-primary"
   onClick={() => {

  if (!isUpdatingQuantity) {
    setIsUpdatingQuantity(true);

  } else {
    updateQuantity();
  }

}}>
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