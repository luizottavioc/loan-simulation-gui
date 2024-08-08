export interface UFInfo {
  id: number
  name: string
  acronym: string
  interestRate: number
  createdAt: string
  updatedAt: string
}

export type UFsResponse = UFInfo[]

export interface UF {
  id: number
  name: string
  acronym: string
  interestRate: number
}
