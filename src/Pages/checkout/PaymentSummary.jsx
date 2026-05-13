import { formatMoney } from '../../utils/money';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function PaymentSummary({ paymentSummary,loadCart }) {
  const navigate = useNavigate();

  
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
    <div className="payment-summary">

      <div className="payment-summary-title">
        Payment Summary
      </div>

      {paymentSummary && (
        <div>

          <div className="payment-summary-row"  data-testid="payment-summary-row-items">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row" data-testid="payment-summary-row-shipping">
            <div >Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row" data-testid="payment-summary-row-subtotal">
            <div >Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row" data-testid="payment-summary-row-tax">
            <div >Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row" data-testid="payment-summary-row-total">
            <div >Order total:</div>
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

        </div>
      )}

    </div>
  );
}