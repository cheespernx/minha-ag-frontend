import { removeMask } from './removeMasks'

interface validation {
  message: string
  valid: boolean
}

interface Type {
  [key: string]: (value: string) => validation
}

const regexValidation = {
  phone: /\(\d{2,}\) \d{4,}-\d{4}/,
  zip_code: /^[0-9]{5}-[0-9]{3}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  user_email:
    /^(?:[.\dA-Z][A-Z\d._-]{2,}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
  username: /^[a-zA-Z\d._-]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  fullname: /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,6}$/,
}

function validateCNPJ(cnpj: string) {
  const validation: validation = {
    message: '',
    valid: true,
  }

  cnpj = removeMask(cnpj, 'cnpj')

  const textCnpj = cnpj.substring(0, 12)
  const arrayCnpj = textCnpj.split('')

  let summation = 0
  let restDivision
  let firstValidator: number
  let secondValidator

  let cont = 5
  let indexCnpj = 0

  while (indexCnpj <= 11) {
    if (indexCnpj === 4) {
      cont = 9
    }

    summation += Number(arrayCnpj[indexCnpj]) * cont

    cont -= 1
    indexCnpj += 1
  }

  restDivision = summation % 11

  restDivision < 2 ? (firstValidator = 0) : (firstValidator = 11 - restDivision)

  arrayCnpj.push(String(firstValidator))

  summation = 0

  cont = 6
  indexCnpj = 0

  while (indexCnpj <= 12) {
    if (indexCnpj === 5) {
      cont = 9
    }

    summation += Number(arrayCnpj[indexCnpj]) * cont

    cont -= 1
    indexCnpj += 1
  }

  restDivision = summation % 11

  restDivision < 2
    ? (secondValidator = 0)
    : (secondValidator = 11 - restDivision)

  const lastDigits: string = cnpj.substring(12, 14)
  const lastDigitsArray: string[] = lastDigits.split('')

  validation.message = 'Formato inválido'
  validation.valid = false

  if (
    Number(lastDigitsArray[0]) === firstValidator &&
    Number(lastDigitsArray[1]) === secondValidator
  ) {
    validation.message = ''
    validation.valid = true
  }

  return validation
}

function validateCPF(strCPF: string) {
  const notValidCpfs = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '77777777777',
    '88888888888',
    '99999999999',
  ]
  const validation: validation = {
    message: '',
    valid: true,
  }

  validation.message = ''
  validation.valid = true

  strCPF = removeMask(strCPF, 'cpf')

  let sum = 0
  let rest

  if (notValidCpfs.includes(strCPF) || strCPF.length > 11) {
    validation.message = 'Formato inválido'
    validation.valid = false
    return validation
  }

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
  rest = (sum * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest != parseInt(strCPF.substring(9, 10))) {
    validation.message = 'Formato inválido'
    validation.valid = false
    return validation
  }

  sum = 0
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
  rest = (sum * 10) % 11

  if (rest == 10 || rest == 11) rest = 0
  if (rest != parseInt(strCPF.substring(10, 11))) {
    validation.message = 'Formato inválido'
    validation.valid = false
    return validation
  }

  return validation
}

function validateEmail(value: string) {
  const validation: validation = {
    message: '',
    valid: true,
  }

  let message = ''
  const regex = regexValidation.email.test(value)

  if (!regex) message = 'Seu e-mail está incorreto, inclua o "@" e seu ".com"'

  validation.message = message
  validation.valid = regex

  return validation
}

function validateUsername(value: string) {
  const validation: validation = {
    message: '',
    valid: true,
  }
  let message = ''
  let regex = regexValidation.username.test(value)

  if (!regex) {
    message = 'Proibido o uso de caracteres especiais (@#$%*&()!)'
  }

  if (value.length < 3) {
    regex = false
    message = 'Seu nome de usuário deve ter no mínimo 3 caracteres'
  }

  validation.message = message
  validation.valid = regex

  return validation
}

