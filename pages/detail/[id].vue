<script setup lang="ts">
import type { ICart } from '@/interfaces/cart'
import { useCartStore } from "@/stores/cart";

const useCart = useCartStore()
const route = useRoute()

const detailItem = ref<ICart>({} as any)
const similiarItem = ref<ICart>({} as any)
const loadingDetail = ref(false)
const loadingSimiliar = ref(false)

async function getDetail() {
  loadingDetail.value = true
  await useMyFetch(`products/${route.params.id}`)
    .then((res) => {
      detailItem.value = res.data.value as ICart;
      loadingDetail.value = false
      getSimiliar()
    }).catch((err) => {
      console.log(err)
    })
}

async function getSimiliar() {
  loadingSimiliar.value = true
  await useMyFetch(`products/category/${detailItem.value.category}`)
    .then((res) => {
      similiarItem.value = res.data.value as ICart;
      loadingSimiliar.value = false
    }).catch((err) => {
      console.log(err)
    })
}

getDetail()
</script>

<template>
  <div class=" max-w-screen-xl mx-auto">
    <div class=" my-5 py-2">

      <div role="status"
        v-if="loadingDetail"
        class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse flex gap-6 items-center flex-col md:flex-row md:items-center relative z-0">
        <div class="flex items-center justify-center h-[600px] bg-gray-300 rounded w-[550px] max-w-[90%] dark:bg-gray-700">
          <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 18">
            <path
              d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div class="w-full max-w-[90%]">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
      </div>

      <div class="flex gap-6 items-center flex-col md:flex-row" v-else>
        <div class=" w-6/12 py-3">
          <img class="img-fluid mx-auto" :src="detailItem.image" :alt="detailItem.title" width="400" height="400" />
        </div>
        <div class=" w-10/12 md:w-6/12 py-5">
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

    <Similiar :items="similiarItem" :loading="loadingSimiliar" />
  </div>
</template>