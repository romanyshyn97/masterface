// src/utils/loadImages.js
const importAll = (r) => {
    return r.keys().map(r);
};

const loadImages = () => {
    return importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));
};

export default loadImages;
