interface Formatting {
  [key: string]: (value: string) => string
}

const limitCharacters = (maxLength: number, value: string) => {
  if (value.length >= maxLength) {
    value = value.substr(0, maxLength)
  }

  return value
}

const formatCNPJ = (value: string) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '$1.$2')
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
  value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')
  value = value.replace(/(\d{4})(\d)/, '$1-$2')

  return value
}

const formatCPF = (value: string) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{3})(\d)/, '$1.$2')
  value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
  value = value.replace(/\.(\d{3})(\d)/, '.$1-$2')

  return value
}

const formatTel = (value: string) => {
  if (!value) {
    return value
  }
  
  value = value.replace(/\D/g, '')

  if (value.length > 2) {
    value = `(${value.substr(0, 2)}) ${value.substr(2)}`
  }

  if (value.length > 9) {
    value = `${value.substr(0, 9)}-${value.substr(9)}`
  }

  if (value.length > 14) {
    value = value.replace('-', '')
    value = `${value.substr(0, 10)}-${value.substr(10, 15)}`
  }

  return value
}

const formatCardNumber = (value: string) => {
  value = limitCharacters(22, value)

  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{4})(\d)/g, '$1 $2')
  value = value.replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3')
  value = value.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4')
  return value
}

const formatDate = (value: string) => {
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '$1/$2')
  value = value.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')

  return value
}

const formatDateCard = (value: string) => {
  value = limitCharacters(5, value)

  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '$1/$2')

  return value
}

const formatZipCode = (value: string) => {
  return value?.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
}

const formatWeight = (value: string) => {
  const number = Number(value.replace(/\D/g, ''))
  let newValue = (number / 1000).toFixed(3) + ''
  newValue = newValue.replace('.', ',')
  newValue = newValue.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,')
  newValue = newValue.replace(/(\d)(\d{3}),/g, '$1.$2,')
  value = newValue

  return value
}

const formatNumber = (value: string) => {
  return value?.replace(/\D/g, '')
}

export const formatCurrency = (value: string): string => {
  const number = Number(value.toString().replace(/\D/g, ''))
  let newValue = (number / 100).toFixed(2) + ''
  newValue = newValue.replace('.', ',')
  newValue = newValue.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,')
  value = newValue.replace(/(\d)(\d{3}),/g, '$1.$2,')

  return value
}

export const setFormat = (value: string, type: string): string => {
  const format: Formatting = {
    cnpj: (value: string) => formatCNPJ(value),
    cpf: (value: string) => formatCPF(value),
    phone: (value: string) => formatTel(value),
    telephone: (value: string) => formatTel(value),
    zipCode: (value: string) => formatZipCode(value),
    date: (value: string) => formatDate(value),
    cardDate: (value: string) => formatDateCard(value),
    cardNumber: (value: string) => formatCardNumber(value),
    weight: (value: string) => formatWeight(value),
    number: (value: string) => formatNumber(value),
    currency: (value: string) => formatCurrency(value),
  }

  if (!format[type]) {
    return value
  }

  return format[type](value)
}

export const base64toBlob = (base64Data: string, contentType: string): Blob => {
  base64Data = base64Data.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
  const sliceSize = 1024
  const byteCharacters = atob(base64Data)
  const bytesLength = byteCharacters.length
  const slicesCount = Math.ceil(bytesLength / sliceSize)
  const byteArrays = new Array(slicesCount)

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize
    const end = Math.min(begin + sliceSize, bytesLength)

    const bytes = new Array(end - begin)
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0)
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes)
  }
  return new Blob(byteArrays, { type: contentType })
}
