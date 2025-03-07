<template>
  <div class="mx-auto mt-8 max-w-5xl p-4">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <div class="flex items-center gap-6">
          <h1 class="text-lg font-bold sm:text-xl md:text-2xl lg:text-3xl">Учетные записи</h1>
          <Button
            variant="outline"
            class="flex h-8 w-8 items-center justify-center text-2xl leading-none sm:h-10 sm:w-10"
            @click="store.createAccount()"
          >
            <Plus class="h-5 w-5" />
          </Button>
        </div>

        <InfoTooltip />
      </div>
    </div>

    <div v-if="store.accounts.length === 0" class="py-8 text-center">Учетные записи отсутствуют</div>

    <div v-else class="overflow-hidden">
      <ul class="flex gap-4 mb-2">
        <li class="w-1/5">Метка</li>
        <li class="w-1/5">Тип записи</li>
        <li class="flex-1">Логин</li>
        <li class="flex-1">Пароль</li>
        <li class="w-1/12"></li>
      </ul>

      <div v-auto-animate>
        <AccountItem v-for="account in store.accounts" :key="account.id" :account="account" class="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import AccountItem from '@/components/shared/AccountsItem.vue'
import InfoTooltip from '@/components/shared/InfoTooltip.vue'
import { Button } from '@/components/ui/button'

import { useCredentialStore } from '@/stores/credential'

const store = useCredentialStore()
</script>
