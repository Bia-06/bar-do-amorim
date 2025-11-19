import React, { useState, useEffect, useMemo } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { usePriceFormatter } from '../../hooks/usePriceFormatter';
import { useLocation } from 'react-router-dom';
import './Menu.css';

const CATEGORIES = {
  TODOS: 'todos',
  HAPPY_HOUR: 'happy-hour',
  ALMOCO: 'almoco',
  JANTAR: 'jantar',
  ESPETOS: 'espetos',
  PORCOES: 'porcoes',
  CERVEJAS: 'cervejas',
  BEBIDAS: 'bebidas',
  DRINKS: 'drinks',
  APERITIVO: 'aperitivo'
};

const SUBCATEGORIES = {
  TODOS: 'todos',
  PORCOES_HAPPY: 'porcoes-happy',
  CERVEJAS_HAPPY: 'cervejas-happy',
  CAIPIRINHAS_HAPPY: 'caipirinhas-happy',
  COMIDA_BOTECO: 'comida-boteco',
  PORCOES_BOTECO: 'porcoes-boteco',
  BOLINHOS_BOTECO: 'bolinhos-boteco',
  GUARNICOES: 'guarnicoes',
  DRINKS_SUB: 'drinks',
  CAIPIRINHAS: 'caipirinhas',
  DOSES: 'doses',
  SUCOS: 'sucos',
  REFRIGERANTES: 'refrigerantes',
  CERVEJA_600ML: '600ml',
  LONG_NECK: 'long-neck'
};

