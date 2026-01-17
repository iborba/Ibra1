import React from 'react';

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

function Home() {
  return (
    <div className="container">
      <h1>Sacos de Lixo</h1>
      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} width={120} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>R$ {product.price.toFixed(2)}</p>
            <a href={`/produto/${product.id}`}>Ver detalhes</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
