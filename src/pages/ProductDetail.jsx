import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Saco de Lixo 30L',
    description: 'Pacote com 50 unidades. Resistente e ideal para uso doméstico.',
    price: 19.90,
    image: '/saco30l.jpg',
  },
  {
    id: 2,
    name: 'Saco de Lixo 50L',
    description: 'Pacote com 40 unidades. Perfeito para escritórios e condomínios.',
    price: 29.90,
    image: '/saco50l.jpg',
  },
  {
    id: 3,
    name: 'Saco de Lixo 100L',
    description: 'Pacote com 20 unidades. Indicado para grandes volumes.',
    price: 34.90,
    image: '/saco100l.jpg',
  },
];

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div>Produto não encontrado.</div>;

  function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/carrinho');
  }

  return (
    <div className="container">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} width={180} />
      <p>{product.description}</p>
      <p>R$ {product.price.toFixed(2)}</p>
      <button onClick={addToCart}>Adicionar ao carrinho</button>
    </div>
  );
}

export default ProductDetail;
