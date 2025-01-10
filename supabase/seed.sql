-- Insert rounds
INSERT INTO rounds (id, index, title, description)
VALUES (1, 1, 'Round 1', 'Round 1 description'),
    (2, 2, 'Round 2', 'Round 2 description'),
    (3, 3, 'Round 3', 'Round 3 description'),
    (4, 4, 'Round 4', 'Round 4 description'),
    (5, 5, 'Round 5', 'Round 5 description'),
    (6, 6, 'Round 6', 'Round 6 description'),
    (7, 7, 'Round 7', 'Round 7 description');
-- Insert cards
INSERT INTO cards (id, type, title, text)
VALUES -- Nature cards (1-9)
    (
        1,
        'nature',
        '',
        'A natureza neste local é avassaladora e bela. Se pudesses pergunta qualquer coisa à natureza,o que perguntarias?'
    ),
    (
        2,
        'nature',
        '',
        'Ouves o sussurro do vento nas folhas. O que achas que as árvores te estão a dizer?'
    ),
    (
        3,
        'nature',
        '',
        'Vês um peixe a nadar na Levada. Qual o papel que isso desempenha em tua jornada?'
    ),
    (
        4,
        'nature',
        '',
        'Rochas com uma formação especial bloqueiam o teu caminho. Descreve as rochas e como elas afetam a tua jornada.'
    ),
    (
        5,
        'nature',
        '',
        'Algumas plantas indígenas cresceram demais no caminho. Descreve as plantas e relaciona-as com a tua viagem.'
    ),
    (
        6,
        'nature',
        '',
        'Algumas plantas indígenas cresceram demais no caminho. Por que achas que são importantes no ecossistema? O que fazes?'
    ),
    (
        7,
        'nature',
        '',
        'Paras e descansas para recuperar as forças. Olha à tua volta. A natureza surpreendente rodeia-te. O que sentes?'
    ),
    (
        8,
        'nature',
        '',
        'Está ciente da natureza especial que existe neste lugar. O que vais levar para casa?'
    ),
    (
        9,
        'nature',
        '',
        'A areia preta da praia lembra-te que a ilha já foi um vulcão. O que sentes sobre isso?'
    ),
    -- Sense cards (10-18)
    (
        10,
        'sense',
        '',
        'Cheira algo diferente. Para um momento, conecta-te com os teus sentidos. O que é esse cheiro e o que desperta em ti?'
    ),
    (
        11,
        'sense',
        '',
        'Estás imerso na caminhada, com todos os teus sentidos. Descreve como te sentes?'
    ),
    (
        12,
        'sense',
        '',
        'Estás imerso na caminhada, com todos os teus sentidos conectados ao ambiente. O que podes tocar?'
    ),
    (
        13,
        'sense',
        '',
        'Para por um momento e descansa. O que os teus sentidos te mostram?'
    ),
    (
        14,
        'sense',
        '',
        'Algo move-se rapidamente à tua frente. Aguças o teu olhar… O que vês?'
    ),
    (
        15,
        'sense',
        '',
        'Ouves alguns sussurros ecoando ao teu redor. Concentras-te no teu sentido auditivo. O que ouves?'
    ),
    (
        16,
        'sense',
        '',
        'Estás a pensar em alguém de quem sentes muita falta nesta viagem. Quem é essa pessoa? Porque é importante para ti?'
    ),
    (
        17,
        'sense',
        '',
        'Olhas à tua volta e pensas em como as pessoas viviam aqui há 400 anos…'
    ),
    (
        18,
        'sense',
        '',
        'Está imerso na caminhada, com todos os teus sentidos conectados ao ambiente. O que cheiras?'
    ),
    -- Action cards (19-27)
    (
        19,
        'action',
        '',
        'Cais por uma encosta íngreme. Encontras algo inesperado...'
    ),
    (
        20,
        'action',
        '',
        'Conheces um companheiro de viagem e trocas algumas palavras. O que partilham um/a com o/a outro/a?'
    ),
    (
        21,
        'action',
        '',
        'Cais na água. O que acontece depois?'
    ),
    (
        22,
        'action',
        '',
        'Estavas a passar por um túnel e caiste na água? O que fazes?'
    ),
    (
        23,
        'action',
        '',
        'Aleijas-te. Descreve como aconteceu e como lidas com isso?'
    ),
    (
        24,
        'action',
        '',
        'Cruzas com outra pessoa no caminho. Vai ao lado de outra personagem e inicia uma conversa. Sobre o que falam?'
    ),
    (
        25,
        'action',
        '',
        'Perdes algo precioso. Como é que isso afetaa tua jornada?'
    ),
    (
        26,
        'action',
        '',
        'Um caminhante partilha um pouco de água contigo. Em troca, contas-lhes um segredo sobre a Madeira.'
    ),
    (
        27,
        'action',
        '',
        'Inclui na tua história um ato de cuidado com os outros seres ao teu redor, humanos ou não humanos.'
    ),
    -- History cards (28-36)
    (
        28,
        'history',
        '',
        'Diz-se que algumas partes da Madeira são habitadas por seres e espíritos encantados. Encontras um destes seres durante a tua jornada.'
    ),
    (
        29,
        'history',
        '',
        'Os moradores locais acreditam que algumas florestas têm uma aura mágica e aqueles que se aventuram muito longe podem encontrar criaturas míticas. Quem encontras?'
    ),
    (
        30,
        'history',
        '',
        'Os pescadores da Madeira contam histórias de um navio fantasma que aparece ao largo da costa durante as tempestades. Como a maldição do navio afeta a tua aventura?'
    ),
    (
        31,
        'history',
        '',
        'Uma história de Machico envolve uma bruxa que vivia nas colinas e lançava feitiços sobre os aldeões. Um feitiço foi lançado sobre ti!'
    ),
    (
        32,
        'history',
        '',
        'Aparentemente, Darwin veio para a Madeira mas nunca saiu do navio. O que estava ele a pensar?'
    ),
    (
        33,
        'history',
        '',
        'Aparentemente, Darwin veio para a Madeira mas nunca saiu do navio. O que ele perdeu?'
    ),
    (
        34,
        'history',
        '',
        'Hemingway visitou a Madeira. Encontras o seu diário. O que lês?'
    ),
    (
        35,
        'history',
        '',
        'Existe uma lenda sobre uma bruxa que conseguia controlar o clima, muitas vezes causando tempestades e infortúnios. Encontras-te em apuros...'
    ),
    (
        36,
        'history',
        '',
        'Os caminhantes são aconselhados a respeitar as Levadas e a deixar oferendas às fadas para garantir uma passagem segura. O que deixas de oferta?'
    ),
    -- Landmark cards (37-126)
    (
        37,
        'landmark',
        'Porto das Salemas',
        'Chegas às piscinas naturais formadas por rochas vulcânicas. O que fazes?'
    ),
    (
        38,
        'landmark',
        'Porto das Salemas',
        'Nadas no cenário único e pitoresco das piscinas naturais. Como te sentes?'
    ),
    (
        39,
        'landmark',
        'Porto das Salemas',
        'Contemplas as águas cristalinas que são refrescadas pelas marés do Oceano Atlântico. Como esse belo cenário te influencia?'
    ),
    (
        40,
        'landmark',
        'Fajã da Nogueira',
        'Caminhas pela vegetação exuberante e florestas densas. O ambiente sereno faz-te pensar sobre a tua relação com a natureza.'
    ),
    (
        41,
        'landmark',
        'Fajã da Nogueira',
        'Encontras a Central hidroelétrica que utiliza os abundantes recursos hídricos da região. No caminho encontras um ex-trabalhador da central que te conta uma história.'
    ),
    (
        42,
        'landmark',
        'Fajã da Nogueira',
        'Entras na antiga floresta Laurissilva, um dos últimos remanescentes de um tipo de floresta que já cobriu grande parte do sul da Europa. Este cenário mágico abre a tua imaginação…'
    ),
    (
        43,
        'landmark',
        'Vila Baleira',
        'Cristóvão Colombo viveu aqui por algum tempo. Pensas em como este lugar influenciou as suas viagens e como isso influencia a tua jornada.'
    ),
    (
        44,
        'landmark',
        'Vila Baleira',
        'A extensa praia de areia dourada, rica em magnésio e cálcio, é conhecida pelas suas propriedades terapêuticas. Vai lá por essas propriedades.'
    ),
    (
        45,
        'landmark',
        'Vila Baleira',
        'Vila Baleira é a principal cidade administrativa e económica do Porto Santo. O que fazes lá durante a tua passagem?'
    ),
    (
        46,
        'landmark',
        'Pico do Arieiro',
        'Fazes um dos trilhos mais desafiantes da Madeira pelas montanhas. Num dos caminhos estreitos quase que cais e perdes algo precioso.'
    ),
    (
        47,
        'landmark',
        'Pico do Arieiro',
        'No cume, há uma estação de radar que parece uma grande bola de golfe. Encontras um técnico da Força Aérea Portuguesa que trabalha na estação. Como ele/a ajuda na tua aventura?'
    ),
    (
        48,
        'landmark',
        'Pico do Arieiro',
        'Começas a tua caminhada no pico com um clima ensolarado incrível. Mas as condições aqui mudam rapidamente e, de repente, fica nevoeiro. Não consegues ver o caminho…'
    ),
    (
        49,
        'landmark',
        'Curral das Freiras',
        'Curral das Freiras foi um esconderijo de freiras durante as invasões piratas do século XVI. Encontras uma senhora com algumas histórias para contar...'
    ),
    (
        50,
        'landmark',
        'Curral das Freiras',
        'Acredita-se que o Curral das Freiras tenha sido o esconderijo de um tesouro deixado por piratas. Encontra o tesouro!'
    ),
    (
        51,
        'landmark',
        'Curral das Freiras',
        'As freiras supostamente fugiram para este vale isolado com os seus objetos de valor para escapar dos ataques piratas. O que elas deixaram para trás?'
    ),
    (
        52,
        'landmark',
        'Ponta de São Lourenço',
        'Estas paisagens incríveis apresentam falésias escarpadas, formações rochosas vulcânicas e vistas deslumbrantes do oceano. Como é que estas formas únicas e cores contrastantes te inspiram?'
    ),
    (
        53,
        'landmark',
        'Ponta de São Lourenço',
        'Esta é uma Reserva Natural que protege uma variedade de espécies de plantas endémicas e fornece habitat para aves e vida marinha. Tens um diálogo com uma dessas espécies.'
    ),
    (
        54,
        'landmark',
        'Ponta de São Lourenço',
        'Este local oferece lindos trilhos para caminhadas. Aventuras-te num desses trilhos entre paisagens deslumbrantes e dramáticas. O que vês?'
    ),
    (
        55,
        'landmark',
        'Fanal',
        'A antiga floresta Laurissilva é o lar de muitas espécies animais endémicas. Encontras um Pombo-Trocaz que guia o teu caminho…'
    ),
    (
        56,
        'landmark',
        'Fanal',
        'A antiga floresta Laurissilva é o lar de muitas espécies animais endémicas. Encontras uma borboleta Grande Branca da Madeira. Decides segui-la...'
    ),
    (
        57,
        'landmark',
        'Fanal',
        'A antiga floresta Laurissilva é o lar de muitas espécies de plantas endémicas. Encontras uma enorme árvore Tis centenária. Pedes-lhe conselhos.'
    ),
    (
        58,
        'landmark',
        'Ribeira Brava',
        'A Ribeira Brava é uma das povoações mais antigas da ilha da Madeira. Encontras um objeto que data do século XV. O que é?'
    ),
    (
        59,
        'landmark',
        'Ribeira Brava',
        'Desde a sua fundação no início do século XV, a Ribeira Brava rapidamente se tornou um importante centro comercial. Encontras um lojista com histórias para contar…'
    ),
    (
        60,
        'landmark',
        'Ribeira Brava',
        'O rio que atravessa a vila e que lhe dá nome é conhecido pelo seu caudal forte e turbulento. Cais no rio mas alguém te ajuda...'
    ),
    (61, 'landmark', 'Escreve a tua carta!', ''),
    (62, 'landmark', 'Escreve a tua carta!', ''),
    (63, 'landmark', 'Escreve a tua carta!', ''),
    (64, 'landmark', 'Escreve a tua carta!', ''),
    (65, 'landmark', 'Escreve a tua carta!', ''),
    (66, 'landmark', 'Escreve a tua carta!', ''),
    (
        67,
        'landmark',
        'Farol da Ponta do Pargo',
        'Este ponto tem importância estratégica para a navegação marítima. Encontras um objeto que te faz pensar em marinheiros de há 500 anos atrás que se aventuraram por mares desconhecidos'
    ),
    (
        68,
        'landmark',
        'Farol da Ponta do Pargo',
        'Chegas ao farol, situado num penhasco dramático com vista para o oceano. Olhas ao redor e vês algo na água lá em baixo…'
    ),
    (
        69,
        'landmark',
        'Farol da Ponta do Pargo',
        'O farol foi inaugurado em 1922 e tem sido um importante auxílio à navegação. Deparas-te com um velho sentado numa pedra, com vista para o mar. O que ele te diz?'
    ),
    (
        70,
        'landmark',
        'Porto da Cruz',
        'Encontras a fábrica de Rum. A fábrica remonta à época dos Piratas! Que vestígios encontras lá?'
    ),
    (
        71,
        'landmark',
        'Porto da Cruz',
        'Porto da Cruz é famoso pela produção do "Vinho de Cheiro", um vinho tradicional madeirense feito a partir de castas americanas. O cheiro do vinho remete-te para a uma memória antiga.'
    ),
    (
        72,
        'landmark',
        'Porto da Cruz',
        'Caminhas pela encantadora praia de areia preta e pedrinhas. Entre as pedras, avistas uma garrafa com uma mensagem dentro…'
    ),
    (
        73,
        'landmark',
        'Pico Ruivo',
        'O Pico Ruivo é o pico mais alto da Ilha da Madeira. Estás no topo dos 1.862 metros. Olha em redor para a vista panorâmica acima das nuvens e vês algo à distância.'
    ),
    (
        74,
        'landmark',
        'Pico Ruivo',
        'Aventuras-te por uma das caminhadas mais desafiantes da Madeira para chegar ao pico mais alto, o Pico Ruivo. Ao longo do caminho, seu percurso está bloqueado. Como resolves esse desafio?'
    ),
    (
        75,
        'landmark',
        'Pico Ruivo',
        'A caminhada até ao Pico Ruivo passa por vários ecossistemas, de exuberantes florestas de Laurissilva até paisagens rochosas e áridas perto do cume. Encontras ajuda de uma entidade não humana…'
    ),
    (
        76,
        'landmark',
        'Faial',
        'Avistas a impressionante Penha de Águia, uma proeminente formação rochosa vulcânica que se eleva acentuadamente na paisagem. Isso faz-te pensar nos primórdios vulcânicos da Madeira.'
    ),
    (
        77,
        'landmark',
        'Faial',
        'Chegas durante a Festa do Santíssimo Sacramento. Entre as procissões religiosas, a música e as danças, encontras um rosto familiar.'
    ),
    (
        78,
        'landmark',
        'Faial',
        'Vais à praia do Faial e molhas os pés nas águas cristalinas. Na água esbarras com uma barracuda que precisa da tua ajuda.'
    ),
    (
        79,
        'landmark',
        'Encumeada',
        'Passas pelo pitoresco Miradouro da Encumeada, que fica a uma altitude de 1.007 metros. Olhas para baixo e sentes-te um pouco tonto/a. O que pensas para acalmar os nervos?'
    ),
    (
        80,
        'landmark',
        'Encumeada',
        'Caminhas pelas altas montanhas e contemplas as diversas paisagens da ilha. Isso faz-te pensar na diversidade da natureza e como ela está ligada à tua jornada.'
    ),
    (
        81,
        'landmark',
        'Encumeada',
        'A Encumeada faz parte da Laurissilva da Madeira, Património Mundial da UNESCO, lar de uma rica biodiversidade de espécies vegetais e animais endémicas. Encontras uma dessas espécies…'
    ),
    (
        82,
        'landmark',
        'Fajã dos Padres',
        'A Fajã dos Padres foi cultivada por padres jesuítas, daí o nome. Encontras um antigo manuscrito do século XVI com algumas instruções…'
    ),
    (
        83,
        'landmark',
        'Fajã dos Padres',
        'A partir do século XVI, os jesuítas estabeleceram aqui vinhas e pomares, lançando as bases do património agrícola da região. Experimentas um pouco do vinho local…'
    ),
    (
        84,
        'landmark',
        'Fajã dos Padres',
        'Andas no teleférico que desce aproximadamente 250 metros por um penhasco íngreme. Na descida, algo acontece...'
    ),
    (
        85,
        'landmark',
        'Poiso',
        'Poiso serve como um importante cruzamento que liga várias rotas importantes. Chegas a uma encruzilhada e precisas de fazer uma escolha...'
    ),
    (
        86,
        'landmark',
        'Poiso',
        'A partir daqui, podes aceder a vários trilhos para caminhadas. Decides aventurar-te pela floresta e, pelo caminho, encontras uma árvore de aparência estranha.'
    ),
    (
        87,
        'landmark',
        'Poiso',
        'Descobres que Poiso é um dos poucos locais da Madeira onde, em raras ocasiões, neva. Isto faz-te pensar sobre as alterações climáticas e como podem afectar estes padrões.'
    ),
    (
        88,
        'landmark',
        'Santa Cruz',
        'Aqui encontras um litoral pitoresco com praias de calhau e águas cristalinas, ideais para mergulho com snorkel. Decides procurar alguma vida marinha local…'
    ),
    (
        89,
        'landmark',
        'Santa Cruz',
        'O Aeroporto da Madeira encontra-se aqui, conhecido pela sua pista desafiante devido ao terreno montanhoso circundante e aos ventos. Isso faz-te pensar sobre nossa interdependência com a natureza.'
    ),
    (
        90,
        'landmark',
        'Santa Cruz',
        'Santa Cruz é um dos concelhos mais antigos da Madeira com grande parte da sua arquitectura histórica ainda preservada. Entras na Igreja de São Salvador (1533) e encontras um objeto importante…'
    ),
    (
        91,
        'landmark',
        'Bica da Cana',
        'Contemplas as vistas panorâmicas da paisagem montanhosa. Chegas a tempo de um pôr do sol maravilhoso e refletes sobre a beleza da natureza.'
    ),
    (
        92,
        'landmark',
        'Bica da Cana',
        'A Levada do Paul da Serra é notável , levando os caminhantes por florestas exuberantes e paisagens abertas. Fazes uma caminhada pela levada e encontras um amigo inesperado.'
    ),
    (
        93,
        'landmark',
        'Bica da Cana',
        'A elevada altitude causa brumas frequentes que suportam uma grande variedade de musgos e líquenes. Olhas atentamente para essa beleza e pensas em como todo o ecossistema está ligado.'
    ),
    (
        94,
        'landmark',
        'Funchal',
        'Reza a lenda que os primeiros colonizadores encontraram funcho selvagem a crescer abundantemente na área e deram à cidade o nome da planta. Provas um pouco de funcho e imaginas a vida aqui há 500 anos.'
    ),
    (
        95,
        'landmark',
        'Funchal',
        'A prosperidade proveniente do cultivo da cana-de-açúcar fez do Funchal uma importante cidade portuária. Encontras um/a marinheiro/a internacional. O que te diz?'
    ),
    (
        96,
        'landmark',
        'Funchal',
        'O Funchal foi uma escala fundamental para os navios que viajavam para África, Ásia e Américas. Foi um caldeirão de lendas, histórias e conhecimentos. Passas algum tempo no porto. O que aprendes?'
    ),
    (
        97,
        'landmark',
        'Monte',
        'A posição elevada do Monte confere-lhe um microclima único. Muitas vezes é mais fresco e húmido do que as zonas costeiras, contribuindo para a sua vegetação luxuriante. Como este microclima te afeta?'
    ),
    (
        98,
        'landmark',
        'Monte',
        'A Igreja de Nossa Senhora do Monte acolhe a festa anual que atrai milhares de peregrinos. Conheces os peregrinos. O que eles partilham contigo?'
    ),
    (
        99,
        'landmark',
        'Monte',
        'Os tradicionais "carros de cesto" ainda são utilizados como meio de transporte rápido pelas ruas íngremes. Fazes o passeio guiado por dois carreiros de chapéu branco e palha. Como corre?'
    ),
    (
        100,
        'landmark',
        'Cabo Girão',
        'O Cabo Girão possui uma das falésias marítimas mais altas da Europa, com uma altura impressionante de 580m acima do nível do mar. As vistas deslumbrantes fazem-te refletir'
    ),
    (
        101,
        'landmark',
        'Cabo Girão',
        'As falésias proeminentes de Cabo Girão são há muito tempo um ponto de referência de navegação para os marinheiros. Avistas um barco a aproximar-se. O que fazes?'
    ),
    (
        102,
        'landmark',
        'Cabo Girão',
        'Poderás vislumbrar o modo de vida tradicional madeirense, os seus barcos coloridos e o marisco fresco. Juntas-te aos pescadores e eles partilham algumas histórias.'
    ),
    (
        103,
        'landmark',
        'Câmara de Lobos',
        'Câmara de Lobos é conhecida como um dos locais favoritos de Sir Winston Churchill. Encontras uma das suas pinturas da pitoresca baía e dos barcos de pesca.'
    ),
    (
        104,
        'landmark',
        'Câmara de Lobos',
        'O nome da cidade foi dado pelos primeiros exploradores portugueses que encontraram lobos marinhos na área. Encontras um lobo marinho a dormir na praia.'
    ),
    (
        105,
        'landmark',
        'Câmara de Lobos',
        'Começas uma conversa com um dos pescadores e ele convida-te para ires à sua "xavelha", um colorido barco de pesca, para uma pescaria.'
    ),
    (
        106,
        'landmark',
        'Deserta Grande',
        'Historicamente, as Ilhas Desertas foram utilizadas por piratas como esconderijo devido à sua natureza remota e inacessível. Encontras um tesouro escondido. O que é?'
    ),
    (
        107,
        'landmark',
        'Deserta Grande',
        'A ilha é o lar de várias espécies endémicas de plantas e invertebrados, incluindo alguns caracóis e aranhas endémicas. És mordido/a por uma aranha. O que acontece?'
    ),
    (
        108,
        'landmark',
        'Deserta Grande',
        'A Deserta Grande não tem fontes de água doce, o que impossibilita a vivência humana permanente, preservando o estado intocado da ilha. O que vês em teu redor?'
    ),
    (
        109,
        'landmark',
        'Calheta',
        'A Calheta é historicamente conhecida pela produção de cana-de-açúcar, aguardente de cana-de-açúcar e melaço. Bebes aguardente e partilhas histórias com os locais. O que aprendes?'
    ),
    (
        110,
        'landmark',
        'Calheta',
        'Esta região é conhecida pelas suas plantações de banana. Importada por comerciantes britânicos, é hoje uma parte importante da economia agrícola da Madeira. O que achas desta herança colonial da ilha?'
    ),
    (
        111,
        'landmark',
        'Calheta',
        'A Calheta celebra o seu património cultural e religioso através de festas como a Festa de Nossa Senhora da Estrela. Vais à festa. O que acontece?'
    ),
    (
        112,
        'landmark',
        'Porto Moniz',
        'Os pescadores de Porto Moniz falam de uma serpente marinha gigante que guarda as piscinas naturais. Achas que avistas a serpente...'
    ),
    (
        113,
        'landmark',
        'Porto Moniz',
        'Os pescadores de Porto Moniz falam de uma serpente marinha gigante – um ser antigo e sábio que protege as águas. Que sabedoria a serpente te transmitiria?'
    ),
    (
        114,
        'landmark',
        'Porto Moniz',
        'As piscinas naturais de lava do Porto Moniz, cheias de água do mar, formaram-se por actividade vulcânica há milhões de anos. Ao nadar nessas águas pensas nonúcleo vulcânico da ilha. Como te sentes?'
    ),
    (
        115,
        'landmark',
        'Ribeiro Frio',
        'Ribeiro Frio está situado dentro da Floresta Laurissilva, Património da UNESCO. Esta antiga floresta é um remanescente doperíodo Terciário. Realiza um ato de cuidado com o patrimônio natural deste local.'
    ),
    (
        116,
        'landmark',
        'Ribeiro Frio',
        'Ribeiro Frio é um local privilegiado para espécies de aves endémicas. Os visitantes podem avistar aves como o tentil- hão-da-madeira ou o pombo-trocaz. Vês um! Como corre esse encontro?'
    ),
    (
        117,
        'landmark',
        'Ribeiro Frio',
        'O Ribeiro Frio serve de ponto de partida para caminhadas até ao Pico Ruivo, o pico mais alto da Madeira. Vês a ilha de uma só vez. O que achas deste lugar?'
    ),
    (
        118,
        'landmark',
        'S. Vincente',
        'Nas Grutas de São Vicente, formadas há cerca de 890 mil anos a partir de uma erupção vulcânica, os tubos de lava estendem-se por cerca de 1.000 metros. Entras nas cavernas. Algo te surpreende!'
    ),
    (
        119,
        'landmark',
        'S. Vincente',
        'A Fajã da Areia em São Vicente é uma rara praia de areia preta, que oferece uma bela vista para o mar e, num dia bom, um vislumbre da ilha do Porto Santo. Vê-se o Porto Santo de perfil à frente. O que acha?'
    ),
    (
        120,
        'landmark',
        'S. Vincente',
        'As vinhas de São Vicente produzem alguns dos melhores vinhos da ilha, incluindo o famoso vinho da Madeira. Conheces um morador e partilham uma bebida. O que o local revela?'
    ),
    (
        121,
        'landmark',
        'Santana',
        'As casas de colmo são casinhas coloridas com telhados de palha, que datam do século XVI. Um agricultor local sai da pequena casa e convida-te para entrar. O que acontece lá dentro?'
    ),
    (
        122,
        'landmark',
        'Santana',
        'Caminhas até à Rocha do Navio, reserva da biosfera da UNESCO. Da praia isolada, mergulhas nas cavernas subaquáticas e na rica vida marinha. O que encontras?'
    ),
    (
        123,
        'landmark',
        'Santana',
        'A tradição agrícola dos socalcos e vinhas de Santana é conhecida pela produção de uvas, frutas e legumes de elevada qualidade. Fazes amizade com um agricultor. O que acontece a seguir?'
    ),
    (
        124,
        'landmark',
        'Machico',
        'Machico foi o primeiro ponto de desembarque dos descobridores da Madeira em 1419. Estás no ponto de partida da colonização da ilha. Como te sentes sobre isso?'
    ),
    (
        125,
        'landmark',
        'Machico',
        'O nome Machico vem de Robert Machim, juntamente com a sua amante Anne d''Arfet, que naufragaram na costa da Madeira no século XIV. Como imaginas que eles viviam?'
    ),
    (
        126,
        'landmark',
        'Machico',
        'Construída no século XVIII para proteger a vila dos ataques de piratas, a Fortaleza de São João Baptista fica virada para a baía. Sobes e avista alguns piratas a aproximar-se. O que fazes?'
    );
