import { getYear } from 'date-fns'

export const months = new Array(12).fill(true).map((month, monthIdx) => {
  return monthIdx + 1
})

export const thisYear = getYear(new Date())

export const years = new Array(thisYear - 2021 + 1).fill(true).map((year, yearIdx) => {
  return 2021 + yearIdx
})

export const yyMMddDash = 'yy-MM-dd'
export const yyMMddDot = 'yy.MM.dd'
export const yyyyMMddDot = 'yyyy.MM.dd'

export const HHmm = 'HH:mm'
