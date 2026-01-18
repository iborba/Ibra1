import React from 'react';

const parceiros = [
  {
    nome: 'EcoPlast',
    descricao: 'Soluções em plásticos reciclados.',
    logo: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
    site: 'https://ecoplast.com',
  },
  {
    nome: 'ReciclaMais',
    descricao: 'Coleta e logística reversa.',
    logo: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
    site: 'https://reciclamais.com',
  },
  {
    nome: 'VerdeLimpo',
    descricao: 'Consultoria ambiental.',
    logo: 'https://cdn-icons-png.flaticon.com/512/616/616494.png',
    site: 'https://verdelimpo.com',
  },
];

export default function ParceirosCards() {
  return (
    <div className="parceiros-cards">
      {parceiros.map((p, i) => (
        <a href={p.site} target="_blank" rel="noopener noreferrer" className="parceiro-card" key={i}>
          <img src={p.logo} alt={p.nome} />
          <div>
            <strong>{p.nome}</strong>
            <p>{p.descricao}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
