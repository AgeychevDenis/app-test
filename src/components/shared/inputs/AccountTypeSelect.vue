<template>
  <div>
    <Select :model-value="account.type" @update:model-value="handleTypeChange">
      <SelectTrigger class="w-full">
        <SelectValue placeholder="Тип" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem :value="AccountType.LDAP">LDAP</SelectItem>
        <SelectItem :value="AccountType.LOCAL">Локальная</SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useCredentialStore } from '@/stores/credential'
import type { Account } from '@/types'
import { AccountType } from '@/types'

const { account } = defineProps<{
  account: Account
}>()

const store = useCredentialStore()

const handleTypeChange = (value: AccountType) => {
  if (value !== account.type) {
    const updates: Partial<Account> = { type: value }
    if (value === AccountType.LDAP) updates.password = undefined

    store.modifyAccount(account.id, updates)
    store.verifyAccount(account.id)
  } else {
    return undefined
  }
}
</script>
