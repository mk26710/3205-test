<script setup lang="ts">
import { cn } from "@/lib/cn";
import { ClassValue } from "clsx";
import { vMaska } from "maska/vue";

type Props = {
  error?: boolean;
  mask?: string;
};

const props = defineProps<Props>();

const modelValue = defineModel();
const unmaskedValue = defineModel("unmasked");

defineExpose({ unmaskedValue });
</script>

<template>
  <input
    v-model="modelValue"
    v-maska:unmaskedValue.unmasked="props.mask"
    :class="
      cn(
        'flex h-10 items-center rounded-md border px-2 transition-opacity duration-200 focus:outline-none focus:ring focus:ring-emerald-600 disabled:cursor-not-allowed disabled:opacity-60 data-[error=true]:border-red-400 data-[error=true]:ring-red-400 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300 placeholder:dark:text-neutral-600',
        $attrs.class as ClassValue,
      )
    "
    :data-error="props.error"
  />
</template>
