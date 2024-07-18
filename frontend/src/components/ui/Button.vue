<script setup lang="ts">
import { cn } from "@/lib/cn";
import { ClassValue } from "clsx";

type Props = {
  variant?: "default" | "primary";
};

defineProps<Props>();
</script>

<template>
  <button
    :class="
      cn(
        'flex h-9 items-center justify-center rounded-md px-2 duration-200',
        {
          'dark:bg-neutral-200 dark:text-neutral-800 dark:hover:bg-neutral-400':
            variant === 'default',
          'bg-emerald-500 text-white hover:bg-emerald-600': variant === 'primary',
        },
        $attrs.class as ClassValue,
      )
    "
  >
    <slot></slot>
  </button>
</template>
