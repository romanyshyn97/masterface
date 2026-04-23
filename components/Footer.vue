<template>
  <footer class="bg-pastel-peach pt-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap gap-8">
        <div class="flex-1 min-w-[300px]">
          <iframe
              src="https://maps.google.com/maps?q=beauty%20salon&t=&z=13&ie=UTF8&iwloc=&output=embed"
              class="w-full h-64 rounded-lg"
              loading="lazy">
          </iframe>
        </div>
        <div class="flex-1 flex flex-col items-center justify-center gap-4">
          <a v-for="(social, i) in socials" :key="i" :href="social.url" target="_blank" class="p-2 rounded-full bg-pastel-lavender hover:bg-pastel-mint">
            <i :class="social.icon" class="pi text-2xl text-white"></i>
          </a>
        </div>
      </div>
      <div class="text-center py-6 mt-8 border-t border-pastel-lavender">
        <p>© 2023 Glow Haven. All rights reserved</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socials = [
  { name: 'Instagram', url: '#', icon: 'pi pi-instagram' },
  { name: 'Telegram', url: '#', icon: 'pi pi-telegram' }
];
</script>