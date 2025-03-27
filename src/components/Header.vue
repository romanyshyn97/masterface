<template>
  <header class="bg-white flex flex-col md:flex-row pb-2 items-center justify-between px-16 backdrop-blur-md shadow-sm fixed w-full z-50 border-b border-soft-peach">
    <img src="@/assets/images/logo.png" alt="Logo" class="w-52 mr-2 pt-2">
    <div class="card flex justify-center">
      <Drawer v-model:visible="visible" position="right">
        <ul class="text-center font-bold text-lg">
          <li class="mb-4">
            <a href="#for-whom" @click="visible = false" class="hover:text-[#FF66C4]">Для кого</a>
          </li>
          <li class="mb-4">
            <a href="#course" @click="visible = false" class="hover:text-[#FF66C4]">Про курс</a>
          </li>
          <li class="mb-4">
            <a href="#students" @click="visible = false" class="hover:text-[#FF66C4]">Учні</a>
          </li>
          <li class="mb-4">
            <a href="#comparison" @click="visible = false" class="hover:text-[#FF66C4]">Результати</a>
          </li>
          <li class="mb-4">
            <a href="#reviews" @click="visible = false" class="hover:text-[#FF66C4]">Відгуки</a>
          </li>
        </ul>
        <template #footer>
          <div class="space-x-4 flex items-center justify-center">
            <a href="https://www.instagram.com/karina.master_face?igsh=MTFhY3N5cTB0cjRk" class="text-gray-600 hover:text-gray-900">
              <font-awesome-icon class="h-8 hover:text-[#FF66C4] transition-colors duration-300" :icon="['fab', 'instagram']" />
            </a>
          </div>
        </template>
      </Drawer>
      <Button variant="outlined" @click="visible = true" class="custom-hover-button">
        <i class="pi pi-bars custom-hover-icon" style="color:#FF66C4; font-size: 1.5rem"></i>
      </Button>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';

const items = ref([
  { label: 'Курси', url: '#services' },
  { label: 'Учні', url: '#gallery' },
  { label: 'Результати', url: '#results' },
  { label: 'Відгуки', url: '#reviews' },
]);

const visible = ref(false);

</script>

<style scoped>
.custom-hover-button{
  border-color:white !important;
}

/* Hover effect */
.custom-hover-button:hover {
  background-color: transparent !important; /* Change background on hover */
  border-color: #FF66C4 !important;
  /* Optional: change text color on hover */
}




</style>