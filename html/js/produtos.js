const produtos = [
    {
        id: 1,
        nome: "Buquê de 12 Rosas Brancas | La Floricultura",
        preco: 195.00,
        imagem: "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=1000&auto=format&fit=crop",
        descricao: "Um arranjo sofisticado de 12 rosas brancas que expressa pureza, paz e elegância atemporal. Cada rosa é cuidadosamente selecionada por sua perfeição e envoltas em papel kraft premium com acabamento artesanal. As rosas brancas simbolizam novo começos, respeito profundo e amor verdadeiro, sendo ideais para momentos que exigem delicadeza e refinamento. Perfeito para casamentos, batizados, aniversários especiais ou simplesmente para demonstrar apreço sincero.",
        categoria: "Elegante",
        destaques: "12 rosas brancas de alta qualidade\nEmbalagem premium em papel kraft\nProdução artesanal exclusiva\nSímbolos de pureza e paz\nIdeal para ocasiões solenes",
        ocasiao: "Casamentos, batizados, bodas de prata, aniversários especiais, homenagens, decoração de eventos sofisticados",
        entrega: "Produzido sob encomenda para garantir máximo frescor. Disponível para entrega expressa.",
        palavrasChave: "rosas brancas, buquê elegante, flores para casamento, rosas premium, arranjo sofisticado"
    },
    {
        id: 2,
        nome: "Arranjo de Mini Orquídea Phalaenopsis Pink em Vaso de Vidro | La Floricultura",
        preco: 185.00,
        imagem: "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?q=80&w=1000&auto=format&fit=crop",
        descricao: "Uma delicada mini orquídea Phalaenopsis em tons de rosa suave, apresentada em vaso de vidro transparente que realça sua beleza natural. Esta orquídea compacta é perfeita para espaços menores sem perder a sofisticação característica da espécie. Com cuidados simples, ela floresce por meses, trazendo elegância duradoura para qualquer ambiente. O vaso de vidro permite apreciar todo o sistema radicular, adicionando um elemento moderno e minimalista.",
        categoria: "Orquídeas",
        destaques: "Mini orquídea Phalaenopsis rosa\nVaso de vidro transparente moderno\nFloração prolongada (meses)\nBaixa manutenção\nPerfeita para espaços compactos",
        ocasiao: "Presentes corporativos, decoração de mesa, escritórios, apartamentos, presentes de aniversário, decoração minimalista",
        entrega: "Pronta entrega. Enviamos com guia completo de cuidados para floração contínua.",
        palavrasChave: "mini orquídea, phalaenopsis rosa, orquídea em vaso, flores para escritório, decoração moderna"
    },
    {
        id: 3,
        nome: "Arranjo de Cravinas e Lisianthus em Vaso de Vidro | La Floricultura",
        preco: 165.00,
        imagem: "https://images.unsplash.com/photo-1594582004373-fe1a7113f93c?q=80&w=1000&auto=format&fit=crop",
        descricao: "Uma composição harmoniosa que combina a delicadeza das cravinas com a elegância dos lisianthus, criando um arranjo romântico e sofisticado. Apresentado em vaso de vidro cristalino, este arranjo traz cores suaves e texturas complementares que encantam pelo equilíbrio perfeito. As cravinas simbolizam admiração e carinho, enquanto os lisianthus representam carisma e apreciação, formando um presente significativo e visualmente deslumbrante.",
        categoria: "Romântico",
        destaques: "Combinação exclusiva de cravinas e lisianthus\nVaso de vidro cristalino\nCores suaves e harmoniosas\nDurabilidade de 7 a 10 dias\nArranjo pronto para presentear",
        ocasiao: "Aniversários românticos, Dia das Mães, presentes de agradecimento, decoração de jantares, celebrações íntimas",
        entrega: "Produzido sob encomenda. Prazo de 24 horas para garantir frescor máximo.",
        palavrasChave: "cravinas e lisianthus, arranjo romântico, flores em vaso, presente delicado, flores mistas"
    },
    {
        id: 4,
        nome: "Arranjo de Mini Orquídea Phalaenopsis Branca em Vaso de Vidro | La Floricultura",
        preco: 185.00,
        imagem: "https://images.unsplash.com/photo-1551913902-c92207b02198?q=80&w=1000&auto=format&fit=crop",
        descricao: "A essência da elegância minimalista em forma de orquídea. Esta mini Phalaenopsis branca em vaso de vidro representa sofisticação pura e atemporal. Suas flores brancas imaculadas trazem serenidade e classe para qualquer espaço, sendo perfeita tanto para ambientes corporativos quanto residenciais. O vaso de vidro transparente adiciona modernidade e permite visualizar a estrutura completa da planta, tornando-se uma peça decorativa por si só.",
        categoria: "Elegante",
        destaques: "Orquídea Phalaenopsis branca pura\nVaso de vidro minimalista\nFloração de longa duração\nEstilo clean e sofisticado\nBaixa necessidade de manutenção",
        ocasiao: "Presentes corporativos de alto nível, decoração de recepções, escritórios executivos, spa, clínicas, ambientes zen",
        entrega: "Pronta entrega com manual de cuidados detalhado. Garantia de floração.",
        palavrasChave: "orquídea branca, mini phalaenopsis, decoração minimalista, presente corporativo, flores elegantes"
    },
    {
        id: 5,
        nome: "Buquê de Rosas Vermelhas com Craft | La Floricultura",
        preco: 220.00,
        imagem: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1000&auto=format&fit=crop",
        descricao: "O clássico buquê de rosas vermelhas reinventado com acabamento contemporâneo em papel kraft. Este arranjo une a paixão atemporal das rosas vermelhas com a estética rústica-chique do kraft, criando uma apresentação moderna e inesquecível. Cada rosa é selecionada pelo tamanho das pétalas, intensidade da cor e perfeição da forma. Envolto artisticamente, este buquê é uma declaração de amor que combina tradição e tendência.",
        categoria: "Romântico",
        destaques: "Rosas vermelhas colombianas premium\nEmbalagem craft artesanal\nAcabamento rústico-chique\n15 rosas de primeira qualidade\nFita de cetim complementar",
        ocasiao: "Declarações de amor, Dia dos Namorados, pedidos de namoro, aniversários de relacionamento, surpresas românticas",
        entrega: "Produzido sob encomenda para garantir pétalas perfeitas. Entrega expressa em até 2 horas.",
        palavrasChave: "rosas vermelhas premium, buquê romântico, flores com papel kraft, presente apaixonado, declaração de amor"
    },
    {
        id: 6,
        nome: "Buquê de Flores Mistas Coloridas e Folhagem | La Floricultura",
        preco: 155.00,
        imagem: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1000&auto=format&fit=crop",
        descricao: "Uma explosão de cores e vida em forma de buquê! Esta composição vibrante combina diferentes espécies de flores em tons alegres com folhagens verdes exuberantes, criando um arranjo cheio de personalidade e energia. Cada buquê é único, montado artisticamente com atenção ao equilíbrio de cores, texturas e formas. Perfeito para quem ama diversidade e quer transmitir alegria pura. Um presente que celebra a beleza da variedade e a riqueza da natureza.",
        categoria: "Alegre",
        destaques: "Mix exclusivo de flores sazonais\nCombinação de cores vibrantes\nFolhagens frescas e texturizadas\nCada buquê é único\nEmbalagem artesanal colorida",
        ocasiao: "Aniversários alegres, get well soon, celebrações, alegrar o dia, presentes surpresa, decoração festiva",
        entrega: "Produzido com flores da estação para máxima qualidade. Disponível sob encomenda.",
        palavrasChave: "flores mistas coloridas, buquê alegre, flores variadas, presente vibrante, arranjo multicolorido"
    },
    {
        id: 7,
        nome: "Arranjo Colorido de Astromélias em Vaso de Vidro | La Floricultura",
        preco: 145.00,
        imagem: "https://images.unsplash.com/photo-1457739220681-03a6ed3b73c9?q=80&w=1000&auto=format&fit=crop",
        descricao: "Astromélias em tons vibrantes compõem este arranjo cheio de vida e durabilidade excepcional. Conhecidas como 'Flores da Amizade', as astromélias trazem cores intensas e padrões únicos em suas pétalas, criando um espetáculo visual encantador. Apresentadas em vaso de vidro elegante, duram até 2 semanas com cuidados básicos, sendo uma das flores de melhor custo-benefício e maior longevidade. Um presente que demonstra carinho duradouro.",
        categoria: "Durável",
        destaques: "Astromélias multicoloridas\nDurabilidade de até 2 semanas\nVaso de vidro incluído\nCores vibrantes e variadas\nFlores da amizade e devoção",
        ocasiao: "Presentes de amizade, agradecimento, recuperação, decoração prolongada, celebrações de amizade",
        entrega: "Pronta entrega. Flores frescas com máxima durabilidade garantida.",
        palavrasChave: "astromélias coloridas, flores da amizade, arranjo durável, flores vibrantes, presente para amigos"
    },
    {
        id: 8,
        nome: "Arranjo de Ruscus em Vaso de Vidro | La Floricultura",
        preco: 125.00,
        imagem: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=1000&auto=format&fit=crop",
        descricao: "Minimalismo verde e sofisticação atemporal neste arranjo exclusivo de Ruscus. Com suas folhagens delicadas e elegantes em tons de verde profundo, o Ruscus é perfeito para quem aprecia beleza na simplicidade. Apresentado em vaso de vidro clean, este arranjo traz serenidade e frescor para qualquer ambiente. Extremamente durável, pode durar semanas e até ser utilizado seco posteriormente, mantendo sua beleza estrutural. Ideal para decoração moderna e minimalista.",
        categoria: "Minimalista",
        destaques: "Folhagens de Ruscus premium\nEstilo minimalista e moderno\nDurabilidade excepcional\nVaso de vidro transparente\nBaixa manutenção",
        ocasiao: "Decoração de ambientes modernos, escritórios, clinicas, spa, presentes minimalistas, decoração zen",
        entrega: "Pronta entrega. Produto de longa durabilidade, ideal para decoração permanente.",
        palavrasChave: "ruscus, arranjo minimalista, folhagens verdes, decoração moderna, arranjo durável"
    }
];
