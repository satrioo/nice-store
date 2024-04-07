<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const useCart = useCartStore()
const totalPrice = computed(() => {
  return useCart.cart.reduce((total, item) => total + (item.price * item.qty), 0);
});

</script>

<template>
  <div class=" max-w-screen-xl mx-auto">
    <div class="mb-4 py-3 px-4 border border-gray-300 mt-5 rounded w-full">
      <div class="text-[24px] font-semibold">
        <h5 class="mb-5">Order Summary</h5>
      </div>
      <div class="summary">
        <ul class="list-group list-group-flush">
          <li v-for="item in useCart.cart" :key="item.id" class="list-group-item items-end px-0 pb-0">
            <div class=" flex flex-col">
              <span>{{ item.title }} </span>
              <span>${{ Math.round(item.price) }} x {{ item.qty }}</span>
            </div>
            <span>${{ Math.round(item.price * item.qty) }}</span>
          </li>
        </ul>
        <ul>
          <li class="list-group-item px-0 mb-3">
            <div>
              <strong>Total amount</strong>
            </div>
            <span>
              <strong>${{ Math.round(totalPrice) }}</strong>
            </span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>