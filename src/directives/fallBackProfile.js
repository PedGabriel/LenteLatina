export default {
  mounted(el) {
    const fallbackPath = `/noProfile.png`;

    el.onerror = () => {
      el.src = fallbackPath;
    };
  }
};
