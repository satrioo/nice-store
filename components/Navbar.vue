<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const useCart = useCartStore()
const colorMode = useColorMode()
const router = useRouter()
const mobileMenu = ref(false)
colorMode.preference.toString().includes('system') ? colorMode.preference = 'light' : ''
const isDarkmode = ref(colorMode.preference)

function goPage(url: string){
  router.push({path: url}) 
}

function toggleMobileMenu() {
  mobileMenu.value = !mobileMenu.value
}

const toggleDarkmode = () => {
  isDarkmode.value = colorMode.preference
  isDarkmode.value === 'light' ? colorMode.preference = 'dark' : colorMode.preference = 'light'
}
</script>

<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900 fixed w-full shadow-lg z-20">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a @click="goPage('/')" class="flex cursor-pointer items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Nice Store</span>
      </a>
      <button data-collapse-toggle="navbar-default" @click="toggleMobileMenu" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
          <svg v-if="!mobileMenu" class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
          <MdiIcon v-else icon="mdiClose" class="!w-8 !h-7" />
      </button>
      <div :class="mobileMenu ? 'h-[calc(100vh - 70px)]' : 'hidden'" class="w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <a @click="goPage('/')" 
            class="block py-2 px-3 cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
          </li>
          <li>
            <a @click="goPage('/contact')" 
            class="block py-2 px-3 cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact Us</a>
          </li>
          <li>
            <a @click="useCart.toggleShowCart"
              class="flex items-start gap-x-1 cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Cart <span>({{ useCart.totalQty }})</span>
              <MdiIcon icon="mdiCartOutline" class="!w-6 !h-6" />
            </a>
          </li>
          <li>
            <a @click="toggleDarkmode"
              class="block py-2 px-3 cursor-pointer text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <MdiIcon icon="mdiThemeLightDark" class="!w-6 !h-6" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>