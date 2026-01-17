import React from 'react';

const products = [
  {
    id: 1,
    name: 'Saco de Lixo Preto 30L',
    description: 'Resistente, ideal para uso doméstico. Material: PEAD.',
    price: 18.90,
    image: '/saco30l.jpg',
  },
  {
    id: 2,
    name: 'Saco de Lixo Azul 30L',
    description: 'Colorido para coleta seletiva. Material: PEBD.',
    price: 19.90,
    image: '/saco30l-azul.jpg',
  },
  {
    id: 3,
    name: 'Saco de Lixo Verde 50L',
    description: 'Ideal para resíduos orgânicos. Material: reciclado.',
    price: 24.90,
    image: '/saco50l-verde.jpg',
  },
  {
    id: 4,
    name: 'Saco de Lixo Amarelo 50L',
    description: 'Para coleta seletiva de metais. Material: PEBD.',
    price: 25.90,
    image: '/saco50l-amarelo.jpg',
  },
  {
    id: 5,
    name: 'Saco de Lixo Vermelho 100L',
    description: 'Grande capacidade, ideal para plásticos. Material: PEAD.',
    price: 36.90,
    image: '/saco100l-vermelho.jpg',
  },
  {
    id: 6,
    name: 'Saco de Lixo Marrom 100L',
    description: 'Para resíduos orgânicos. Material: reciclado.',
    price: 37.90,
    image: '/saco100l-marrom.jpg',
  },
  {
    id: 7,
    name: 'Saco de Lixo Transparente 30L',
    description: 'Permite visualização do conteúdo. Material: PEBD.',
    price: 20.90,
    image: '/saco30l-transparente.jpg',
  },
  {
    id: 8,
    name: 'Saco de Lixo Preto 60L',
    description: 'Alta resistência, uso industrial. Material: PEAD.',
    price: 29.90,
    image: '/saco60l-preto.jpg',
  },
  {
    id: 9,
    name: 'Saco de Lixo Roxo 60L',
    description: 'Destaque para resíduos hospitalares. Material: PEBD.',
    price: 32.90,
    image: '/saco60l-roxo.jpg',
  },
  {
    id: 10,
    name: 'Saco de Lixo 100L',
    description: 'Grande volume, uso geral. Material: PEAD.',
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
