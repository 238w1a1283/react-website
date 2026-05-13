import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './CheckoutPage.css';
import './checkout-header.css';
import OrderSummary from './OrderSummary';
import { Link, useNavigate } from 'react-router-dom';

export function CheckoutPage({ cart ,loadCart}) {

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
const navigate = useNavigate();

  useEffect(() => {
    document.title = "Ecommerce project";

      const fetchCheckoutData = async () =>{
     let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');

        setDeliveryOptions(response.data);
      };
   fetchCheckoutData();
     

  }, []); 
  
  useEffect(() => {

  const loadPaymentSummary = async () => {

    const response =
      await axios.get('/api/payment-summary');

    setPaymentSummary(response.data);

  };

  loadPaymentSummary();

}, [cart]);



const placeOrder = async () => {

  try {

    console.log('Place Order button clicked');

    await axios.post('/api/orders', {});

    if (loadCart) {
      await loadCart();
    }

    navigate('/orders');

  } catch (error) {
    console.log(error);
  }

};
  return (
    <>
      {/* HEADER */}
      <div className="checkout-header">
        <div className="header-content">

          <div className="checkout-header-left-section">
            <Link to="/">
             <img
                            className="checkout-logo"
                            src="/images/icons/akshay-logo.png"
                            alt="Akshay Logo"
                          />
            
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              {cart.length} items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="/images/icons/checkout-lock-icon.png" alt="lock" />
          </div>

        </div>
      </div>

      {/* MAIN */}
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          {/* LEFT SIDE */}
     <OrderSummary cart={cart} deliveryOptions={deliveryOptions}
     loadCart={loadCart}/>

          {/* RIGHT SIDE */}
          <div className="payment-summary">

            <div className="payment-summary-title">
              Payment Summary
            </div>

            {paymentSummary ? (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping & handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.subtotalCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

               <button
                className="place-order-button button-primary"
                onClick={placeOrder}
              >
                  Place your order
                </button>
              </>
            ) : (
              <p>Loading payment details...</p>
            )}

          </div>

        </div>
      </div>
    </>
  );
}