import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money.js';
export default function DeliveryOptions({ cartItem, deliveryOptions, handleDeliveryChange }){
    return(
         <div className="delivery-options">
        
                        <div className="delivery-options-title">
                          Choose a delivery option:
                        </div>
        
                        {deliveryOptions.map((option) => {
        
                          let priceString = "FREE Shipping";
        
                          if (option.priceCents > 0) {
                            priceString = `${formatMoney(option.priceCents)} - Shipping`;
                          }
        
                          return (
                            <div key={option.id} className="delivery-option">
        
                              <input
                                type="radio"
                                checked={option.id === cartItem.selectedDeliveryOptionId}
                                onChange={() =>
                                  handleDeliveryChange(cartItem.productId, option.id)
                                }
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                              />
        
                              <div>
                                <div className="delivery-option-date">
                                  {dayjs(option.estimatedDeliveryTime)
                                    .format('dddd, MMMM D')}
                                </div>
        
                                <div className="delivery-option-price">
                                  {priceString}
                                </div>
                              </div>
        
                            </div>
                          );
                        })}
        
                      </div>
    );
}