<script setup lang="ts">
import type { ICart } from '@/interfaces/cart'
import { useCartStore } from "@/stores/cart"

const router = useRouter()
const useCart = useCartStore()
const listItem = ref<ICart[]>([])
const listCategory = ref([])
const selectedCategory = ref('')
const activeMenu = ref('all')

async function fetchData() {
  await useMyFetch('products')
    .then((res) => {
      listItem.value = res.data.value as ICart[]
    }).catch((err) => {
      console.log(err)
    })
}

async function getAllCategory() {
  await useMyFetch('products/categories')
    .then((res) => {
      listCategory.value = ['all', ...res.data.value];
    }).catch((err) => {
      console.log(err)
    })
}

async function getByCategory(category: string) {
  activeMenu.value = category
  if (category === 'all') {
    fetchData()
  } else {
    await useMyFetch(`/products/category/${category}`)
      .then((res) => {
        listItem.value = res.data.value as ICart[]
      }).catch((err) => {
        console.log(err)
      })
  }
}

function goDetail(id: number) {
  router.push({ path: `/detail/${id}` })
}

fetchData()
getAllCategory()
</script>

<template>

  <div class="gallery">
    <div class="row justify-center">
      <h2 class="text-lg mb-4 text-[16px] text-center font-medium">
        Latest Products
      </h2>
      <hr />
    </div>

    <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">
      <button type="button" v-for="item in listCategory" :key="item" @click="getByCategory(item)"
        :class="activeMenu === item ? 'text-white border border-blue-600 bg-blue-700 dark:bg-white dark:!text-black' : ''"
        class="capitalize rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800">
        {{ item === 'all' ? ' All Categories' : item }}
      </button>
    </div>

    <div class="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2  grid-flow-row gap-7 mx-auto ">
      <div v-for="item in listItem" :key="item.id" class="w-full border rounded">
        <div class="card text-center h-100 px-4 py-6">
          <figure class="h-[400px] overflow-hidden flex items-center">
            <img class="card-img-top p-5 object-fill" :src="item.image" :alt="item.title">
          </figure>
          <div>
            <div className="card-body">
              <h5 className="card-title text-[16px] font-semibold">
                {{ item.title.substring(0, 25) }}...
              </h5>
              <p className="card-text text-[14px]">
                {{ item.description.substring(0, 90) }}...
              </p>
            </div>
            <ul className="list-group list-group-flush mt-4 font-semibold text-[15px]">
              $ {{ item.price }}
            </ul>

            <div class="mt-8">
              <button @click="goDetail(item.id)" type="button"
                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Detail
              </button>
              <button @click="useCart.addCart(item)" type="button"
                class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add
                to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>