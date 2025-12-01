export default {
  mounted(el) {
    const fallbackPath = `/noImage.jpg`;

    el.onerror = () => {
      el.src = fallbackPath;
    };
  }
};
