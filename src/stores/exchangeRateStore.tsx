import { getWonDollarExcRate } from '@/services/exchangeRate'
import { ExchRateAPIResPonse } from '@/types'

export type ExchangeRateStore = {
  wonPerDollarToday: string;
  getExchangeRate: () => Promise<void>;
}

export const exchangeRateStore = (): ExchangeRateStore => {
  const store: ExchangeRateStore = {
    wonPerDollarToday: '1400',

    async getExchangeRate () {
      try {
        const res = await getWonDollarExcRate()
        this.wonPerDollarToday = (res as ExchRateAPIResPonse).conversion_rates.KRW.toFixed(2)
      } catch (error) {
        console.log(error)
      }
    }
  }
  return store
}
