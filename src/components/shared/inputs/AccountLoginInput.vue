<template>
  <div>
    <Input
      v-model="account.login"
      @blur="handleLoginBlur"
      :class="{ 'border-red-500': account.errors.login }"
      maxlength="100"
      placeholder="Значение"
    />
  </div>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'

import { useCredentialStore } from '@/stores/credential'
import type { Account } from '@/types'

const { account } = defineProps<{
  account: Account
}>()

const store = useCredentialStore()

const handleLoginBlur = () => {
  store.modifyAccount(account.id, { login: account.login })
  store.verifyAccount(account.id)
}
</script>