function validateFullname(value: string) {
  const validation: validation = {
    message: '',
    valid: true,
  }
  let message = ''
  const regex = regexValidation.fullname.test(value)

  if (!regex) {
    message = 'Insira um nome e sobrenome, apenas letras'
  }

  validation.message = message
  validation.valid = regex

  return validation
}

function validatePhone(value: string, fix = false) {
  const validation: validation = {
    message: '',
    valid: true,
  }

  let message = ''
  let regex = regexValidation.phone.test(value)

  if (
    value === '(00) 00000-0000' ||
    value === '(11) 11111-1111' ||
    value === '(22) 22222-2222' ||
    value === '(33) 33333-3333' ||
    value === '(44) 44444-4444' ||
    value === '(55) 55555-5555' ||
    value === '(66) 66666-6666' ||
    value === '(77) 77777-7777' ||
    value === '(88) 88888-8888' ||
    value === '(99) 99999-9999' ||
    value.includes('(00)',0)
  ) {
    regex = false
  }

  if (!fix && value.length < 15) {
    regex = false
  }

  if (!regex) {
    value.includes('(00)',0) ?
    message = 'Formato do DDD inválido.' :
    message = 'Formato inválido. Digite o DDD + Nº do telefone.'
  }

  validation.message = message
  validation.valid = regex

  return validation
}

function validatePassword(value: string) {
  const validation: validation = {
    message: '',
    valid: true,
  }

  let message = ''
  let regex = true

  if (value.length < 6) {
    message = 'Sua senha precisa ter no mínimo 6 caracteres'
    regex = false
  }

  validation.message = message
  validation.valid = regex

  return validation
}

function validateUserEmail(value: string) {
  const validation: validation = {
    message: '',
    valid: true,
  }

  let message = ''
  const regex = regexValidation.user_email.test(value)

  if (!regex)
    message =
      'Esse formato é incorreto. Insira um nome de usuário ou e-mail corretos'

  validation.message = message
  validation.valid = regex

  return validation
}

function validateCurrency(value: string) {
  const status = value !== '0,00'

  const validation: validation = {
    message: !status ? 'O preço não pode ser zero.' : '',
    valid: status,
  }

  return validation
}

function validateWeight(value: string) {
  const status = value !== '' && value !== '0,000'

  const validation: validation = {
    message: !status ? 'O peso não pode ser zero.' : '',
    valid: status,
  }

  return validation
}

function validateNumber(value: string) {
  const status = !isNaN(Number(value))

  const validation: validation = {
    message: !status ? 'O peso não pode ser zero.' : '',
    valid: status,
  }

  return validation
}

function validateZipCode(value: string) {
  const validation: validation = {
    message: '',
    valid: true,
  }

  let message = ''
  let regex = regexValidation.zip_code.test(value)

  if (
    value === '00000-000' ||
    value === '11111-111' ||
    value === '22222-222' ||
    value === '33333-333' ||
    value === '44444-444' ||
    value === '55555-555' ||
    value === '66666-666' ||
    value === '77777-777' ||
    value === '88888-888' ||
    value === '99999-999'
  ) {
    regex = false
  }

  if (!regex) message = 'CEP inválido'

  validation.message = message
  validation.valid = regex

  return validation
}

export const validationTypes: Type = {
  cnpj: (value: string) => validateCNPJ(value),
  cpf: (value: string) => validateCPF(value),
  email: (value: string) => validateEmail(value),
  username: (value: string) => validateUsername(value),
  fullname: (value: string) => validateFullname(value),
  phone: (value: string) => validatePhone(value, true),
  telephone: (value: string) => validatePhone(value, true),
  password: (value: string) => validatePassword(value),
  userEmail: (value: string) => validateUserEmail(value),
  currency: (value: string) => validateCurrency(value),
  weight: (value: string) => validateWeight(value),
  number: (value: string) => validateNumber(value),
  zipCode: (value: string) => validateZipCode(value)
}
