import React, { useEffect, useState } from 'react';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setFinished(true);
    localStorage.removeItem('cart');
  }

  if (finished) {
    return (
      <div className="container">
        <h1>Pedido realizado!</h1>
        <p>Obrigado pela sua compra, {name}!</p>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Endereço:</label>
          <input value={address} onChange={e => setAddress(e.target.value)} required />
        </div>
        <p>Total: R$ {total.toFixed(2)}</p>
        <button type="submit">Finalizar pedido</button>
      </form>
    </div>
  );
}

export default Checkout;
