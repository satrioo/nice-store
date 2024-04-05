import {ICart} from '@/interface/cart'

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
    if(isExist(item)) {
      cart.value = cart.value.map((x)=> x.id===item.id?{...x, qty:x.qty-1}:x)
    } else {
      cart.value = cart.value.filter((x)=>x.id!==item.id)
    }
  }

  return { cart, addCart, showCart, toggleShowCart }
})