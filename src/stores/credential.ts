import { defineStore } from 'pinia'
import { ref } from 'vue'
import { AccountType } from '@/types'
import type { Account } from '@/types'

export const useCredentialStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  const checkAccountValidity = (account: Account): boolean => {
    if (!account.login || account.login.length > 100) return false
    if (account.type === AccountType.LOCAL && (!account.password || account.password.length > 100)) return false
    return true
  }

  const fetchAccounts = () => {
    const savedAccounts = localStorage.getItem('accounts')
    if (savedAccounts) {
      try {
        const parsedAccounts = JSON.parse(savedAccounts)
        accounts.value = parsedAccounts
          .filter(checkAccountValidity)
          .map((account: Account) => ({
            ...account,
            errors: { login: false, password: false }
          }))
      } catch (error) {
        console.error('Ошибка при разборе данных аккаунтов:', error)
      }
    }
  }

  const storeAccounts = () => {
    const validAccounts = accounts.value
      .filter(checkAccountValidity)
      .map(({ errors, ...account }) => account)
    localStorage.setItem('accounts', JSON.stringify(validAccounts))
  }

  const createAccount = () => {
    accounts.value.push({
      id: Date.now().toString(),
      labels: [],
      type: AccountType.LOCAL,
      login: '',
      password: '',
      errors: { login: false, password: false }
    })
  }

  const deleteAccount = (id: string) => {
    accounts.value = accounts.value.filter(account => account.id !== id)
    storeAccounts()
  }

  const modifyAccount = (id: string, updates: Partial<Account>) => {
    const accountIndex = accounts.value.findIndex(acc => acc.id === id)
    if (accountIndex !== -1) {
      accounts.value[accountIndex] = { ...accounts.value[accountIndex], ...updates }
      verifyAccount(id)
    }
  }

  const verifyAccount = (id: string) => {
    const account = accounts.value.find(acc => acc.id === id)
    if (!account) return false

    const errors = {
      login: !account.login || account.login.length > 100,
      password: account.type === AccountType.LOCAL && (!account.password || account.password.length > 100)
    }

    Object.assign(account, { errors })
    storeAccounts()
    return !errors.login && !errors.password
  }

  fetchAccounts()

  return {
    accounts,
    createAccount,
    deleteAccount,
    modifyAccount,
    verifyAccount
  }
})