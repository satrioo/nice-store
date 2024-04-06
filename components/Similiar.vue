<script setup lang="ts">
const props = defineProps(['items'])
</script>

<template>
  <div class="py-4 my-4">
    <h2 class=" font-medium text-[18px] mb-8">You may also Like</h2>
    <div class="flex">

      <Vue3Marquee pauseOnHover="true" pauseOnClick="true" duration="80">
        <div v-for="item in items" :key="item.id" class="card mx-4 text-center border p-6">
          <figure class=" h-[400px] w-[200px] overflow-hidden flex items-center">
            <img class="card-img-top p-3 object-fill" :src="item.image" alt="Card" height={300} width={300} />
          </figure>
          <div class="mt-6">
            <h5 class=" text-[16px] text-gray-500 font-semibold">
              {{ item.title.substring(0, 20) }}...
            </h5>
          </div>
          <div class="card-body">
            <button type="button"
              class="py-2.5 px-5 mt-4 flex-1 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add
              to Cart</button>
          </div>
        </div>
      </Vue3Marquee>


    </div>
  </div>
</template>