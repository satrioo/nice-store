import type { ICart } from '@/interfaces/cart'

export const useCartStore = defineStore('cart', () => {
  const cookie = useCookie('userCart')
  const cart = ref<ICart[]>(cookie.value ? cookie.value : []) 
  const showCart = ref(false)

  function updateCookie() {
    cookie.value = cart.value
  }

  function toggleShowCart(){
    showCart.value = !showCart.value
  }
  
  function isExist(item: ICart){
    return cart.value.find((x) => x.id === item.id)
  }

  function addCart(item: ICart) {  
    if(isExist(item)) {
      cart.value =cart.value.map((x)=>x.id === item.id?{...x, qty: x.qty+1}:x)
    } else {
      cart.value.push({...item, qty: 1}) 
    }   
    useNuxtApp().$toast.success('Added to Cart');
    updateCookie()
  }

  function removeCart(item: ICart){
    if(isExist(item)?.qty === 1) {
      cart.value = cart.value.filter((x)=>x.id!==item.id)
      useNuxtApp().$toast.success('Item Removed');
    } else {
      cart.value = cart.value.map((x)=> x.id===item.id?{...x, qty:x.qty-1}:x)
    }
    updateCookie()
  }

  function removeItem(item: ICart) {
    cart.value = cart.value.filter((x)=>x.id!==item.id)
    useNuxtApp().$toast.success('Item Removed');
    updateCookie()
  }

  function reset() {
    cart.value = []
    useNuxtApp().$toast.success('Cart is Empty');
    updateCookie()
  }

  const totalQty = computed(() => {
    return cart.value.reduce((total, item) => total + item.qty, 0);
  });
  
  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.qty), 0);
  });

  return { cart, addCart, removeCart, showCart, toggleShowCart, removeItem, totalQty, totalPrice, reset }
})