const Menu = () => {
  const { setProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.TODOS);
  const [activeSubcategory, setActiveSubcategory] = useState(SUBCATEGORIES.TODOS);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  usePriceFormatter();

  useEffect(() => {
    const getUrlParams = () => {
      const searchParams = new URLSearchParams(location.search);
      const categoria = searchParams.get('categoria');
      return { categoria };
    };

    const { categoria } = getUrlParams();
    
    console.log('Parâmetro da URL:', categoria);
    
    if (categoria) {
      const categoryMap = {
        'happy-hour': CATEGORIES.HAPPY_HOUR,
        'almoco': CATEGORIES.ALMOCO,
        'porcoes': CATEGORIES.PORCOES
      };
      
      const mappedCategory = categoryMap[categoria];
      
      if (mappedCategory) {
        console.log('Categoria mapeada:', mappedCategory);
        setActiveCategory(mappedCategory);
        setActiveSubcategory(SUBCATEGORIES.TODOS);
        localStorage.setItem('selectedCategory', mappedCategory);
        localStorage.setItem('selectedSubcategory', SUBCATEGORIES.TODOS);
      }
    } else {
      const savedCategory = localStorage.getItem('selectedCategory');
      const savedSubcategory = localStorage.getItem('selectedSubcategory');
      
      console.log('Carregando categoria salva:', savedCategory);
      
      if (savedCategory && savedCategory !== 'undefined') {
        setActiveCategory(savedCategory);
      }
      if (savedSubcategory && savedSubcategory !== 'undefined') {
        setActiveSubcategory(savedSubcategory);
      }
    }
  }, [location.search]); 

  useEffect(() => {
    if (activeCategory && activeCategory !== 'todos') {
      localStorage.setItem('selectedCategory', activeCategory);
    }
    if (activeSubcategory && activeSubcategory !== 'todos') {
      localStorage.setItem('selectedSubcategory', activeSubcategory);
    }
  }, [activeCategory, activeSubcategory]);

  // Estrutura de subcategorias organizada
  const subcategories = {
    [CATEGORIES.HAPPY_HOUR]: [
      { id: SUBCATEGORIES.TODOS, name: 'Todos Happy Hour' },
      { id: SUBCATEGORIES.PORCOES_HAPPY, name: 'Porções Happy' },
      { id: SUBCATEGORIES.CERVEJAS_HAPPY, name: 'Cervejas Happy' },
      { id: SUBCATEGORIES.CAIPIRINHAS_HAPPY, name: 'Caipirinhas Happy' }
    ],
    [CATEGORIES.PORCOES]: [
      { id: SUBCATEGORIES.TODOS, name: 'Todas as Porções' },
      { id: SUBCATEGORIES.COMIDA_BOTECO, name: 'Comida de Boteco' },
      { id: SUBCATEGORIES.PORCOES_BOTECO, name: 'Porções de Boteco' },
      { id: SUBCATEGORIES.BOLINHOS_BOTECO, name: 'Bolinhos de Boteco' }
    ],
    [CATEGORIES.DRINKS]: [
      { id: SUBCATEGORIES.TODOS, name: 'Todos os Drinks' },
      { id: SUBCATEGORIES.DRINKS_SUB, name: 'Drinks' },
      { id: SUBCATEGORIES.CAIPIRINHAS, name: 'Caipirinhas' },
      { id: SUBCATEGORIES.DOSES, name: 'Doses' }
    ],
    [CATEGORIES.ALMOCO]: [
      { id: SUBCATEGORIES.TODOS, name: 'Todos os Pratos' },
      { id: SUBCATEGORIES.ALMOCO, name: 'Almoço' },
      { id: SUBCATEGORIES.GUARNICOES, name: 'Guarnições' }
    ],
    [CATEGORIES.CERVEJAS]: [
      { id: SUBCATEGORIES.TODOS, name: 'Todas as Cervejas' },
      { id: SUBCATEGORIES.CERVEJA_600ML, name: '600ml' },
      { id: SUBCATEGORIES.LONG_NECK, name: 'Long Neck' }
    ],
    [CATEGORIES.BEBIDAS]: [
      { id: SUBCATEGORIES.TODOS, name: 'Todas as Bebidas' },
      { id: SUBCATEGORIES.SUCOS, name: 'Sucos e Águas' },
      { id: SUBCATEGORIES.REFRIGERANTES, name: 'Refrigerantes' }
    ]
  };

  // Categorias principais
  const categories = [
    { 
      id: CATEGORIES.TODOS, 
      name: 'Todos', 
      image: '/images/categorias/todos.png' 
    },
    { 
      id: CATEGORIES.HAPPY_HOUR, 
      name: 'Happy Hour', 
      image: '/images/categorias/happy-hour.png' 
    },
    { 
      id: CATEGORIES.ALMOCO, 
      name: 'Almoço', 
      image: '/images/categorias/almoco.png' 
    },
    { 
      id: CATEGORIES.JANTAR, 
      name: 'Jantar', 
      image: '/images/categorias/jantar.png' 
    },
    { 
      id: CATEGORIES.ESPETOS, 
      name: 'Espetos', 
      image: '/images/categorias/espetos.png' 
    },
    { 
      id: CATEGORIES.PORCOES, 
      name: 'Porções', 
      image: '/images/categorias/porcoes.png' 
    },
    { 
      id: CATEGORIES.CERVEJAS, 
      name: 'Cervejas', 
      image: '/images/categorias/cervejas.png' 
    },
    { 
      id: CATEGORIES.BEBIDAS, 
      name: 'Bebidas', 
      image: '/images/categorias/bebidas.png' 
    },
    { 
      id: CATEGORIES.DRINKS, 
      name: 'Drinks', 
      image: '/images/categorias/drinks.png' 
    },
    { 
      id: CATEGORIES.APERITIVO, 
      name: 'Aperitivo', 
      image: '/images/categorias/aperitivo.png' 
    }
  ];
  // Produtos organizados por categoria
  const products = useMemo(() => [
    // ALMOÇO - PRATOS PRINCIPAIS
    {
      id: 500,
      name: "Almoço com Churrasco",
      description: "Espeto de 150g (Churrasquinho, frango, panceta ou linguiça) acompanha: vinagrete, mandioca cozida, arroz e feijão tropeiro.",
      price: 32.90,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/almocochurras.jpg",
      details: {
        individual: "R$ 32,90",
        media: "Não disponível", 
        grande: "Não disponível",
        observacao: "Quarta à Sexta, das 11h às 14h30"
      }
    },
    {
      id: 1,
      name: "Feijoada da Casa",
      description: "Bisteca de porco, pé de porco, costelinha, paio, bacon, carne seca e temperos da casa. Acompanha couve refogada, torresmo à pururuca, farofa da casa, vinagrete apimentado, feijão preto e arroz branco.",
      price: 49.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/feijoada.jpg",
      details: {
        individual: "R$ 49,00",
        media: "R$ 98,00", 
        grande: "R$ 180,00",
        observacao: "Somente aos sábados"
      }
    },
    {
      id: 2,
      name: "Frango Grelhado",
      description: "Frango grelhado, batata frita, ovo frito, arroz e feijão fresquinho.",
      price: 32.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/frangogre.jpg",
      details: {
        individual: "R$ 32,00",
        media: "R$ 58,00", 
        grande: "R$ 130,00",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 3,
      name: "Parmegiana de Bife",
      description: "Bife bovino empanado, coberto com mussarela ao molho parmegiana, batata frita e arroz branco.",
      price: 38.90,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/parmegiana.jpg",
      details: {
        individual: "R$ 38,90",
        media: "R$ 72,00", 
        grande: "R$ 130,00",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 4,
      name: "Parmegiana de Filé Mignon",
      description: "Filé mignon empanado coberto com mussarela ao molho parmegiana, batata frita e arroz branco.",
      price: 65.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/parmegiana.jpg",
      details: {
        individual: "R$ 65,00",
        media: "R$ 115,00", 
        grande: "R$ 195,00",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 5,
      name: "Parmegiana de Frango",
      description: "Filé de frango empanado, coberto com mussarela ao molho parmegiana, batata frita e arroz branco.",
      price: 33.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/parmegiana.jpg",
      details: {
        individual: "R$ 33,00",
        media: "R$ 65,00", 
        grande: "R$ 125,00",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 6,
      name: "Parmegiana de Tilápia",
      description: "Filé de tilápia empanado, coberto com mussarela ao molho parmegiana, batata frita e arroz branco.",
      price: 54.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/parmegiana.jpg",
      details: {
        individual: "R$ 54,00",
        media: "R$ 84,00", 
        grande: "R$ 165,00",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 7,
      name: "Picanha à Moda",
      description: "Picanha ao alho grelhada, mandioca frita, vinagrete, farofa da casa e arroz carreteiro.",
      price: 120.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/picanha.jpg",
      details: {
        individual: "Não disponível",
        media: "R$ 120,00", 
        grande: "R$ 195,00",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 8,
      name: "Prato do Dia",
      description: "Prato escolhido pela casa (favor consultar).",
      price: 32.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      details: {
        individual: "R$ 32,00",
        media: "R$ 57,00", 
        grande: "R$ 110,00",
        observacao: "Apenas Segunda-feira e Terça-feira"
      }
    },
    {
      id: 9,
      name: "Spaguete ao Sugo com Almôndegas",
      description: "Spaguete ao molho sugo com parmesão e almôndegas.",
      price: 38.90,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/spaguete.jpg",
      details: {
        individual: "R$ 38,90",
        media: "Não disponível", 
        grande: "Não disponível",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 10,
      name: "Tradicional",
      description: "Bife bovino acebolado, à milanesa ou frango à milanesa, ovo frito, batata frita, farofa da casa, arroz branco e feijão fresquinho.",
      price: 34.90,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/tradicional.jpg",
      details: {
        individual: "R$ 34,90",
        media: "R$ 62,00", 
        grande: "R$ 130,00",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 11,
      name: "Virado à Paulista",
      description: "Bisteca de porco, ovo frito, linguiça, couve refogada, banana à milanesa, arroz branco e tutu de feijão.",
      price: 34.90,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/virado.jpg",
      details: {
        individual: "R$ 34,90",
        media: "R$ 62,00", 
        grande: "R$ 130,00",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 12,
      name: "Salada Mista",
      description: "Salame, muçarela, azeitona, ovo de codorna, cenoura, pepino e tomate.",
      price: 44.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/saladamista.jpg",
      details: {
        individual: "Não disponível",
        media: "R$ 44,00", 
        grande: "R$ 62,90",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 13,
      name: "Salada da Casa",
      description: "Alface, tomate, cebola roxa, palmito e azeitona.",
      price: 49.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      image: "/images/produtos/saladacasa.jpg",
      details: {
        individual: "Não disponível",
        media: "R$ 49,00", 
        grande: "Não disponível",
        observacao: "Segunda à Sábado, das 11h às 14h30"
      }
    },
    {
      id: 14,
      name: "Salada a Vontade",
      description: "Sirva-se à vontade no nosso buffet de salada, acompanha uma proteína: Bife acebolado, frango grelhado ou bisteca de porco.",
      price: 25.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.ALMOCO,
      details: {
        individual: "R$ 25,00",
        media: "Não disponível", 
        grande: "Não disponível",
        observacao: "Segunda à Sexta, das 11h às 14h30"
      }
    },

    // ALMOÇO - GUARNIÇÕES
    {
      id: 15,
      name: "Farofa da Casa",
      price: 9.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.GUARNICOES
    },
    {
      id: 16,
      name: "Mandioca Frita",
      price: 15.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.GUARNICOES
    },
    {
      id: 17,
      name: "Mandioca Cozida",
      price: 13.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.GUARNICOES
    },
    {
      id: 18,
      name: "Vinagrete",
      price: 10.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.GUARNICOES
    },
    {
      id: 19,
      name: "Bacon Frito",
      price: 15.00,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.GUARNICOES
    },
    {
      id: 20,
      name: "Pãozinho",
      price: 3.50,
      category: CATEGORIES.ALMOCO,
      subcategory: SUBCATEGORIES.GUARNICOES
    },

    // APERITIVO
    {
      id: 21,
      name: "Amendoim",
      price: 9.00,
      category: CATEGORIES.APERITIVO
    },
    {
      id: 22,
      name: "Azeitona",
      image: "/images/produtos/apazeitona.jpg",
      price: 19.90,
      category: CATEGORIES.APERITIVO
    },
    {
      id: 23,
      name: "Ceviche",
      image: "/images/produtos/Ceviche.jpg",
      price: 42.00,
      category: CATEGORIES.APERITIVO
    },
    {
      id: 24,
      name: "Ovo de Codorna",
      image: "/images/produtos/apcodorna.jpg",
      price: 18.00,
      category: CATEGORIES.APERITIVO
    },
    {
      id: 25,
      name: "Palitos de Cenoura",
      image: "/images/produtos/apcenoura.jpg",
      price: 18.00,
      category: CATEGORIES.APERITIVO
    },
    {
      id: 26,
      name: "Salame",
      image: "/images/produtos/Salame.jpg",
      price: 35.00,
      category: CATEGORIES.APERITIVO
    },
    {
      id: 27,
      name: "Torresminho à Pururuca",
      image: "/images/produtos/AdcTorresminho.jpg",
      price: 25.00,
      category: CATEGORIES.APERITIVO
    },

    // JANTAR
    {
      id: 28,
      name: "Salada da Casa",
      description: "Alface, tomate, cebola roxa, palmito e azeitonas (Serve 2 pessoas).",
      image: "/images/produtos/saladacasa.jpg",
      price: 49.00,
      category: CATEGORIES.JANTAR
    },
    {
      id: 29,
      name: "Amostradinho",
      description: "Purê de cabotiã, recheio de camarão coberto com creme de queijo.",
      image: "/images/produtos/Amostradinho.jpg",
      price: 69.00,
      category: CATEGORIES.JANTAR
    },
    {
      id: 30,
      name: "Carpaccio",
      description: "Finas fatias de carne com molho de mostarda dijon, alcaparras, rúcula, queijo parmesão finamente ralado.",
      image: "/images/produtos/Carpaccio.jpg",
      price: 68.00,
      category: CATEGORIES.JANTAR,
    },
    {
      id: 31,
      name: "Filé Parmegiana",
      description: "Filé mignon empanado, coberto com mussarela, regado de um delicioso molho parmegiana, salpicado com parmesão. Acompanha batata chips, arroz branco e banana à milanesa.",
      price: 62.90,
      category: CATEGORIES.JANTAR,
      image: "/images/produtos/FileParmegiana.jpg",
      details: {
        individual: "R$ 62,90",
        media: "Não disponível", 
        grande: "R$ 179,90"
      }
    },
    {
      id: 32,
      name: "Filé Parmegiana Carioca",
      description: "Filé mignon empanado com molho sugo, palmito, ervilhas frescas e azeitona. Acompanha batata chips, arroz branco e banana à milanesa.",
      image: "/images/produtos/FileCarioca.jpg",
      price: 190.00,
      category: CATEGORIES.JANTAR,
    },
    {
      id: 33,
      name: "Rabada com Polenta",
      description: "Rabada com polenta.",
      price: 95.00,
      category: CATEGORIES.JANTAR,
      observacao: "Apenas às segundas-feiras"
    },
    {
      id: 34,
      name: "Spaguete ao Sugo com Almôndegas",
      description: "Spaguete ao molho sugo com parmesão e almôndegas.",
      image: "/images/produtos/spaguete.jpg",
      price: 38.50,
      category: CATEGORIES.JANTAR,
    },

    // ESPETOS
    {
      id: 35,
      name: "Alcatra",
      description: "Espeto de alcatra 250g. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/Alcatra.jpg",
      price: 32.00,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 36,
      name: "Filé Mignon ao Alho",
      description: "Espeto de filé mignon ao alho 250g. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/FileAlho.jpg",
      price: 39.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 37,
      name: "Linguiça",
      description: "Espeto de linguiça 250g. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/Linguica.jpg",
      price: 19.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 38,
      name: "Panceta",
      description: "Espeto de panceta 250g. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/Panceta.jpg",
      price: 19.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 39,
      name: "Queijo",
      description: "Espeto de queijo bolinha 250g. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/Queijo.jpg",
      price: 25.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 40,
      name: "Coração de Frango",
      description: "Espeto de coração de frango 250g. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/Coracao.jpg",
      price: 24.00,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 41,
      name: "Fraldinha",
      description: "Espeto de fraldinha 250g. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/Fraldinha.jpg",
      price: 28.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 42,
      name: "Medalhão de Frango",
      description: "Espeto de medalhão de frango 250g. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/Medalhao.jpg",
      price: 25.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 43,
      name: "Pão de Alho",
      description: "Espeto de pão de alho. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/PaoAlho.jpg",
      price: 13.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 44,
      name: "Xixo",
      description: "Espeto de alcatra com legumes 250g. Acompanha vinagrete e farofa da casa.",
      image: "/images/produtos/Xixo.jpg",
      price: 32.00,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 45,
      name: "Churrasquinho com Legumes",
      description: "Espetinho de miolo de ácem com legumes 150g (Não tem acompanhamento).",
      image: "/images/produtos/ChurrasLegumes.jpg",
      price: 18.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 46,
      name: "Churrasquinho",
      description: "Espetinho de miolo de ácem 150g (Não tem acompanhamento).",
      image: "/images/produtos/Churrasquinho.jpg",
      price: 18.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 47,
      name: "Frango",
      description: "Espetinho de frango 150g (Não tem acompanhamento).",
      image: "/images/produtos/EspetoFrango.jpg",
      price: 17.90,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 48,
      name: "Kit Churrasco com Alcatra",
      description: "Kit churrasco com 2 espetos de sua escolha (não incluso Filé Mignon). Acompanha: mandioca cozida, farofa da casa, vinagrete, molhinho da casa e arroz à grega.",
      image: "/images/produtos/KitChurrasco.jpg",
      price: 78.00,
      category: CATEGORIES.ESPETOS
    },
    {
      id: 49,
      name: "Kit Churrasco com Fraldinha",
      description: "Kit churrasco com 2 espetos de sua escolha (não incluso Alcatra e Filé Mignon). Acompanha: mandioca cozida, farofa da casa, vinagrete, molhinho da casa e arroz à grega.",
      image: "/images/produtos/KitChurrasco.jpg",
      price: 72.00,
      category: CATEGORIES.ESPETOS
    },

    // PORÇÕES - COMIDA DE BOTECO
    {
      id: 50,
      name: "Dobradinha",
      description: "Acompanha arroz ou pãozinho.",
      price: 45.00,
      category: CATEGORIES.PORCOES,
      image: "/images/produtos/dobradinha.jpg",
      subcategory: SUBCATEGORIES.COMIDA_BOTECO,
      details: {
        individual: "R$ 45,00",
        media: "R$ 65,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 51,
      name: "Língua de Boi ao Molho",
      description: "Acompanha arroz ou pãozinho.",
      price: 45.00,
      category: CATEGORIES.PORCOES,
      image: "/images/produtos/Lingua.jpg",
      subcategory: SUBCATEGORIES.COMIDA_BOTECO,
      details: {
        individual: "R$ 45,00",
        media: "R$ 65,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 52,
      name: "Moela de Frango ao Molho",
      description: "Acompanha arroz ou pãozinho.",
      price: 45.00,
      category: CATEGORIES.PORCOES,
      image: "/images/produtos/moela.jpg",
      subcategory: SUBCATEGORIES.COMIDA_BOTECO,
      details: {
        individual: "R$ 45,00",
        media: "R$ 65,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 53,
      name: "Torresminho à Pururuca",
      description: "Acompanha mandioca frita.",
      price: 44.00,
      category: CATEGORIES.PORCOES,
      image: "/images/produtos/TorresminhoPururuca.jpg",
      subcategory: SUBCATEGORIES.COMIDA_BOTECO,
      details: {
        individual: "R$ 44,00",
        media: "R$ 64,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 54,
      name: "Torresmo de Rolo",
      description: "Acompanha vinagrete, farofa da casa, mandioca cozida e molhinho da casa.",
      price: 45.00,
      image: "/images/produtos/TorresmoRolo.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.COMIDA_BOTECO,
       details: {
        individual: "R$ 45,00",
        media: "Não disponível", 
        grande: "R$ 78,00"
      }
    },
    // PORÇÕES - PORÇÕES DE BOTECO
    {
      id: 55,
      name: "Carne Seca Acebolada",
      description: "Acompanha mandioca frita.",
      price: 79.90,
      image: "/images/produtos/CarneSeca.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
    },
    {
      id: 56,
      name: "Calabresa Acebolada",
      description: "Acompanha pãozinho.",
      price: 79.90,
      image: "/images/produtos/CalabresaAcebolada.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
    },
    {
      id: 57,
      name: "Costelinha de Porco",
      description: "Acompanha mandioca frita e molhinho da casa.",
      price: 79.90,
      image: "/images/produtos/Costelinha.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
    },
    {
      id: 58,
      name: "Frango à Passarinho",
      description: "Acompanha fritas.",
      price: 45.00,
      image: "/images/produtos/FrangoPassarinho.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 45,00",
        media: "R$ 66,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 59,
      name: "Frango Chapeado",
      price: 66.00,
      image: "/images/produtos/FrangoChapeado.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
    },
    {
      id: 60,
      name: "Frango Crocante",
      description: "Acompanha maionese trufada com queijo especial.",
      price: 76.00,
      image: "/images/produtos/FrangoCrocante.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
    },
    {
      id: 61,
      name: "Fritas",
      price: 32.00,
      image: "/images/produtos/Fritas.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 32,00",
        media: "R$ 42,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 62,
      name: "Fritas com Cheddar e Bacon",
      description: "Acompanha molhinho da casa.",
      price: 39.00,
      image: "/images/produtos/FritasCheedar.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 39,00",
        media: "R$ 56,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 63,
      name: "Fritas com Queijo e Bacon",
      description: "Acompanha molhinho da casa.",
      price: 39.00,
      image: "/images/produtos/FritasQueijo.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 39,00",
        media: "R$ 56,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 64,
      name: "Fritas Temperada da Casa",
      description: "Batata rústica com tempero especial da casa, acompanha molhinho da casa.",
      price: 49.00,
      image: "/images/produtos/FritasTemperada.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
    },
    {
      id: 65,
      name: "Isca de Frango",
      description: "Acompanha fritas.",
      price: 45.00,
      image: "/images/produtos/IscaFrango.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 45,00",
        media: "R$ 66,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 66,
      name: "Isca de Tilápia",
      description: "Acompanha fritas.",
      price: 58.00,
      image: "/images/produtos/IscaTilapia.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 58,00",
        media: "R$ 72,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 67,
      name: "Linguiça Caipira",
      description: "Servida na chapa com molho de cerveja e pimenta biquinho.",
      price: 76.00,
      image: "/images/produtos/LinguicaCaipira.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
    },
    {
      id: 68,
      name: "Mandioca ao Bacon",
      description: "Mandioca frita enrolada ao bacon em fatias.",
      price: 38.00,
      image: "/images/produtos/MandiocaBacon.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 38,00",
        media: "R$ 52,00", 
        grande: "Não disponível"
      }
    },
    {
      id: 69,
      name: "Porção da Patroa (1,5kg)",
      description: "Linguiça caseira, carne seca acebolada, torresmo à pururuca e mandioca frita.",
      price: 130.00,
      image: "/images/produtos/PorcaoPatroa.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
    },
    {
      id: 70,
      name: "Sashimi",
      description: "Finas fatias de tilápia, acompanha cebola, repolho, e o molho especial da casa para o sashimi.",
      price: 58.00,
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
    },

    // PORÇÕES - BOLINHOS DE BOTECO
    {
      id: 71,
      name: "Bolinho de Bacalhau",
      price: 65.00,
      image: "/images/produtos/BolinhoBacalhau.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.BOLINHOS_BOTECO,
      details: {
        individual: "R$ 65,00 (6 unidades)",
        media: "R$ 79,00 (12 unidades)", 
        grande: "Não disponível"
      }
    },
    {
      id: 72,
      name: "Bolinho de Camarão",
      description: "6 unidades.",
      price: 79.00,
      image: "/images/produtos/BolinhoCamarao.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.BOLINHOS_BOTECO,
    },
    {
      id: 73,
      name: "Bolinho de Feijoada",
      description: "6 unidades.",
      price: 54.00,
      image: "/images/produtos/BolinhoFeijoada1.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.BOLINHOS_BOTECO,
    },
    {
      id: 74,
      name: "Bolinho de Linguiça com Queijo",
      price: 55.00,
      image: "/images/produtos/BolinhoLinguica1.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.BOLINHOS_BOTECO,
      details: {
        individual: "R$ 55,00 (6 unidades)",
        media: "R$ 69,00 (12 unidades)", 
        grande: "Não disponível"
      }
    },
    {
      id: 75,
      name: "Bolinho de Mandioca com Carne Seca",
      price: 66.00,
      image: "/images/produtos/BolinhoCarneSeca.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.BOLINHOS_BOTECO,
      details: {
        individual: "R$ 66,00 (6 unidades)",
        media: "R$ 82,00 (12 undiades)", 
        grande: "Não disponível"
      }
    },
    {
      id: 76,
      name: "Kibe",
      price: 39.00,
      image: "/images/produtos/Kibe.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.BOLINHOS_BOTECO,
      details: {
        individual: "R$ 39,00 (6 unidades)",
        media: "R$ 59,00 (12 unidades)", 
        grande: "Não disponível"
      }
    },
    {
      id: 77,
      name: "Mix Amorim",
      description: "Bolinho de mandioca com carne seca, kibe e pastel de carne e queijo. Acompanha molhinho da casa.",
      price: 49.00,
      image: "/images/produtos/MixAmorim.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 49,00 (2 unidades de cada)",
        media: "R$ 68,00 (4 unidades de cada)", 
        grande: "Não disponível"
      }
    },
    {
      id: 78,
      name: "Ovo de Porca",
      description: "Bolinho com recheio de linguiça caseira e ovo cozido (3 unidades).",
      price: 39.00,
      image: "/images/produtos/OvoPorca.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.BOLINHOS_BOTECO,
    },
    {
      id: 79,
      name: "Pastelzinho",
      description: "Pastelzinho de carne e queijo.",
      price: 39.00,
      image: "/images/produtos/PastelzinhoBoteco.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 39,00 (6 unidades)",
        media: "R$ 58,00 (12 unidades)", 
        grande: "Não disponível"
      }
    },
    {
      id: 80,
      name: "Salgadinho de Boteco",
      description: "Coxinha de frango e bolinha de queijo.",
      price: 38.00,
      image: "/images/produtos/SalgadinhoBoteco.jpg",
      category: CATEGORIES.PORCOES,
      subcategory: SUBCATEGORIES.PORCOES_BOTECO,
      details: {
        individual: "R$ 38,00 (5 unidades de cada)",
        media: "R$ 52,00 (10 unidades de cada)", 
        grande: "Não disponível"
      }
    },

    // BEBIDAS - SUCO E ÁGUAS
    {
      id: 81,
      name: "Suco de Abacaxi",
      price: 10.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 82,
      name: "Suco de Abacaxi com Hortelã",
      price: 10.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 83,
      name: "Suco de Laranja",
      price: 10.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 84,
      name: "Suco de Limão",
      price: 10.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 85,
      name: "Suco de Maracujá",
      price: 10.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 86,
      name: "Suco de Morango",
      price: 10.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 87,
      name: "Suco com 2 Sabores",
      price: 14.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 88,
      name: "Água sem Gás",
      price: 5.00,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 89,
      name: "Água com Gás",
      price: 7.00,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 90,
      name: "Água Tônica",
      price: 7.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 91,
      name: "Café Expresso",
      price: 4.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.SUCOS
    },
    {
      id: 92,
      name: "CB",
      description: "Limão, sal e gelo",
      price: 3.00,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },

    // BEBIDAS - REFRIGERANTES
    {
      id: 93,
      name: "Coca-Cola 1 Litro",
      price: 12.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.REFRIGERANTES
    },
    {
      id: 94,
      name: "Refrigerante 290ml",
      price: 6.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.REFRIGERANTES
    },
    {
      id: 95,
      name: "Refrigerante 350ml",
      price: 7.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.REFRIGERANTES
    },
    {
      id: 96,
      name: "H2O",
      price: 10.90,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.REFRIGERANTES
    },
    {
      id: 97,
      name: "Tubaína Funada 600ml",
      price: 7.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.REFRIGERANTES
    },
    {
      id: 98,
      name: "Energético",
      description: "Consultar disponíveis.",
      price: 13.00,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.REFRIGERANTES
    },
    {
      id: 99,
      name: "Copo com Gelo",
      price: 2.00,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.REFRIGERANTES
    },
    {
      id: 100,
      name: "Copo com Laranja e Gelo",
      price: 2.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.REFRIGERANTES
    },
    {
      id: 101,
      name: "Copo com Limão e Gelo",
      price: 2.50,
      category: CATEGORIES.BEBIDAS,
      subcategory: SUBCATEGORIES.REFRIGERANTES
    },

    // CERVEJAS - 600ML
    {
      id: 102,
      name: "Antárctica Boa 600ml",
      price: 11.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 103,
      name: "Brahma 600ml",
      price: 11.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 104,
      name: "Burguesa 600ml",
      price: 9.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 105,
      name: "Original 600ml",
      price: 15.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 106,
      name: "Skol 600ml",
      price: 11.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 107,
      name: "Amstel 600ml",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 108,
      name: "Eisenbahn 600ml",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 109,
      name: "Heineken 600ml",
      price: 18.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 110,
      name: "Império Lager 600ml",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 111,
      name: "Moinho Real 600ml",
      price: 12.00,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 112,
      name: "Petra 600ml",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 113,
      name: "Smith 600ml",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },
    {
      id: 114,
      name: "Spaten 600ml",
      price: 14.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.CERVEJA_600ML
    },

    // CERVEJAS - LONG NECK
    {
      id: 115,
      name: "Brahma 350ml",
      price: 9.00,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.LONG_NECK
    },
    {
      id: 116,
      name: "Amstel Ultra Long Neck",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.LONG_NECK
    },
    {
      id: 117,
      name: "Heineken Long Neck",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.LONG_NECK
    },
    {
      id: 118,
      name: "Heineken Zero Long Neck",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.LONG_NECK
    },
    {
      id: 119,
      name: "Michelob Long Neck",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.LONG_NECK
    },
    {
      id: 120,
      name: "Sol Long Neck",
      price: 12.90,
      category: CATEGORIES.CERVEJAS,
      subcategory: SUBCATEGORIES.LONG_NECK
    },

    // DRINKS - CAIPIRINHAS
    {
      id: 121,
      name: "Caipirinha Tradicional 350ml",
      description: "Limão, morango, abacaxi, maracujá ou kiwi.",
      price: 19.00,
      image: "/images/produtos/CaipiTrad.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.CAIPIRINHAS,
      details: {
        individual: "R$ 19,00",
        media: "R$ 21,00", 
        grande: "R$ 22,00"
      }
    },
    {
      id: 122,
      name: "Caipirinha Especial 350ml",
      description: "Limão com morango, abacaxi com hortelã, mix de frutas, tangerina com pimenta, frutas vermelhas ou cerveja.",
      price: 20.00,
      image: "/images/produtos/CaipiEspecial.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.CAIPIRINHAS,
      details: {
        individual: "R$ 20,00",
        media: "R$ 23,00", 
        grande: "R$ 24,00"
      }
    },
    {
      id: 123,
      name: "Caipirinha no Pote 600ml",
      description: "Sabor à escolher, todos disponíveis.",
      price: 29.00,
      image: "/images/produtos/CaipiPote.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.CAIPIRINHAS,
      details: {
        individual: "R$29,00",
        media: "R$ 30,00", 
        grande: "R$ 31,00"
      }
    },

    // DRINKS - DRINKS ESPECIAIS
    {
      id: 124,
      name: "Amorim Beach",
      description: "Gin, fatias de laranja e monster mango loco.",
      price: 30.00,
      image: "/images/produtos/AmorimBeach.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DRINKS_SUB
    },
    {
      id: 125,
      name: "Batidinha de Vinho com Morango",
      price: 24.00,
      image: "/images/produtos/Batida.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DRINKS_SUB
    },
    {
      id: 126,
      name: "Drink sem Alcool",
      price: 20.00,
      image: "/images/produtos/DrinksemAlcool.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DRINKS_SUB
    },
    {
      id: 127,
      name: "Gin com Frutas",
      price: 29.00,
      image: "/images/produtos/GinFrutas.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DRINKS_SUB
    },
    {
      id: 128,
      name: "Gin da Patroa",
      description: "Gin, suco de laranja, rodelas de limão e tônica.",
      price: 29.00,
      image: "/images/produtos/GinPatroa.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DRINKS_SUB
    },
    {
      id: 129,
      name: "Gin Classic",
      description: "Gin, hortelã, rodelas de limão e água tônica.",
      price: 29.00,
      image: "/images/produtos/GinClassic.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DRINKS_SUB
    },
    {
      id: 130,
      name: "Gin com Energético",
      description: "Gin, rodelas de laranja e energético.",
      price: 29.00,
      image: "/images/produtos/GinEnergetico.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DRINKS_SUB
    },
    {
      id: 131,
      name: "Mojito",
      description: "Rum, açúcar, limão e água com gás.",
      price: 28.00,
      image: "/images/produtos/Mojito.jpg",
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DRINKS_SUB
    },

    // DRINKS - DOSES
    {
      id: 132,
      name: "Cachaça",
      price: 9.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 133,
      name: "Campari",
      price: 16.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 134,
      name: "Conhaque",
      price: 12.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 135,
      name: "Gin",
      price: 15.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 136,
      name: "Jagermeister",
      price: 29.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 137,
      name: "Jurupinga",
      price: 12.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 138,
      name: "Licor 43",
      price: 29.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 139,
      name: "Old Parr",
      price: 29.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 140,
      name: "Red Label",
      price: 19.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 141,
      name: "Smirnoff",
      price: 15.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 142,
      name: "Tequila",
      price: 25.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 143,
      name: "Vinho (taça)",
      price: 18.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },
    {
      id: 144,
      name: "Vodka",
      price: 9.00,
      category: CATEGORIES.DRINKS,
      subcategory: SUBCATEGORIES.DOSES
    },

    // HAPPY HOUR - PORÇÕES
    {
      id: 145,
      name: "Acepipes",
      description: "NOVIDADE! *Por Kilo* - Segunda, terça, quarta e sábado.",
      price: 99.00,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.PORCOES_HAPPY
    },
    {
      id: 146,
      name: "Porção do Happy",
      description: "Ceviche, isca de frango, frios, bolinha de queijo e coxinha de frango.",
      price: 56.90,
      image: "/images/produtos/PorcaoHappy.jpg",
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.PORCOES_HAPPY
    },
    {
      id: 147,
      name: "Bolinho de Linguiça",
      description: "Recheado com queijo (6 unidades)",
      price: 39.00,
      image: "/images/produtos/BolinhoLinguica.jpg",
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.PORCOES_HAPPY
    },
    {
      id: 148,
      name: "Bolinho de Feijoada",
      description: "3 unidades",
      price: 30.00,
      image: "/images/produtos/BolinhoFeijoada.jpg",
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.PORCOES_HAPPY
    },
    {
      id: 149,
      name: "Ovo de Porca",
      description: "Delicioso bolinho com recheio de linguiça caseira e ovo cozido (3 unidades)",
      price: 34.00,
      image: "/images/produtos/OvoPorca.jpg",
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.PORCOES_HAPPY
    },
    {
      id: 150,
      name: "Fritas Temperada da Casa",
      description: "Batata rústica com tempero especial da casa",
      price: 35.90,
      image: "/images/produtos/FritasTemperada.jpg",
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.PORCOES_HAPPY
    },
    {
      id: 151,
      name: "Salame",
      price: 35.00,
      image: "/images/produtos/salamehappy.jpg",
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.PORCOES_HAPPY
    },
    {
      id: 152,
      name: "Sashimi",
      price: 48.00,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.PORCOES_HAPPY
    },

    // HAPPY HOUR - CERVEJAS
    {
      id: 153,
      name: "Amstel",
      price: 9.90,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CERVEJAS_HAPPY
    },
    {
      id: 154,
      name: "Antártica Boa",
      price: 9.90,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CERVEJAS_HAPPY
    },
    {
      id: 155,
      name: "Brahma",
      price: 9.90,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CERVEJAS_HAPPY
    },
    {
      id: 156,
      name: "Burguesa",
      price: 7.90,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CERVEJAS_HAPPY
    },
    {
      id: 157,
      name: "Eisenbahn",
      price: 10.90,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CERVEJAS_HAPPY
    },
    {
      id: 158,
      name: "Império Lager",
      price: 10.90,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CERVEJAS_HAPPY
    },
    {
      id: 159,
      name: "Petra",
      price: 9.90,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CERVEJAS_HAPPY
    },
    {
      id: 160,
      name: "Skol",
      price: 9.90,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CERVEJAS_HAPPY
    },
    {
      id: 161,
      name: "Smith",
      price: 10.90,
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CERVEJAS_HAPPY
    },

    // HAPPY HOUR - CAIPIRINHAS
    {
      id: 162,
      name: "Caipirinha Vodka Happy",
      description: "Limão ou Morango",
      price: 13.90,
      image: "/images/produtos/CaipiHappy.jpg",
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CAIPIRINHAS_HAPPY
    },
    {
      id: 163,
      name: "Caipirinha Cachaça Happy",
      description: "Limão ou Morango",
      price: 13.90,
      image: "/images/produtos/CaipiTrad.jpg",
      category: CATEGORIES.HAPPY_HOUR,
      subcategory: SUBCATEGORIES.CAIPIRINHAS_HAPPY
    }
  ], []);
  useEffect(() => {
    setProducts(products);
  }, [setProducts, products]);

  // Lógica de filtragem
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === CATEGORIES.TODOS || product.category === activeCategory;
    const matchesSubcategory = activeSubcategory === SUBCATEGORIES.TODOS || product.subcategory === activeSubcategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (subcategories[activeCategory]) {
      return matchesCategory && matchesSubcategory && matchesSearch;
    }
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(SUBCATEGORIES.TODOS);
    localStorage.setItem('selectedCategory', categoryId);
    localStorage.setItem('selectedSubcategory', SUBCATEGORIES.TODOS);
  };

  // Função para fallback de emojis caso as imagens não carreguem
  const getFallbackEmoji = (categoryId) => {
    const emojiMap = {
      [CATEGORIES.TODOS]: '🍽️',
      [CATEGORIES.HAPPY_HOUR]: '🍹',
      [CATEGORIES.ALMOCO]: '🌞',
      [CATEGORIES.JANTAR]: '🌙',
      [CATEGORIES.ESPETOS]: '🍢',
      [CATEGORIES.PORCOES]: '🍟',
      [CATEGORIES.CERVEJAS]: '🍺',
      [CATEGORIES.BEBIDAS]: '🥤',
      [CATEGORIES.DRINKS]: '🍸',
      [CATEGORIES.APERITIVO]: '🥂'
    };
    return emojiMap[categoryId] || '📁';
  };

  return (
    <div className="menu-page">
      <div className="container">
        <h1>Cardápio</h1>
        
        <div className="menu-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
{/* ================== CATEGORIAS DESKTOP (2 linhas com 5 itens) ================== */}
<div className="category-filters desktop-only">
  {/* Primeira linha */}
  <div className="category-row">
    {categories.slice(0, 5).map(category => (
      <button
        key={category.id}
        className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
        onClick={() => handleCategoryChange(category.id)}
      >
        <img
          src={category.image}
          alt={category.name}
          className="category-image"
          onError={(e) => {
            e.target.style.display = 'none';
            const fallbackSpan = e.target.nextSibling;
            if (fallbackSpan) {
              fallbackSpan.style.display = 'inline';
            }
          }}
        />
        <span style={{ display: 'none', fontSize: '1.2rem' }}>
          {getFallbackEmoji(category.id)}
        </span>
        <span>{category.name}</span>
      </button>
    ))}
  </div>

  {/* Segunda linha */}
  <div className="category-row">
    {categories.slice(5, 10).map(category => (
      <button
        key={category.id}
        className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
        onClick={() => handleCategoryChange(category.id)}
      >
        <img
          src={category.image}
          alt={category.name}
          className="category-image"
          onError={(e) => {
            e.target.style.display = 'none';
            const fallbackSpan = e.target.nextSibling;
            if (fallbackSpan) {
              fallbackSpan.style.display = 'inline';
            }
          }}
        />
        <span style={{ display: 'none', fontSize: '1.2rem' }}>
          {getFallbackEmoji(category.id)}
        </span>
        <span>{category.name}</span>
      </button>
    ))}
  </div>
</div>

{/* ================== CATEGORIAS MOBILE (3 linhas responsivas) ================== */}
<div className="category-filters mobile-only">
  {/* Linha 1 */}
  <div className="category-row row-top">
    {[CATEGORIES.TODOS, CATEGORIES.HAPPY_HOUR, CATEGORIES.ALMOCO, CATEGORIES.PORCOES].map(id => {
      const category = categories.find(c => c.id === id);
      if (!category) return null; 
      return (
        <button
          key={category.id}
          className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => handleCategoryChange(category.id)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="category-image"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallbackSpan = e.target.nextSibling;
              if (fallbackSpan) {
                fallbackSpan.style.display = 'inline';
              }
            }}
          />
          <span style={{ display: 'none', fontSize: '1.2rem' }}>
            {getFallbackEmoji(category.id)}
          </span>
          <span>{category.name}</span>
        </button>
      );
    })}
  </div>

  {/* Linha 2 */}
  <div className="category-row row-middle">
    {[CATEGORIES.ESPETOS, CATEGORIES.CERVEJAS, CATEGORIES.BEBIDAS, CATEGORIES.DRINKS].map(id => {
      const category = categories.find(c => c.id === id);
      if (!category) return null;
      return (
        <button
          key={category.id}
          className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => handleCategoryChange(category.id)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="category-image"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallbackSpan = e.target.nextSibling;
              if (fallbackSpan) {
                fallbackSpan.style.display = 'inline';
              }
            }}
          />
          <span style={{ display: 'none', fontSize: '1.2rem' }}>
            {getFallbackEmoji(category.id)}
          </span>
          <span>{category.name}</span>
        </button>
      );
    })}
  </div>

  {/* Linha 3 */}
  <div className="category-row row-bottom">
    {[CATEGORIES.JANTAR, CATEGORIES.APERITIVO].map(id => {
      const category = categories.find(c => c.id === id);
      if (!category) return null;
      return (
        <button
          key={category.id}
          className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => handleCategoryChange(category.id)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="category-image"
            onError={(e) => {
              e.target.style.display = 'none';
              const fallbackSpan = e.target.nextSibling;
              if (fallbackSpan) {
                fallbackSpan.style.display = 'inline';
              }
            }}
          />
          <span style={{ display: 'none', fontSize: '1.2rem' }}>
            {getFallbackEmoji(category.id)}
          </span>
          <span>{category.name}</span>
        </button>
      );
    })}
  </div>
</div>

          {subcategories[activeCategory] && (
            <div className="subcategory-filters">
              {subcategories[activeCategory].map(subcategory => (
                <button
                  key={subcategory.id}
                  className={`subcategory-btn ${activeSubcategory === subcategory.id ? 'active' : ''}`}
                  onClick={() => setActiveSubcategory(subcategory.id)}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="no-results">
            <p>Nenhum produto encontrado para sua busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;