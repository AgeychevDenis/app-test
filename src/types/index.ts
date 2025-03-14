export enum AccountType {
  LDAP = 'LDAP',
  LOCAL = 'LOCAL'
}

export type AccountLabel = Record<'text', string>

export interface Account {
  id: string
  labels: AccountLabel[]
  type: AccountType
  login: string
  password: string | undefined
  errors: {
    login: boolean
    password: boolean
  }
}