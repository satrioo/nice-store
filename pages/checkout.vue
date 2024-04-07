<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { loadScript } from '@paypal/paypal-js'

const useCart = useCartStore()

const { cartTotal } = defineProps({
  cartTotal: {
    type: Number,
    default: 0.01,
  }
})
const paid = ref(false)


onBeforeMount(function () {
  loadScript({ 'client-id': 'AUu-mTS00dbFyFw35a6jQ8XsexsayIj7o3xcHH0IQX-yXnrjCAstoyUYDSR6XGKIiCusMCuefYV3cNgj' }).then((paypal) => {
    paypal
      .Buttons({
        createOrder: createOrder,
      })
      .render('#paypal-button-container')
  })
})

function createOrder(data, actions) {
  return actions.order.create({
    purchase_units: [
      {
        amount: {
          value: useCart.totalPrice,
        },
      },
    ],
  })
}

function onApprove(data, actions) {
  console.log('Order approved...')
  return actions.order.capture().then(() => {
    paid.value = true
    console.log('Order complete!')
  })
}
</script>

<template>
  <div class=" max-w-[768px] mx-auto">
    <div class="mb-4 py-3 px-4 border border-gray-300 mt-5 rounded w-full">
      <div class="text-[24px] font-semibold">
        <h5 class="mb-5">Order Summary</h5>
      </div>
      <div class="summary">
        <ul class="list-group list-group-flush">
          <li v-for="item in useCart.cart" :key="item.id" class="list-group-item items-end px-0 pb-0">
            <div class=" flex flex-col">
              <span>{{ item.title }} </span>
              <span>${{ item.price }} x {{ item.qty }}</span>
            </div>
            <span>${{ item.price * item.qty }}</span>
          </li>
        </ul>
        <ul>
          <li class="list-group-item px-0 mb-3">
            <div>
              <strong>Total amount</strong>
            </div>
            <span>
              <strong>${{ useCart.totalPrice }}</strong>
            </span>
          </li>
        </ul>
      </div>
      <div class=" w-full text-center mt-8">
        <div v-if="!paid" id="paypal-button-container"></div>
        <div v-else id="confirmation">Order complete!</div>
      </div>
    </div>
  </div>
</template>