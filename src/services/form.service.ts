export function getTextAsFormattedCpf(originalValue: string): string {
  const formattedValue = originalValue
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')

  if (!formattedValue && formattedValue.length < 14) {
    return formattedValue
  }

  return formattedValue.slice(0, 14)
}

export const getTextOnlyNumbers = (originalValue: string): string => {
  return originalValue.replace(/\D/g, '') || ''
}

export function getTextAsFormattedCurrency(originalValue: string): string {
  if (!originalValue) return originalValue

  const onlyNumbers = getTextOnlyNumbers(originalValue)
  if (
    !onlyNumbers.length ||
    onlyNumbers === '00' ||
    (onlyNumbers !== '000' && onlyNumbers !== '00' && Number(onlyNumbers) === 0)
  )
    return ''

  const numericValue = parseFloat(onlyNumbers.replace(/\D/g, '')) / 100
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(numericValue)

  return formattedValue
}
