import React from 'react';

const products = [
  {
    id: 1,
    name: 'Saco de Lixo Preto 30L',
    description: 'Resistente, ideal para uso doméstico. Material: PEAD.',
    price: 18.90,
    image: 'https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&w=300&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Saco de Lixo Azul 30L',
    description: 'Colorido para coleta seletiva. Material: PEBD.',
    price: 19.90,
    image: 'https://images.pexels.com/photos/6197121/pexels-photo-6197121.jpeg?auto=compress&w=300&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Saco de Lixo Verde 50L',
    description: 'Ideal para resíduos orgânicos. Material: reciclado.',
    price: 24.90,
    image: 'https://images.pexels.com/photos/6197122/pexels-photo-6197122.jpeg?auto=compress&w=300&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Saco de Lixo Amarelo 50L',
    description: 'Para coleta seletiva de metais. Material: PEBD.',
    price: 25.90,
    image: 'https://images.pexels.com/photos/6197123/pexels-photo-6197123.jpeg?auto=compress&w=300&h=300&fit=crop',
  },
  {
    id: 5,
    name: 'Saco de Lixo Vermelho 100L',
    description: 'Grande capacidade, ideal para plásticos. Material: PEAD.',
    price: 36.90,
    image: 'https://images.pexels.com/photos/6197124/pexels-photo-6197124.jpeg?auto=compress&w=300&h=300&fit=crop',
  },
  {
    id: 6,
    name: 'Saco de Lixo Marrom 100L',
    description: 'Para resíduos orgânicos. Material: reciclado.',
    price: 37.90,
    image: 'https://images.pexels.com/photos/6197125/pexels-photo-6197125.jpeg?auto=compress&w=300&h=300&fit=crop',
  },
  {
    id: 7,
    name: 'Saco de Lixo Transparente 30L',
    description: 'Permite visualização do conteúdo. Material: PEBD.',
    price: 20.90,
    image: 'https://images.pexels.com/photos/6197126/pexels-photo-6197126.jpeg?auto=compress&w=300&h=300&fit=crop',
  },
  {
    id: 8,
    name: 'Saco de Lixo Preto 60L',
    description: 'Alta resistência, uso industrial. Material: PEAD.',
    price: 29.90,
    image: 'https://images.pexels.com/photos/6197127/pexels-photo-6197127.jpeg?auto=compress&w=300&h=300&fit=crop',
  },
  {
    id: 9,
    name: 'Saco de Lixo Roxo 60L',
    description: 'Destaque para resíduos hospitalares. Material: PEBD.',
    price: 32.90,
    image: 'https://images.pexels.com/photos/6197128/pexels-photo-6197128.jpeg?auto=compress&w=300&h=300&fit=crop',
  },
  {
    id: 10,
    name: 'Saco de Lixo 100L',
    description: 'Grande volume, uso geral. Material: PEAD.',
    price: 34.90,
    image: 'https://images.pexels.com/photos/6197129/pexels-photo-6197129.jpeg?auto=compress&w=300&h=300&fit=crop',
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
            <a href={`#/produto/${product.id}`} className="details-btn">Ver detalhes</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
