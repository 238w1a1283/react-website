import {
  it,
  expect,
  describe,
  vi
} from 'vitest';
import { useLocation } from 'react-router-dom';
import '@testing-library/jest-dom';

import {
  render,
  screen,
  within
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { PaymentSummary } from './PaymentSummary';
function Location() {

  const location = useLocation();

  return (
    <div data-testid="url-path">
      {location.pathname}
    </div>
  );

}
describe('PaymentSummary component', () => {

  it('displays the payment summary correctly', () => {

    const paymentSummary = {
      totalItems: 2,
      productCostCents: 3185,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 3684,
      taxCents: 368,
      totalCostCents: 4052
    };

    const loadCart = vi.fn();

    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByTestId('payment-summary-row-items')
    ).toHaveTextContent('$31.85');

    expect(
      screen.getByTestId('payment-summary-row-shipping')
    ).toHaveTextContent('$4.99');

    expect(
      screen.getByTestId('payment-summary-row-subtotal')
    ).toHaveTextContent('$36.84');

    expect(
      screen.getByTestId('payment-summary-row-tax')
    ).toHaveTextContent('$3.68');

    expect(
      screen.getByTestId('payment-summary-row-total')
    ).toHaveTextContent('$40.52');

  });

});