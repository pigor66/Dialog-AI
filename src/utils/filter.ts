export const censurarPalavras = (texto: string): string => {
  const palavrasBanidas = [
    'idiot',
    'fuck',
    'shit',
    'bitch',
    'asshole',
    'bastard',
    'dumb',
    'stupid',
    'fucking',
    'motherfucker',
  ];
  const regex = new RegExp(`\\b(${palavrasBanidas.join('|')})\\b`, 'gi');
  return texto.replace(regex, '*****');
};
