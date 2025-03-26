<template>
  <section id="gallery" class="py-16 px-4 bg-sage-green">
    <h2 class="text-3xl text-center mb-8 text-gray-800">Treatment Gallery</h2>
    <Galleria
        :value="images"
        :responsiveOptions="responsiveOptions"
        :numVisible="5"
        containerClass="max-w-6xl mx-auto"
        :circular="true"
    >
      <template #item="slotProps">
        <img
            :src="slotProps.item.url"
            :alt="slotProps.item.alt"
            class="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </template>
      <template #thumbnail="slotProps">
        <img
            :src="slotProps.item.thumbnail"
            :alt="slotProps.item.alt"
            class="w-20 h-20 object-cover rounded-lg cursor-pointer"
        />
      </template>
    </Galleria>
  </section>
</template>

<script setup>
import {ref} from 'vue';

const images = ref([
  {
    url: 'https://placehold.co/800x600/F3E5F5/FFF?text=Treatment+1',
    thumbnail: 'https://placehold.co/200x150/F3E5F5/FFF?text=Thumb+1',
    alt: 'Facial treatment process'
  },
  {
    url: 'https://placehold.co/800x600/F3E5F5/FFF?text=Treatment+1',
    thumbnail: 'https://placehold.co/200x150/F3E5F5/FFF?text=Thumb+1',
    alt: 'Facial treatment process'
  },{
    url: 'https://placehold.co/800x600/F3E5F5/FFF?text=Treatment+1',
    thumbnail: 'https://placehold.co/200x150/F3E5F5/FFF?text=Thumb+1',
    alt: 'Facial treatment process'
  },
  {
    url: 'https://placehold.co/800x600/F3E5F5/FFF?text=Treatment+1',
    thumbnail: 'https://placehold.co/200x150/F3E5F5/FFF?text=Thumb+1',
    alt: 'Facial treatment process'
  },
  {
    url: 'https://placehold.co/800x600/F3E5F5/FFF?text=Treatment+1',
    thumbnail: 'https://placehold.co/200x150/F3E5F5/FFF?text=Thumb+1',
    alt: 'Facial treatment process'
  },
]);

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 4
  },
  {
    breakpoint: '768px',
    numVisible: 3
  },
  {
    breakpoint: '480px',
    numVisible: 2
  }
]);
</script>