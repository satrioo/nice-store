import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, { 
    theme: "auto",
    type: 'success',
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    transition: "flip",
    dangerouslyHTMLString: true
  });

  return {
    provide: { toast },
  };
});