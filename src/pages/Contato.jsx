import React from 'react';

function Contato() {
  return (
    <div className="container">
      <h1>Contato</h1>
      <p>Fale conosco para dúvidas, orçamentos ou sugestões!</p>
      <ul style={{listStyle: 'none', padding: 0, fontSize: '1.1rem'}}>
        <li>
          WhatsApp: <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" style={{color: '#43aaff', fontWeight: 'bold'}}>Clique aqui para conversar</a>
        </li>
        <li>Email: <a href="mailto:contato@sacospararesiduos.com" style={{color: '#7f5af0'}}>contato@sacospararesiduos.com</a></li>
      </ul>
      <p style={{marginTop: 24}}>Retornamos rapidamente pelo WhatsApp!</p>
    </div>
  );
}

export default Contato;
