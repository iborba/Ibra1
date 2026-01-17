import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  function removeItem(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  function updateQuantity(index, newQuantity) {
    const newCart = [...cart];
    newCart[index].quantity = newQuantity;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  function goToCheckout() {
    navigate('/checkout');
  }

  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="container">
      <h1>Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - R$ {item.price.toFixed(2)} x 
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={item.quantity || 1}
                  onChange={e => updateQuantity(idx, Number(e.target.value))}
                  style={{ width: 60 }}
                />
                = <b>R$ {(item.price * (item.quantity || 1)).toFixed(2)}</b>
                <button onClick={() => removeItem(idx)} style={{ marginLeft: 8 }}>Remover</button>
              </li>
            ))}
          </ul>
          <p>Total: R$ {total.toFixed(2)}</p>
          <button onClick={goToCheckout}>Finalizar compra</button>
        </>
      )}
    </div>
  );
}

export default Cart;
