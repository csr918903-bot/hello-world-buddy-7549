/**
 * Motor de respostas do assistente Nutrivida.
 *
 * Regras são avaliadas em ordem: as mais específicas vêm primeiro para não
 * serem "engolidas" por regras genéricas (bug do arquivo original, onde
 * "dieta para emagrecer" nunca era alcançado porque "emagrecer" vinha antes).
 */

type Rule = {
  /** casa a palavra inteira (\bpalavra\b) */
  words?: string[];
  /** casa em qualquer parte do texto */
  includes?: string[];
  /** casa quando TODOS os termos do grupo aparecem */
  all?: string[][];
  reply: string;
};

function temPalavra(texto: string, palavra: string) {
  const escaped = palavra.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}([^\\p{L}\\p{N}]|$)`, "iu").test(texto);
}

const rules: Rule[] = [
  {
    words: ["oi", "olá", "ola", "hi", "hello", "eai"],
    reply:
      "Olá! Sou seu assistente de nutrição. Posso ajudar com dietas, alimentação saudável, emagrecimento, hipertrofia e muito mais.",
  },
  {
    includes: ["sua criação", "para que voce foi feito", "para que você foi feito"],
    reply:
      "Fui criado para ajudar pessoas a terem uma alimentação mais saudável, oferecendo dicas, dietas e sugestões de acordo com os objetivos e necessidades do usuário.",
  },
  {
    all: [
      ["o que", "nutrivida"],
      ["oque", "nutrivida"],
      ["o que", "nutri"],
      ["oque", "nutri"],
    ],
    reply:
      "Somos um grupo dedicado a promover informações sobre nutrição e qualidade de vida. Nosso objetivo é ajudar pessoas a entenderem a importância de uma alimentação equilibrada.",
  },
  { words: ["elfo"], reply: "O elfo é um ser de luz que realiza desejos." },
  {
    words: ["água", "agua"],
    reply: "O ideal é beber cerca de 2 litros de água por dia.",
  },
  {
    includes: ["proteina", "proteína"],
    reply:
      "Proteínas ajudam na construção muscular. Exemplos: ovos, frango, peixe, carne, leite, iogurte, feijão e soja.",
  },
  {
    includes: ["carboidrato", "carbo"],
    reply:
      "Carboidratos fornecem energia para o corpo. Bons exemplos: arroz, aveia, mandioca, batata-doce, pão integral e frutas.",
  },
  {
    includes: ["gordura boa", "gorduras boas"],
    reply:
      "Gorduras boas ajudam no funcionamento do organismo. Exemplos: azeite, castanhas, amendoim, abacate e peixes.",
  },
  {
    includes: ["vitamina"],
    reply:
      "Vitaminas ajudam o corpo a funcionar corretamente. Frutas, legumes e verduras são ótimas fontes.",
  },
  {
    includes: ["fibra"],
    reply:
      "Fibras ajudam na digestão e aumentam a saciedade. Exemplos: aveia, frutas, legumes, verduras e chia.",
  },
  {
    includes: ["alimentação saudável", "alimentaçao saudavel", "algo saudavel"],
    words: ["saudável", "saudavel"],
    reply:
      "Uma alimentação saudável inclui frutas, verduras, proteínas magras, carboidratos bons e gorduras saudáveis. Evite excesso de açúcar, refrigerante e ultraprocessados.",
  },
  {
    includes: ["alimentação pesada", "alimentaçao pesada"],
    all: [
      ["alimentação", "pesada"],
      ["alimentaçao", "pesada"],
    ],
    reply:
      "Alimentação pesada: aumente carboidratos como arroz, macarrão e batata. Consuma proteínas em todas as refeições e inclua gorduras boas.",
  },
  {
    includes: ["dieta para emagrecer", "dieta emagrecer"],
    reply:
      "Dieta para emagrecer: café da manhã com frutas e aveia, almoço com arroz integral, feijão, salada e frango grelhado, lanche leve e jantar mais leve.",
  },
  {
    includes: ["emagrecer", "perder peso", "menos peso"],
    reply:
      "Para emagrecer: mantenha déficit calórico, pratique exercícios físicos, consuma proteínas e reduza ultraprocessados.",
  },
  {
    includes: ["dieta hipertrofia", "dieta para ganhar massa"],
    reply:
      "Dieta para hipertrofia: ovos e aveia no café da manhã, arroz, feijão e carne no almoço, banana com pasta de amendoim no lanche e jantar rico em proteínas.",
  },
  {
    includes: ["hipertrofia", "massa muscular", "ganhar massa"],
    reply:
      "Para ganhar massa muscular: aumente proteínas, carboidratos bons e pratique musculação regularmente.",
  },
  {
    includes: ["engordar", "ganhar peso", "mais peso"],
    reply:
      "Para ganhar peso de forma saudável: faça mais refeições ao longo do dia, aumente alimentos nutritivos e mantenha proteínas em todas as refeições.",
  },
  {
    includes: ["vegana", "veganismo"],
    reply:
      "Uma dieta vegana deve incluir feijão, lentilha, grão-de-bico, tofu, soja, arroz, aveia, frutas, legumes e suplementação de vitamina B12.",
  },
  {
    includes: ["low carb"],
    reply: "A dieta low carb reduz carboidratos e aumenta proteínas e gorduras boas.",
  },
  {
    includes: ["cetogênica", "cetogenica"],
    reply: "A dieta cetogênica possui poucos carboidratos e bastante gordura boa.",
  },
  {
    includes: ["mediterrânea", "mediterranea"],
    reply: "A dieta mediterrânea prioriza azeite, peixes, frutas, verduras, legumes e castanhas.",
  },
  {
    includes: ["jejum"],
    reply: "Jejum intermitente é uma estratégia alimentar baseada em períodos sem comer.",
  },
  {
    includes: ["pré treino", "pre treino", "pré-treino"],
    reply: "Boas opções de pré treino: banana, café, aveia e pão integral.",
  },
  {
    includes: ["dor pós treino", "dor pos treino"],
    reply: "A famosa dor que faz a pessoa sentar igual idoso 😭",
  },
  {
    includes: ["pós treino", "pos treino", "pós-treino"],
    reply: "No pós treino prefira proteínas e carboidratos como ovos, arroz, frango ou banana.",
  },
  {
    includes: ["café da manhã", "cafe da manhã", "cafe da manha"],
    reply: "Boas opções de café da manhã: ovos, frutas, aveia, pão integral e iogurte.",
  },
  {
    words: ["almoço", "almoco"],
    reply: "Um almoço saudável pode ter arroz, feijão, proteína magra e salada.",
  },
  { words: ["jantar"], reply: "No jantar prefira refeições leves e nutritivas." },
  {
    includes: ["doce"],
    reply: "Doces podem ser consumidos com equilíbrio. Evite exageros.",
  },
  {
    includes: ["refrigerante todo dia"],
    reply: "Seu pâncreas pediu demissão 💀",
  },
  {
    includes: ["refrigerante"],
    reply: "Refrigerantes possuem muito açúcar e pouco valor nutricional.",
  },
  {
    includes: ["ansiedade"],
    reply:
      "Alimentos ricos em magnésio, ômega 3 e triptofano podem ajudar no bem-estar, como banana, aveia, peixe, castanhas e cacau.",
  },
  {
    includes: ["depressão", "depressao"],
    reply:
      "Uma alimentação equilibrada pode ajudar no humor. Frutas, vegetais, proteínas, ômega 3 e boa hidratação são importantes.",
  },
  {
    includes: ["esquizofrenia"],
    reply:
      "Uma alimentação equilibrada pode ajudar na saúde geral. Algumas pessoas focam em ômega 3, vegetais e alimentos menos ultraprocessados, mas o acompanhamento médico é essencial.",
  },
  {
    includes: ["insônia", "insonia"],
    reply:
      "Evite cafeína à noite e prefira alimentos leves no jantar. Chá de camomila, banana e aveia podem ajudar no relaxamento.",
  },
  {
    includes: ["diabetes"],
    reply:
      "Pessoas com diabetes geralmente devem controlar açúcar e preferir carboidratos integrais, fibras e proteínas.",
  },
  {
    includes: ["pressão alta", "hipertensão"],
    reply:
      "Reduzir excesso de sal e ultraprocessados pode ajudar. Frutas, verduras e bastante água são recomendados.",
  },
  {
    includes: ["anemia"],
    reply:
      "Alimentos ricos em ferro como feijão, carne e vegetais verdes podem ajudar. Vitamina C melhora a absorção.",
  },
  {
    includes: ["treino fofo"],
    reply: "Até treino fofo dói no outro dia 😭",
  },
  {
    includes: ["treino"],
    reply: "Treino combinado com boa alimentação e descanso ajuda muito nos resultados.",
  },
  {
    includes: ["sono"],
    reply: "Dormir bem ajuda no metabolismo, recuperação muscular e saúde mental.",
  },
  {
    includes: ["estresse", "stress"],
    reply:
      "Evite excesso de cafeína e ultraprocessados. Água, frutas e boa rotina de sono ajudam bastante.",
  },
  {
    includes: ["criança"],
    reply:
      "Crianças precisam de alimentação equilibrada com frutas, proteínas, verduras e carboidratos saudáveis.",
  },
  {
    includes: ["idoso"],
    reply: "Idosos precisam de boa hidratação, proteínas e vitaminas para manter músculos e saúde.",
  },
  {
    includes: ["grávida", "gravida"],
    reply:
      "Na gravidez é importante consumir ferro, cálcio, proteínas e fazer acompanhamento médico.",
  },
  {
    includes: ["fast food"],
    reply: "Fast food pode ser consumido às vezes, mas em excesso pode prejudicar a saúde.",
  },
  {
    includes: ["energia infinita"],
    reply: "Dormir cedo já seria um ótimo começo ⚡",
  },
  {
    includes: ["energético", "energetico"],
    reply: "Energéticos possuem muita cafeína e açúcar. Evite exageros.",
  },
  {
    includes: ["café", "cafe"],
    reply: "O café pode dar energia e melhorar foco, mas em excesso pode causar ansiedade e insônia.",
  },
  {
    includes: ["comi 3 hambúrguer", "comi 3 hamburguer"],
    reply: "O chef ficou feliz, seu corpo talvez nem tanto 😭",
  },
  {
    includes: ["hambúrguer", "hamburguer"],
    reply:
      "Hambúrguer pode fazer parte da alimentação às vezes, principalmente se combinado com equilíbrio.",
  },
  {
    includes: ["pizza todo dia"],
    reply: "Seu nutricionista provavelmente desmaiaria vendo isso 😭",
  },
  {
    includes: ["comi 14 pizzas"],
    reply: "Seu estômago entrou em modo sobrevivência 💀",
  },
  {
    includes: ["pizza"],
    reply: "Pizza pode ser consumida com moderação. Sabores com legumes e proteínas costumam ser melhores.",
  },
  { includes: ["virei um sapo"], reply: "Talvez você precise de água, descanso e menos energia caótica ;-) 🐸" },
  { includes: ["quero shape"], reply: "Shape vem com treino, dieta e sofrimento emocional na academia 💪" },
  {
    includes: ["to triste", "estou triste"],
    reply: "Espero que você fique melhor logo 💛 descansar, conversar e cuidar da alimentação pode ajudar.",
  },
  { includes: ["to feliz"], reply: "Perfeito, continue cuidando da sua saúde e da mental." },
  {
    includes: ["posso viver de miojo"],
    reply: "Seu corpo provavelmente abriria um processo judicial contra você ;_;",
  },
  {
    includes: ["comi cimento"],
    reply: "Acho melhor não transformar seu intestino em uma obra da prefeitura 🧱",
  },
  { includes: ["quero virar gigante"], reply: "Proteína, treino, sono e muita paciência." },
  { includes: ["quero virar o cbum"], reply: "Primeiro passo: vender sua alma pra academia 💀" },
  { includes: ["to com fome"], reply: "Complicado... que tal uma fruta com iogurte?" },
  {
    includes: ["me ajuda"],
    reply: "Claro que ajudo! Me fale sobre dieta, treino, emagrecimento ou alimentação.",
  },
  {
    includes: ["vou morrer"],
    reply: "Beba água, descanse e não faça dieta baseada em energético 😭",
  },
  {
    includes: ["comi muito"],
    reply: "Acontece! O equilíbrio ao longo da semana é mais importante.",
  },
  { includes: ["to gordo"], reply: "O mais importante é cuidar da saúde e do bem-estar 💛" },
  { includes: ["to magro"], reply: "Com alimentação adequada e treino você pode ganhar massa 💪" },
  { includes: ["quero ficar monstrão"], reply: "Frango, arroz e ódio da segunda-feira 😎" },
  { includes: ["academia"], reply: "Academia + alimentação + sono = evolução 💪" },
  {
    includes: ["quantos ovos"],
    reply: "Depende do seu objetivo, mas ovos são ótimas fontes de proteína.",
  },
  { includes: ["frango e arroz"], reply: "A refeição sagrada da hipertrofia 💪" },
  { includes: ["só durmo"], reply: "Pelo menos o shape de hibernação tá vindo 😭" },
  { includes: ["não gosto de salada"], reply: "Todo vilão tem uma origem 😭" },
  { includes: ["to virando academia"], reply: "Daqui a pouco você começa a respirar whey 💀" },
  { includes: ["whey"], reply: "Whey ajuda na proteína, mas não faz milagre sozinho." },
  { includes: ["leg day"], reply: "O verdadeiro teste de sobrevivência humana 💀" },
  { includes: ["odeio cardio"], reply: "Metade da humanidade concorda com você 😭" },
  { includes: ["amo comer"], reply: "Você e literalmente toda a humanidade 🤝" },
  { includes: ["to parecendo uma geladeira"], reply: "O importante é estar saudável 😭" },
  { includes: ["quero secar"], reply: "Déficit calórico, treino e paciência são o caminho 🔥" },
  { includes: ["bulking"], reply: "A fase onde tudo vira desculpa pra comer 😭" },
  { includes: ["cutting"], reply: "A fase onde até o cheiro da comida dá fome 💀" },
  {
    includes: [
      "porra",
      "vai se fuder",
      "desgraça",
      "vagabundo",
      "vagabunda",
    ],
    words: ["cu", "smt"],
    reply: "Vamos manter o respeito! Estou aqui para ajudar com informações sobre nutrição.",
  },
  {
    all: [
      ["alimentação"],
      ["alimentaçao"],
    ],
    reply: "Qual tipo de alimentação você gostaria? Saudável, para emagrecer ou para ganhar massa?",
  },
  {
    words: ["dieta"],
    reply:
      "Uma dieta equilibrada possui proteínas, carboidratos, gorduras boas, vitaminas e minerais.",
  },
  {
    words: ["peso"],
    reply: "Você gostaria de perder peso, ganhar peso ou ganhar massa muscular?",
  },
];

export const RESPOSTA_PADRAO =
  "Ainda estou aprendendo sobre isso. Tente perguntar sobre dieta, proteínas, treino, emagrecimento ou hipertrofia.";

export function responder(pergunta: string): string {
  const p = pergunta.toLowerCase().trim();
  if (!p) return RESPOSTA_PADRAO;

  for (const rule of rules) {
    if (rule.includes?.some((term) => p.includes(term))) return rule.reply;
    if (rule.words?.some((word) => temPalavra(p, word))) return rule.reply;
    if (rule.all?.some((group) => group.every((term) => p.includes(term)))) return rule.reply;
  }

  return RESPOSTA_PADRAO;
}

export const SUGESTOES = [
  "Como emagrecer?",
  "Dieta para hipertrofia",
  "O que comer no pré treino?",
  "Quanta água por dia?",
];
