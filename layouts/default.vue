<template>
  <Navbar />
  <Cart />
  <div class=" pt-24">
    <slot />
  </div>
</template>

<style lang="postcss">
body {
  @apply min-h-screen bg-white dark:bg-gray-800 dark:text-gray-200;
}
</style>