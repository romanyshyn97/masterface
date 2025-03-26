import { library } from '@fortawesome/fontawesome-svg-core';
import { faInstagram, faTelegram, faViber } from '@fortawesome/free-brands-svg-icons'; // Brand icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add the icons you want to use to the library
library.add(faInstagram, faTelegram, faViber);

export default FontAwesomeIcon;
