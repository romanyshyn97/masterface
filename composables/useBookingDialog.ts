import { ref } from 'vue'

const visible = ref(false)

export const useBookingDialog = () => ({
  visible,
  open: () => { visible.value = true },
  close: () => { visible.value = false },
})
