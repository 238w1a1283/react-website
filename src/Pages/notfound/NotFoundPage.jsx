import { Header } from '../../components/Header';

export function NotFoundPage({ cart }) {

  return (
    <>
      <Header cart={cart} />

      <div style={{ padding: '40px', fontSize: '30px' }}>
        Page Not Found
      </div>
    </>
  );
}