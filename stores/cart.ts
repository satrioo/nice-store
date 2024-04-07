import type { ICart } from '@/interfaces/cart'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<ICart[]>([]) 
  const showCart = ref(false)

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
  }

  function removeCart(item: ICart){
    if(isExist(item)?.qty === 1) {
      cart.value = cart.value.filter((x)=>x.id!==item.id)
    } else {
      cart.value = cart.value.map((x)=> x.id===item.id?{...x, qty:x.qty-1}:x)
    }
  }

  function removeItem(item: ICart) {
    cart.value = cart.value.filter((x)=>x.id!==item.id)
  }

  function reset() {
    cart.value = []
  }

  const totalQty = computed(() => {
    return cart.value.reduce((total, item) => total + item.qty, 0);
  });
  
  const totalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.qty), 0);
  });

  return { cart, addCart, removeCart, showCart, toggleShowCart, removeItem, totalQty, totalPrice, reset }
})