-- Insert stops
INSERT INTO stops (id, initial, name, x, y, paths, type)
VALUES (
        1,
        false,
        '',
        355.73,
        1029.51,
        ARRAY [2, 28],
        'action'
    ),
    (
        2,
        false,
        '',
        394.82,
        1085.41,
        ARRAY [1, 3],
        'sense'
    ),
    (
        3,
        false,
        '',
        449.16,
        1149.26,
        ARRAY [2, 29],
        'nature'
    ),
    (
        4,
        false,
        '',
        586.19,
        701.56,
        ARRAY [119, 36],
        'nature'
    ),
    (
        5,
        false,
        '',
        661.54,
        767.2,
        ARRAY [38, 43],
        'nature'
    ),
    (
        6,
        false,
        '',
        718.43,
        978.83,
        ARRAY [32, 37],
        'nature'
    ),
    (
        7,
        false,
        '',
        799.83,
        1055.2,
        ARRAY [42, 32],
        'nature'
    ),
    (
        8,
        false,
        '',
        637.01,
        1251.36,
        ARRAY [123, 71],
        'nature'
    ),
    (
        9,
        false,
        '',
        761.66,
        1346.98,
        ARRAY [92, 72],
        'nature'
    ),
    (
        10,
        false,
        '',
        987.08,
        1437.88,
        ARRAY [124, 73],
        'nature'
    ),
    (
        11,
        false,
        '',
        1187.53,
        1529.97,
        ARRAY [55, 127],
        'nature'
    ),
    (
        12,
        false,
        '',
        1372.71,
        1591.66,
        ARRAY [57, 75],
        'nature'
    ),
    (
        13,
        false,
        '',
        1454.5,
        1460.55,
        ARRAY [56, 76],
        'nature'
    ),
    (
        14,
        false,
        '',
        1088.67,
        1137.02,
        ARRAY [48, 114],
        'nature'
    ),
    (
        15,
        false,
        '',
        1075.68,
        1041.53,
        ARRAY [48, 46],
        'nature'
    ),
    (
        16,
        false,
        '',
        1449.18,
        1124.75,
        ARRAY [133, 79],
        'nature'
    ),
    (
        17,
        false,
        '',
        1443.46,
        1027.5,
        ARRAY [66, 134],
        'nature'
    ),
    (
        18,
        false,
        '',
        2266.65,
        359.33,
        ARRAY [117, 142],
        'nature'
    ),
    (
        19,
        false,
        '',
        1569.76,
        844.0,
        ARRAY [87, 136],
        'nature'
    ),
    (
        20,
        false,
        '',
        1278.41,
        879.54,
        ARRAY [88, 86],
        'nature'
    ),
    (
        21,
        false,
        '',
        1476.6,
        1239.83,
        ARRAY [110, 132],
        'nature'
    ),
    (
        22,
        false,
        '',
        1562.12,
        1346.98,
        ARRAY [130, 131],
        'nature'
    ),
    (
        23,
        false,
        '',
        1602.45,
        1560.54,
        ARRAY [58, 129],
        'nature'
    ),
    (
        24,
        false,
        '',
        1877.3,
        1461.67,
        ARRAY [59, 139],
        'nature'
    ),
    (
        25,
        false,
        '',
        1875.01,
        1172.68,
        ARRAY [61, 99],
        'nature'
    ),
    (
        26,
        false,
        '',
        1734.38,
        1133.78,
        ARRAY [108, 137],
        'nature'
    ),
    (
        27,
        false,
        '',
        2128.24,
        1189.68,
        ARRAY [89, 98],
        'nature'
    ),
    (
        28,
        false,
        '',
        316.29,
        960.1,
        ARRAY [1, 118],
        'history'
    ),
    (
        29,
        false,
        '',
        508.7,
        1213.51,
        ARRAY [123, 3],
        'history'
    ),
    (
        30,
        false,
        '',
        375.67,
        789.43,
        ARRAY [39, 35],
        'action'
    ),
    (
        31,
        false,
        '',
        608.66,
        807.58,
        ARRAY [41, 36],
        'action'
    ),
    (
        32,
        false,
        '',
        759.05,
        1016.35,
        ARRAY [6, 7],
        'action'
    ),
    (
        33,
        false,
        '',
        749.76,
        836.41,
        ARRAY [44, 38],
        'action'
    ),
    (
        34,
        false,
        '',
        528.4,
        675.68,
        ARRAY [40, 119],
        'action'
    ),
    (
        35,
        false,
        '',
        426.13,
        745.23,
        ARRAY [40, 30],
        'sense'
    ),
    (
        36,
        false,
        '',
        595.48,
        752.18,
        ARRAY [31, 4],
        'sense'
    ),
    (
        37,
        false,
        '',
        679.82,
        938.59,
        ARRAY [120, 6],
        'sense'
    ),
    (
        38,
        false,
        '',
        703.3,
        804.69,
        ARRAY [5, 33],
        'sense'
    ),
    (
        39,
        false,
        '',
        332.45,
        832.48,
        ARRAY [118, 30],
        'nature'
    ),
    (
        40,
        false,
        '',
        478.12,
        706.7,
        ARRAY [34, 35],
        'history'
    ),
    (
        41,
        false,
        '',
        627.24,
        858.77,
        ARRAY [120, 31],
        'history'
    ),
    (
        42,
        false,
        '',
        842.2,
        1085.7,
        ARRAY [7, 122],
        'history'
    ),
    (
        43,
        false,
        '',
        625.08,
        722.47,
        ARRAY [119, 5],
        'history'
    ),
    (
        44,
        false,
        '',
        797.22,
        861.83,
        ARRAY [33, 49],
        'nature'
    ),
    (
        45,
        false,
        '',
        911.1,
        896.91,
        ARRAY [47, 49],
        'action'
    ),
    (
        46,
        false,
        '',
        1060.1,
        992.58,
        ARRAY [113, 15],
        'action'
    ),
    (
        47,
        false,
        '',
        970.25,
        904.74,
        ARRAY [45, 121],
        'sense'
    ),
    (
        48,
        false,
        '',
        1084.65,
        1089.76,
        ARRAY [14, 15],
        'sense'
    ),
    (
        49,
        false,
        '',
        851.49,
        882.24,
        ARRAY [44, 45],
        'history'
    ),
    (
        50,
        false,
        '',
        1029.2,
        1218.76,
        ARRAY [125, 90],
        'action'
    ),
    (
        51,
        false,
        '',
        787.93,
        1178.55,
        ARRAY [91, 70],
        'action'
    ),
    (
        52,
        false,
        '',
        652.25,
        1302.3,
        ARRAY [123, 92],
        'action'
    ),
    (
        53,
        false,
        '',
        907.81,
        1444.19,
        ARRAY [93, 124],
        'action'
    ),
    (
        54,
        false,
        '',
        1044.93,
        1333.93,
        ARRAY [73, 112],
        'action'
    ),
    (
        55,
        false,
        '',
        1234.72,
        1548.13,
        ARRAY [11, 128],
        'action'
    ),
    (
        56,
        false,
        '',
        1492.2,
        1514.16,
        ARRAY [80, 129],
        'action'
    ),
    (
        57,
        false,
        '',
        1419.88,
        1606.31,
        ARRAY [12, 95],
        'action'
    ),
    (
        58,
        false,
        '',
        1661.72,
        1547.13,
        ARRAY [81, 23],
        'action'
    ),
    (
        59,
        false,
        '',
        1820.41,
        1490.61,
        ARRAY [97, 24],
        'action'
    ),
    (
        60,
        false,
        '',
        2007.76,
        1322.82,
        ARRAY [82, 140],
        'action'
    ),
    (
        61,
        false,
        '',
        1823.77,
        1124.75,
        ARRAY [137, 25],
        'action'
    ),
    (
        62,
        false,
        '',
        1655.61,
        934.11,
        ARRAY [100, 136],
        'action'
    ),
    (
        63,
        false,
        '',
        1576.91,
        1020.83,
        ARRAY [135, 101],
        'action'
    ),
    (
        64,
        false,
        '',
        1402.55,
        847.55,
        ARRAY [106, 86],
        'action'
    ),
    (
        65,
        false,
        '',
        1093.79,
        903.74,
        ARRAY [121, 107],
        'action'
    ),
    (
        66,
        false,
        '',
        1415.92,
        1070.55,
        ARRAY [17, 133],
        'action'
    ),
    (
        67,
        false,
        '',
        2242.41,
        1162.03,
        ARRAY [89, 141],
        'action'
    ),
    (
        68,
        false,
        '',
        1372.71,
        1248.92,
        ARRAY [78, 132],
        'action'
    ),
    (
        69,
        false,
        '',
        929.68,
        1151.93,
        ARRAY [122, 90],
        'sense'
    ),
    (
        70,
        false,
        '',
        832.91,
        1146.11,
        ARRAY [51, 122],
        'sense'
    ),
    (
        71,
        false,
        '',
        691.96,
        1231.03,
        ARRAY [91, 8],
        'sense'
    ),
    (
        72,
        false,
        '',
        814.33,
        1379.34,
        ARRAY [93, 9],
        'sense'
    ),
    (
        73,
        false,
        '',
        1019.91,
        1384.04,
        ARRAY [54, 10],
        'sense'
    ),
    (
        74,
        false,
        '',
        1074.36,
        1502.39,
        ARRAY [94, 127],
        'sense'
    ),
    (
        75,
        false,
        '',
        1323.53,
        1583.78,
        ARRAY [128, 12],
        'sense'
    ),
    (
        76,
        false,
        '',
        1410.45,
        1405.61,
        ARRAY [109, 13],
        'sense'
    ),
    (
        77,
        false,
        '',
        1591.71,
        1261.7,
        ARRAY [131, 138],
        'sense'
    ),
    (
        78,
        false,
        '',
        1337.21,
        1276.07,
        ARRAY [126, 68],
        'sense'
    ),
    (
        79,
        false,
        '',
        1503.3,
        1107.76,
        ARRAY [16, 135],
        'sense'
    ),
    (
        80,
        false,
        '',
        1548.27,
        1523.25,
        ARRAY [129, 96],
        'sense'
    ),
    (
        81,
        false,
        '',
        1715.8,
        1530.97,
        ARRAY [97, 58],
        'sense'
    ),
    (
        82,
        false,
        '',
        1975.92,
        1366.4,
        ARRAY [139, 60],
        'sense'
    ),
    (
        83,
        false,
        '',
        1989.18,
        1252.86,
        ARRAY [140, 99],
        'sense'
    ),
    (
        84,
        false,
        '',
        1747.17,
        1015.1,
        ARRAY [100, 137],
        'sense'
    ),
    (
        85,
        false,
        '',
        1571.41,
        940.36,
        ARRAY [136, 102],
        'sense'
    ),
    (
        86,
        false,
        '',
        1339.21,
        865.06,
        ARRAY [20, 64],
        'sense'
    ),
    (
        87,
        false,
        '',
        1521.46,
        804.69,
        ARRAY [106, 19],
        'sense'
    ),
    (
        88,
        false,
        '',
        1222.95,
        890.17,
        ARRAY [20, 107],
        'sense'
    ),
    (
        89,
        false,
        '',
        2183.64,
        1166.68,
        ARRAY [67, 27],
        'sense'
    ),
    (
        90,
        false,
        '',
        973.61,
        1186.22,
        ARRAY [69, 50],
        'history'
    ),
    (
        91,
        false,
        '',
        742.28,
        1205.43,
        ARRAY [51, 71],
        'history'
    ),
    (
        92,
        false,
        '',
        705.35,
        1323.45,
        ARRAY [52, 9],
        'history'
    ),
    (
        93,
        false,
        '',
        860.79,
        1410.63,
        ARRAY [72, 53],
        'history'
    ),
    (
        94,
        false,
        '',
        1019.91,
        1487.35,
        ARRAY [74, 124],
        'history'
    ),
    (
        95,
        false,
        '',
        1465.97,
        1577.29,
        ARRAY [57, 56],
        'history'
    ),
    (
        96,
        false,
        '',
        1562.12,
        1465.35,
        ARRAY [80, 130],
        'history'
    ),
    (
        97,
        false,
        '',
        1768.27,
        1513.16,
        ARRAY [81, 59],
        'history'
    ),
    (
        98,
        false,
        '',
        2070.89,
        1231.35,
        ARRAY [140, 27],
        'history'
    ),
    (
        99,
        false,
        '',
        1935.14,
        1218.61,
        ARRAY [83, 25],
        'history'
    ),
    (
        100,
        false,
        '',
        1699.43,
        967.45,
        ARRAY [62, 84],
        'history'
    ),
    (
        101,
        false,
        '',
        1599.3,
        964.45,
        ARRAY [136, 63],
        'history'
    ),
    (
        102,
        false,
        '',
        1530.75,
        970.45,
        ARRAY [134, 85],
        'history'
    ),
    (
        103,
        false,
        '',
        2286.21,
        417.25,
        ARRAY [116, 142],
        'action'
    ),
    (
        104,
        false,
        '',
        2316.82,
        350.24,
        ARRAY [117, 105],
        'sense'
    ),
    (
        105,
        false,
        '',
        2322.06,
        395.34,
        ARRAY [116, 104],
        'history'
    ),
    (
        106,
        false,
        '',
        1463.79,
        827.53,
        ARRAY [87, 64],
        'history'
    ),
    (
        107,
        false,
        '',
        1151.69,
        899.91,
        ARRAY [65, 88],
        'history'
    ),
    (
        108,
        false,
        '',
        1686.14,
        1173.76,
        ARRAY [26, 138],
        'history'
    ),
    (
        109,
        false,
        '',
        1362.43,
        1360.56,
        ARRAY [126, 76],
        'history'
    ),
    (
        110,
        false,
        '',
        1516.17,
        1261.7,
        ARRAY [21, 131],
        'history'
    ),
    (
        111,
        false,
        '',
        1396.09,
        1181.59,
        ARRAY [132, 133],
        'history'
    ),
    (
        112,
        false,
        '',
        1066.39,
        1281.52,
        ARRAY [125, 54],
        'history'
    ),
    (
        113,
        false,
        '',
        1045.05,
        951.33,
        ARRAY [121, 46],
        'history'
    ),
    (
        114,
        false,
        '',
        1097.67,
        1184.55,
        ARRAY [125, 14],
        'history'
    ),
    (
        115,
        false,
        '',
        2309.35,
        1908.65,
        ARRAY [129],
        'landmark'
    ),
    (
        116,
        false,
        '',
        2326.16,
        447.72,
        ARRAY [103, 105, 129],
        'landmark'
    ),
    (
        117,
        false,
        '',
        2298.53,
        308.39,
        ARRAY [104, 18],
        'landmark'
    ),
    (
        118,
        true,
        '',
        291.81,
        880.41,
        ARRAY [39, 28],
        'landmark'
    ),
    (
        119,
        false,
        '',
        582.78,
        648.6,
        ARRAY [4, 34, 43],
        'landmark'
    ),
    (
        120,
        false,
        '',
        649.43,
        902.83,
        ARRAY [37, 41],
        'landmark'
    ),
    (
        121,
        false,
        '',
        1029.97,
        910.66,
        ARRAY [113, 65, 47],
        'landmark'
    ),
    (
        122,
        false,
        '',
        882.75,
        1113.83,
        ARRAY [69, 42, 70],
        'landmark'
    ),
    (
        123,
        false,
        '',
        565.35,
        1269.89,
        ARRAY [8, 29, 52],
        'landmark'
    ),
    (
        124,
        false,
        '',
        952.17,
        1482.38,
        ARRAY [10, 94, 53],
        'landmark'
    ),
    (
        125,
        false,
        '',
        1081.68,
        1235.19,
        ARRAY [114, 112, 50],
        'landmark'
    ),
    (
        126,
        false,
        '',
        1309.72,
        1315.11,
        ARRAY [78, 109],
        'landmark'
    ),
    (
        127,
        false,
        '',
        1122.08,
        1535.18,
        ARRAY [11, 74],
        'landmark'
    ),
    (
        128,
        false,
        '',
        1270.03,
        1579.52,
        ARRAY [75, 55],
        'landmark'
    ),
    (
        129,
        false,
        '',
        1528.59,
        1575.54,
        ARRAY [80, 23, 56, 95, 115, 116],
        'landmark'
    ),
    (
        130,
        false,
        '',
        1566.39,
        1399.62,
        ARRAY [22, 96],
        'landmark'
    ),
    (
        131,
        false,
        '',
        1549.85,
        1296.06,
        ARRAY [77, 110, 22],
        'landmark'
    ),
    (
        132,
        false,
        '',
        1418.03,
        1230.19,
        ARRAY [21, 111, 68],
        'landmark'
    ),
    (
        133,
        false,
        '',
        1398.58,
        1126.94,
        ARRAY [16, 66, 111],
        'landmark'
    ),
    (
        134,
        false,
        '',
        1483.84,
        985.34,
        ARRAY [102, 17],
        'landmark'
    ),
    (
        135,
        false,
        '',
        1547.49,
        1069.77,
        ARRAY [63, 79],
        'landmark'
    ),
    (
        136,
        false,
        '',
        1602.6,
        902.72,
        ARRAY [62, 85, 19],
        'landmark'
    ),
    (
        137,
        false,
        '',
        1784.46,
        1069.02,
        ARRAY [61, 84, 26],
        'landmark'
    ),
    (
        138,
        false,
        '',
        1622.61,
        1210.53,
        ARRAY [108, 77],
        'landmark'
    ),
    (
        139,
        false,
        '',
        1944.59,
        1415.54,
        ARRAY [82, 24, 142],
        'landmark'
    ),
    (
        140,
        false,
        '',
        2038.47,
        1279.49,
        ARRAY [98, 60, 83],
        'landmark'
    ),
    (
        141,
        true,
        '',
        2299.55,
        1165.7,
        ARRAY [67],
        'landmark'
    ),
    (
        142,
        false,
        '',
        2244.47,
        413.06,
        ARRAY [103, 18, 139],
        'landmark'
    );