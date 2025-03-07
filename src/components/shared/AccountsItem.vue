<template>
  <div class="flex gap-4 py-1">
    <AccountLabelInput :account="account" class="w-1/5" />
    <AccountTypeSelect :account="account" class="w-1/5" />
    <AccountLoginInput :account="account" class="flex-1" />
    <AccountPasswordInput :account="account" class="flex-1" />
    <DeleteButton :account="account" class="w-1/12" />
  </div>
</template>

<script setup lang="ts">
import DeleteButton from '@/components/shared/buttons/DeleteButton.vue'
import AccountLabelInput from '@/components/shared/inputs/AccountLabelInput.vue'
import AccountLoginInput from '@/components/shared/inputs/AccountLoginInput.vue'
import AccountPasswordInput from '@/components/shared/inputs/AccountPasswordInput.vue'
import AccountTypeSelect from '@/components/shared/inputs/AccountTypeSelect.vue'

import type { Account } from '@/types'

const { account } = defineProps<{
  account: Account
}>()
</script>
