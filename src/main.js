import './assets/css/index.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'
// import FontAwesomeIcon from './fontawesome';
//
// const app = createApp(App)
//
// app.use(router)
//
//
//
// app.mount('#app')

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue'
import Carousel from 'primevue/carousel'; // импортируем компонент Carousel
import {Galleria} from "primevue";
import FontAwesomeIcon from './fontawesome';
import Aura from '@primevue/themes/aura';
import Card from "primevue/card";
import Rating from "primevue/rating";
import Button from "primevue/button";

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});
app.component('Carousel', Carousel);
app.component('Galleria', Galleria);
app.component('Carousel', Carousel);
app.component('Card', Card);
app.component('Rating', Rating);
app.component('Button', Button);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

