<script setup lang="ts">
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import { ref } from "vue";
import Button from "@/components/ui/Button.vue";
import { FormSchema } from "@/schemas/form";
import Entry from "@/components/Entry.vue";
import { UserEntry } from "@/schemas/user-entry";
import { searchUsers } from "@/lib/api/search-users";

const entries = ref<UserEntry[]>();

const fetching = ref<boolean>();
const controller = ref(new AbortController());

const email = ref<string>();
const numberMasked = ref<string>();
const numberUnmasked = ref<string>();

type ValidationError = {
  email?: string[];
  number?: string[];
};

const validationError = ref<ValidationError>();


const abort = async () => {
  fetching.value = false;
  controller.value.abort("User request cancel");
  controller.value = new AbortController();
};

const submit = async () => {
  validationError.value = undefined;
  entries.value = undefined;

  const result = FormSchema.safeParse({
    email: email.value,
    number: numberUnmasked.value || null,
  });

  if (!result.success || result.error != null) {
    validationError.value = {
      email: result.error.format().email?._errors,
      number: result.error.format().number?._errors,
    };
    return;
  }

  try {
    fetching.value = true;
    entries.value = await searchUsers(controller.value, result.data.email, result.data.number);
  } catch (e) {
    console.error(e);
  } finally {
    fetching.value = false;
  }
};
</script>

<template>
  <main class="flex h-screen flex-col items-center p-4 dark:bg-neutral-800">
    <form
      @submit.prevent="submit"
      class="mt-[25vh] grid w-full max-w-80 grid-flow-row auto-rows-min grid-cols-1 gap-4"
    >
      <Label text="Email">
        <Input
          v-model="email"
          type="email"
          placeholder="someone@example.com"
          required
          :disabled="fetching === true"
          :error="validationError?.email != null"
        />
        <div v-if="validationError?.email != null">
          <span v-for="(err, idx) in validationError.email" :key="idx + err" class="text-red-400">
            {{ err }}
          </span>
        </div>
      </Label>
      <Label text="Number">
        <Input
          v-model="numberMasked"
          v-model:unmasked="numberUnmasked"
          mask="##-##-##"
          placeholder="00-00-00"
          :disabled="fetching === true"
          :error="validationError?.number != null"
        />
        <div v-if="validationError?.number != null">
          <span v-for="(err, idx) in validationError.number" :key="idx + err" class="text-red-400">
            {{ err }}
          </span>
        </div>
      </Label>
      <Button v-if="!fetching" variant="primary" type="submit">Submit</Button>
      <Button v-else variant="primary" value="button" @click="abort" class="animate-pulse">
        Cancel
      </Button>
    </form>

    <div class="mt-16 flex flex-col gap-4">
      <Entry
        v-for="(entry, i) in entries"
        :key="i + entry.email"
        :email="entry.email"
        :number="entry.number"
      />
    </div>
  </main>
</template>
