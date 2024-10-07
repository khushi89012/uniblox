import { useState } from 'react';
import { addToCart } from '../api/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './styles/Cart.css'; // Import the CSS file

const Cart = () => {
  const [userId, setUserId] = useState('');
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addToCart({ user_id: userId, item_id: itemId, quantity: parseInt(quantity) });
      alert('Item added to cart!');
      
      // Clear input fields
      setUserId('');
      setItemId('');
      setQuantity('');

      // Navigate to checkout page
      navigate('/checkout'); // Adjust the route as needed
    } catch (error) {
      console.error('Error adding to cart', error);
      alert('Failed to add item.');
    }
  };

  return (
    <div className="container"> {/* Added container for centering */}
      <div className="cart"> {/* Cart wrapper */}
        <h2>Add to Cart</h2>
        <form onSubmit={handleAddToCart}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item ID"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button type="submit">Add to Cart</button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
