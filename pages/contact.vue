<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { email, required, helpers } from "@vuelidate/validators";

const form = reactive({
  email: '',
  subject: '',
  desc: ''
})

const validations = {
  email: {
    required: helpers.withMessage(
      "Enter your email address",
      required
    ),
    email: helpers.withMessage(
      "Incorrect email format",
      email
    )
  },
  subject: {
    required: helpers.withMessage(
      "Enter your subject",
      required
    )
  },
  desc: {
    required: helpers.withMessage(
      "Enter your description",
      required
    )
  },
};

const v$ = useVuelidate(validations, form);

async function submit() {
  const isValidForm: boolean = await v$.value.$validate()
  if (!isValidForm) return
  const mailtoLink = `mailto:${form.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.desc)}`;
  window.location.href = mailtoLink;
}
</script>

<template>
  <div class=" max-w-screen-xl block mx-auto px-8 contact">
    <h1 class=" text-gray-500 dark:text-white font-semibold text-[20px] text-center">
      Contact Us
    </h1>
    <form class="contact md:w-1/2 w-full mx-auto border mt-5 p-6 rounded">
      <div>
        <label>Email </label>
        <input id="email" type="text" placeholder="Enter email" v-model="form.email" @blur="v$.email.$touch" />
        <p class="error text-red-600 text-[14px]">{{ v$.email.$errors[0]?.$message.toString() }}</p>
      </div>
      <div>
        <label>Subject </label>
        <input id="subject" type="text" placeholder="Enter subject" v-model="form.subject" @blur="v$.subject.$touch" />
        <p class="error text-red-600 text-[14px]">{{ v$.subject.$errors[0]?.$message.toString() }}</p>
      </div>
      <div>
        <label>Description </label>
        <textarea id="description" placeholder="Enter description" v-model="form.desc" @blur="v$.desc.$touch" />
        <p class="error text-red-600 text-[14px]">{{ v$.desc.$errors[0]?.$message.toString() }}</p>
      </div>
      <button type="button" @click="submit" class=" bg-gray-500 text-white w-full p-2">
        Send Email
      </button>
    </form>
  </div>
</template>