const products = [
  {
    id: 1,
    name: 'Saco de Lixo 30L Preto',
    category: 'Sacos de Lixo',
    description:
      'Saco de lixo residencial de 30 litros na cor preta, fabricado com plástico reciclado de alta resistência. Ideal para lixeiras de cozinha e banheiro. Pacote com 50 unidades. Suporta resíduos orgânicos e secos sem rasgar.',
    shortDescription: 'Saco 30L preto resistente para cozinha e banheiro. Pacote c/ 50 un.',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&h=600&fit=crop',
    badge: 'Mais Vendido',
  },
  {
    id: 2,
    name: 'Saco de Lixo 50L Azul',
    category: 'Sacos de Lixo',
    description:
      'Saco de lixo de 50 litros na cor azul, ideal para coleta seletiva de papel e papelão. Fabricado com polietileno reciclado pós-consumo. Reforçado nas laterais para evitar furos. Pacote com 30 unidades.',
    shortDescription: 'Saco 50L azul para coleta seletiva de papel. Pacote c/ 30 un.',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1572532839196-8e27e6591b29?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 3,
    name: 'Saco de Lixo 100L Reforçado',
    category: 'Sacos de Lixo',
    description:
      'Saco de lixo industrial de 100 litros, extra-reforçado para uso pesado. Fabricado com plástico reciclado de alta densidade. Perfeito para condomínios, restaurantes e empresas. Pacote com 25 unidades. Resistente a perfurações.',
    shortDescription: 'Saco 100L reforçado para uso industrial e comercial. Pacote c/ 25 un.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?w=600&h=600&fit=crop',
    badge: 'Novo',
  },
  {
    id: 4,
    name: 'Saco de Lixo 60L Verde',
    category: 'Sacos de Lixo',
    description:
      'Saco de lixo de 60 litros na cor verde para coleta seletiva de vidro. Plástico reciclado com espessura reforçada para suportar materiais pesados e cortantes. Pacote com 30 unidades.',
    shortDescription: 'Saco 60L verde para coleta seletiva de vidro. Pacote c/ 30 un.',
    price: 22.90,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 5,
    name: 'Desinfetante Multiuso 500ml',
    category: 'Limpeza Residencial',
    description:
      'Desinfetante multiuso com fragrância de lavanda, embalado em frasco de plástico 100% reciclado. Eficaz contra 99,9% das bactérias. Indicado para pisos, azulejos, pias e superfícies em geral. Não agride o meio ambiente.',
    shortDescription: 'Desinfetante lavanda em frasco reciclado. Elimina 99,9% das bactérias.',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&h=600&fit=crop',
    badge: 'Popular',
  },
  {
    id: 6,
    name: 'Pano Multiuso Rolo 50un',
    category: 'Limpeza Residencial',
    description:
      'Rolo com 50 panos multiuso de alta absorção, fabricados com fibras de PET reciclado. Reutilizáveis e laváveis, substituem panos de chão descartáveis. Ideais para cozinha, banheiro e limpeza geral. Embalagem reciclável.',
    shortDescription: 'Rolo c/ 50 panos multiuso de PET reciclado. Laváveis e reutilizáveis.',
    price: 14.50,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 7,
    name: 'Saco de Lixo 200L Industrial',
    category: 'Sacos de Lixo',
    description:
      'Saco de lixo de 200 litros para uso industrial pesado. Fabricado com polietileno reciclado de altíssima resistência. Indicado para fábricas, galpões e grandes geradores de resíduos. Pacote com 15 unidades. Solda reforçada no fundo.',
    shortDescription: 'Saco 200L industrial de alta resistência. Pacote c/ 15 un.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 8,
    name: 'Luvas de Limpeza Par',
    category: 'Limpeza Residencial',
    description:
      'Par de luvas de borracha para limpeza doméstica, com forro interno de algodão para maior conforto. Embalagem fabricada com plástico reciclado. Antiderrapantes, resistentes a produtos químicos. Tamanhos P, M e G.',
    shortDescription: 'Par de luvas antiderrapantes com embalagem reciclada. Tamanhos P/M/G.',
    price: 9.90,
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 9,
    name: 'Detergente Biodegradável 1L',
    category: 'Limpeza Residencial',
    description:
      'Detergente líquido biodegradável para louças, com fórmula concentrada de alto rendimento. Embalagem em plástico reciclado pós-consumo. Não contém fosfato. Fragrância neutra. Rende até 3x mais que detergentes convencionais.',
    shortDescription: 'Detergente concentrado biodegradável em embalagem reciclada. 1 litro.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 10,
    name: 'Saco de Lixo 30L Transparente',
    category: 'Sacos de Lixo',
    description:
      'Saco de lixo transparente de 30 litros, ideal para visualização do conteúdo e coleta seletiva em escritórios. Fabricado com plástico reciclado. Pacote com 50 unidades. Atende normas de separação de resíduos.',
    shortDescription: 'Saco 30L transparente para escritórios e coleta seletiva. Pacote c/ 50 un.',
    price: 14.90,
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 11,
    name: 'Balde Espremedor 12L',
    category: 'Limpeza Residencial',
    description:
      'Balde com espremedor de 12 litros, fabricado em polipropileno reciclado. Sistema de espremedor prático e eficiente. Alça ergonômica reforçada. Ideal para limpeza de pisos com rodo ou mop. Disponível em cinza e azul.',
    shortDescription: 'Balde c/ espremedor 12L em polipropileno reciclado.',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=600&h=600&fit=crop',
    badge: 'Novo',
  },
  {
    id: 12,
    name: 'Saco de Lixo 50L Amarelo',
    category: 'Sacos de Lixo',
    description:
      'Saco de lixo de 50 litros na cor amarela para coleta seletiva de metais. Fabricado com plástico reciclado resistente. Ideal para empresas e condomínios que fazem separação de resíduos. Pacote com 30 unidades.',
    shortDescription: 'Saco 50L amarelo para coleta seletiva de metais. Pacote c/ 30 un.',
    price: 19.90,
    image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?w=600&h=600&fit=crop',
    badge: 'Popular',
  },
];

export const categories = [...new Set(products.map((p) => p.category))];

export default products;
