import { useState } from 'react';
import { checkout } from '../api/api';

const Checkout = () => {
  const [userId, setUserId] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [total, setTotal] = useState(null);

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const response = await checkout({ user_id: userId, discount_code: discountCode });
      setTotal(response.data.total);
      alert(`Checkout successful! Total: $${response.data.total}`);
    } catch (error) {
      console.error('Error during checkout', error);
      alert('Checkout failed.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleCheckout}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Discount Code (optional)"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button type="submit">Checkout</button>
      </form>
      {total !== null && <p>Total Amount: ${total}</p>}
    </div>
  );
};

export default Checkout;
