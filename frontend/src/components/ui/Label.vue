<script setup lang="ts">
import { cn } from "@/lib/cn";
import { ClassValue } from "clsx";

type Props = {
  text?: string;
};

defineProps<Props>();
</script>

<template>
  <label :class="cn('group grid grid-cols-[auto] grid-flow-row auto-rows-min gap-2', $attrs.class as ClassValue)">
    <div v-if="text != null" class="text-sm font-semibold leading-none dark:text-neutral-200">
      <span>{{ text }}</span>
      <span class="hidden text-lg leading-none text-red-400 group-has-[:required]:inline">*</span>
    </div>
    <slot></slot>
  </label>
</template>
