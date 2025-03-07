<template>
  <div class="relative" v-if="account.type === AccountType.LOCAL">
    <Input
      v-model="account.password"
      :type="showPassword ? 'text' : 'password'"
      @blur="handlePasswordBlur"
      :class="{ 'border-red-500': account.errors.password }"
      maxlength="100"
      placeholder="Значение"
      class="pr-10"
    />
    <Button
      variant="ghost"
      size="icon"
      class="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
      @click="togglePasswordVisibility"
    >
      <EyeOffIcon v-if="!showPassword" class="h-5 w-5" />
      <EyeIcon v-else class="h-5 w-5" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useCredentialStore } from '@/stores/credential'
import { AccountType } from '@/types'
import type { Account } from '@/types'

const { account } = defineProps<{
  account: Account
}>()

const store = useCredentialStore()

const showPassword = ref(false)

const handlePasswordBlur = () => {
  store.modifyAccount(account.id, { password: account.password })
  store.verifyAccount(account.id)
}

const togglePasswordVisibility = () => (showPassword.value = !showPassword.value)
</script>
