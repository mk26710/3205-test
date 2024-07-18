<script setup lang="ts">
import { UserEntry } from "@/schemas/user-entry";

type Props = {
  email: UserEntry["email"];
  number: UserEntry["number"];
};

defineProps<Props>();
</script>

<template>
  <div
    class="flex min-h-[100px] min-w-[300px] flex-col items-center justify-center rounded-md border dark:border-neutral-700 dark:bg-neutral-900"
  >
    <span class="text-lg font-semibold dark:text-neutral-200">{{ email }}</span>
    <span class="text-sm dark:text-neutral-400">{{ number }}</span>
  </div>
</template>
