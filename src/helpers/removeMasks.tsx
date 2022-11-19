export const removeMask = (text: string, type: string): string => {
  switch (type) {
  case 'cpf':
    text = text.replace('.', '');
    text = text.replace('.', '');
    text = text.replace('-', '');
    break;
  case 'cnpj':
    text = text.replace('.', '');
    text = text.replace('.', '');
    text = text.replace('/', '');
    text = text.replace('-', '');
    break;
  case 'phone':
    text = text.replace('(', '');
    text = text.replace(')', '');
    text = text.replace(' ', '');
    text = text.replace('-', '');
    break;
  case 'card':
    text = text.replace(/\s/g, '');
    break;
  }

  return text;
};

export const replaceMask = (text: string): string => {
  return text.replace(/\D+/g, '');
}