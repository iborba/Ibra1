const products = [
  {
    id: 1,
    name: 'EcoBoard Floreira',
    category: 'Jardim',
    description:
      'Uma floreira robusta feita inteiramente de plástico HDPE reciclado. Resistente a intempéries e estabilizada contra raios UV, ela nunca apodrece, racha ou lasca. Perfeita para ervas, flores ou pequenas hortaliças na sua varanda ou terraço.',
    shortDescription: 'Floreira de plástico reciclado resistente a intempéries para varandas e terraços.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=600&fit=crop',
    badge: 'Mais Vendido',
  },
  {
    id: 2,
    name: 'ReThread Bolsa Ecológica',
    category: 'Acessórios',
    description:
      'Esta bolsa espaçosa é tecida a partir de garrafas PET recicladas — cada bolsa desvia aproximadamente 12 garrafas do aterro sanitário. Possui alças reforçadas, bolso interno com zíper e forro impermeável. Lavável na máquina.',
    shortDescription: 'Bolsa espaçosa tecida a partir de 12 garrafas PET recicladas.',
    price: 28.50,
    image: 'https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 3,
    name: 'OceanDeck Cadeira',
    category: 'Móveis',
    description:
      'Relaxe em uma cadeira feita de plástico recuperado do oceano e HDPE pós-consumo. O formato ergonômico Adirondack garante longas noites confortáveis ao ar livre. Ferragens em aço inoxidável garantem décadas de uso sem manutenção.',
    shortDescription: 'Cadeira Adirondack de plástico recuperado do oceano.',
    price: 189.00,
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop',
    badge: 'Novo',
  },
  {
    id: 4,
    name: 'GreenGrid Caixa Organizadora',
    category: 'Casa',
    description:
      'Caixa organizadora empilhável moldada por injeção em polipropileno 100% reciclado pós-consumo. Ideal para despensas, garagens e oficinas. Suporta até 25 kg e se encaixa quando vazia para economizar espaço.',
    shortDescription: 'Caixa empilhável de polipropileno 100% reciclado.',
    price: 18.75,
    image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 5,
    name: 'ClearCycle Garrafa d\'Água',
    category: 'Acessórios',
    description:
      'Garrafa reutilizável de 750 ml feita de plástico Tritan reciclado. Livre de BPA, à prova de quebra e pode ir na lava-louças. A tampa de rosca à prova de vazamentos e a boca larga facilitam o enchimento e a limpeza.',
    shortDescription: 'Garrafa de 750 ml livre de BPA em Tritan reciclado.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop',
    badge: 'Popular',
  },
  {
    id: 6,
    name: 'TerraTile Conjunto de Porta-Copos',
    category: 'Casa',
    description:
      'Conjunto de 6 porta-copos geométricos prensados a partir de flocos de HDPE reciclado. Cada porta-copo exibe um marmorizado único — nenhum conjunto é igual ao outro. Base antiderrapante que protege todas as superfícies. Acompanha caixa-presente de papelão reciclado.',
    shortDescription: 'Conjunto de 6 porta-copos únicos de flocos de HDPE reciclado.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 7,
    name: 'LoopLumber Canteiro Elevado',
    category: 'Jardim',
    description:
      'Canteiro elevado modular construído com compósito de madeira-plástico reciclado. Não empenha, não apodrece e não atrai cupins. Montagem simples com parafusos, sem ferramentas. Expansível com kits adicionais.',
    shortDescription: 'Canteiro modular de compósito madeira-plástico reciclado.',
    price: 74.50,
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 8,
    name: 'RecoCup Copo Térmico',
    category: 'Acessórios',
    description:
      'Copo térmico de parede dupla de 350 ml feito de polipropileno reciclado. Mantém bebidas quentes por 2 horas ou geladas por 4. A tampa com trava evita derramamentos. Cabe em porta-copos de carro padrão.',
    shortDescription: 'Copo térmico de parede dupla em PP reciclado.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 9,
    name: 'PlyReborn Organizador de Mesa',
    category: 'Casa',
    description:
      'Mantenha sua mesa organizada com este organizador multicompartimentos feito de plástico ABS reciclado. Possui compartimentos para canetas, celular, cartões e cabos. Acabamento fosco elegante em carvão ou sálvia.',
    shortDescription: 'Organizador de mesa multicompartimentos em ABS reciclado.',
    price: 29.90,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 10,
    name: 'SeaCycle Óculos de Sol',
    category: 'Acessórios',
    description:
      'Óculos de sol polarizados e leves com armação moldada por injeção a partir de plástico reciclado recolhido do oceano. Proteção UV400, dobradiças flexíveis e estojo de microfibra feito de PET reciclado. Disponível em Meia-Noite e Madeira Flutuante.',
    shortDescription: 'Óculos polarizados de plástico reciclado recolhido do oceano.',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
    badge: 'Novo',
  },
  {
    id: 11,
    name: 'VerdeFence Painel de Cerca',
    category: 'Jardim',
    description:
      'Painel de cerca para privacidade feito de 100% plásticos mistos reciclados. Cada painel de 1,8 m x 1,8 m substitui aproximadamente 40 kg de resíduos de aterro. Não apodrece, não descasca e não precisa de pintura. Disponível em Cinza Ardósia e Nogueira.',
    shortDescription: 'Painel de cerca de 100% plásticos mistos reciclados.',
    price: 119.00,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop',
    badge: null,
  },
  {
    id: 12,
    name: 'NuBin Composteira de Cozinha',
    category: 'Casa',
    description:
      'Composteira de bancada com capacidade de 5 L, moldada em HDPE reciclado. A tampa com fecho e o filtro de carvão substituível mantêm os odores contidos. Balde interno lavável na lava-louças para fácil limpeza.',
    shortDescription: 'Composteira de bancada em HDPE reciclado.',
    price: 26.50,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=600&fit=crop',
    badge: 'Popular',
  },
];

export const categories = [...new Set(products.map((p) => p.category))];

export default products;
