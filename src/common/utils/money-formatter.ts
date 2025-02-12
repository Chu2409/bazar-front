type FormatMoneyOptions = {
  currency?: string
  locale?: string
  decimals?: number
}

export const formatMoney = (
  amount: number,
  options: FormatMoneyOptions = {},
) => {
  const { currency = 'USD', locale = 'en-US', decimals = 2 } = options

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}
