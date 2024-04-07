<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const useCart = useCartStore()
const router = useRouter()
</script>

<template>
  <div :class="useCart.showCart ? '' : 'translate-x-full'"
    class="fixed top-0 right-0 z-40 h-screen p-4 shadow-lg px-4 py-4 overflow-y-auto transition-transform bg-white w-96 dark:bg-gray-800 flex flex-col"
    tabindex="-1" aria-labelledby="drawer-right-label">
    <h5 id="drawer-right-label"
      class="inline-flex text-[18px] items-center mb-4 font-semibold text-gray-500 dark:text-gray-400">
      Cart List 
    </h5>

    <button @click="useCart.toggleShowCart" type="button" data-drawer-hide="drawer-right-example"
      aria-controls="drawer-right-example"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
      <MdiIcon icon="mdiClose" class="!w-8 !h-8" />
      <span class="sr-only">Close menu</span>
    </button>

    <div class="flex-1 overflow-y-auto ">
      <p v-if="useCart.cart.length === 0" class=" w-full flex justify-center pt-10"> Cart is Empty </p>
      <ul v-else class="cart">
        <li class="cart-list" v-for="item in useCart.cart" :key="item.id">
          <div class="cart-image">
            <img :src="item.image" />
          </div>
          <div>
            <p class="cart-title"> {{ item.title }} </p>
            <p class="text-[18px] font-semibold"> <span> ${{ item.price }} </span> x {{ item.qty }} </p>

            <form class="mx-auto mt-2 flex gap-x-4">
              <div class="relative flex items-center max-w-[8rem]">
                <button @click="useCart.removeCart(item)" type="button" id="decrement-button"
                  data-input-counter-decrement="quantity-input"
                  class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg class="w-2 h-2 text-gray-900 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 1h16" />
                  </svg>
                </button>

                <input type="text" data-input-counter aria-describedby="helper-text-explanation" :value="item.qty"
                  class="bg-gray-50 border-x-0 border-gray-300 h-10 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="999" />

                <button type="button" @click="useCart.addCart(item)" data-input-counter-increment="quantity-input"
                  class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-10 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                  <svg class="w-2 h-2 text-gray-900 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 1v16M1 9h16" />
                  </svg>
                </button>

              </div>
              <button type="button" @click="useCart.removeItem(item)"
                class="bg-gray-100 h-10 flex items-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 p-3 focus:ring-gray-100 dark:focus:ring-gray-700 rounded-lg focus:ring-2 focus:outline-none">
                <MdiIcon icon="mdiDelete" class="!h-4 !w-6" />
              </button>

            </form>
          </div>
        </li>
      </ul>
    </div>

    <div class="card-body cart-amount">
      <ul class="list-group gap-y-3">
        <li class=" flex justify-between items-center border-0 px-0">
          <span>Total Products </span>
          <span>{{ useCart.totalQty }}</span>
        </li>
        <li class="flex justify-between items-center border-0 px-0 mb-3">
          <div>
            <strong>Total amount</strong>
          </div>
          <span>
            <strong>${{ Math.round(useCart.totalPrice) }}</strong>
          </span>
        </li>
      </ul>

      <div class=" flex" v-if="useCart.cart.length > 0">
        <button @click="router.push({path: 'checkout'}) " type="button" class="text-white flex-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Checkout</button>
        <button @click="useCart.reset" type="button" class="py-2.5 px-5 flex-1 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">ResetCart</button>
      </div>
    </div>
  </div>

</template>