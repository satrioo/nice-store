<script setup lang="ts">
import type { ICart } from '@/interfaces/cart'
import { useCartStore } from "@/stores/cart";

const useCart = useCartStore()
const route = useRoute()

const detailItem = ref<ICart>({} as any)
const similiarItem = ref<ICart>({} as any)

async function getDetail() {
  await useMyFetch(`products/${route.params.id}`)
    .then((res) => {
      detailItem.value = res.data.value as ICart;
      getSimiliar()
    }).catch((err) => {
      console.log(err)
    })
}

async function getSimiliar() {
  await useMyFetch(`products/category/${detailItem.value.category}`)
    .then((res) => {
      similiarItem.value = res.data.value as ICart;
    }).catch((err) => {
      console.log(err)
    })
}

getDetail()
</script>

<template>
  <div class=" max-w-screen-xl mx-auto">
    <div class=" my-5 py-2">
      <div class="flex gap-6 items-center">
        <div class=" w-6/12 py-3">
          <img class="img-fluid mx-auto" :src="detailItem.image" :alt="detailItem.title" width="400" height="400" />
        </div>
        <div class=" w-6/12 py-5">
          <h4 class=" text-[32px] capitalize ">{{ detailItem.title }}</h4>
          <h1 class="display-5">{{ detailItem.category }}</h1>
          <p class="mt-2 flex gap-2 content-center items-center">
            {{ detailItem.rating ? detailItem.rating.rate : '0' }}
            <MdiIcon icon="mdiStar" class=" !w-6 !h-6" />
          </p>
          <h3 class="display-6 my-4 text-[22px] font-semibold text-gray-500">${{ detailItem.price }}</h3>
          <p class="lead">{{ detailItem.description }}</p>
        
          <button @click="useCart.addCart(detailItem)" type="button"
            class="text-white flex-1 mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add
            to Cart</button>
        </div>
      </div>
    </div>

    <Similiar :items="similiarItem" />
  </div> 
</template>