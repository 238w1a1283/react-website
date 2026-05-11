import dayjs from 'dayjs';
export default function DeliveryDate({cartItem, deliveryOptions}){
      const selectedDeliveryOption = deliveryOptions.find(
          (deliveryOption) =>
            deliveryOption.id === cartItem.selectedDeliveryOptionId
        );

        return(
                   <div className="delivery-date">
                              Delivery date: {
                                selectedDeliveryOption
                                  ? dayjs(selectedDeliveryOption.estimatedDeliveryTime)
                                      .format('dddd, MMMM D')
                                  : "Loading..."
                              }
                            </div>

        );
}