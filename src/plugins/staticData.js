
export default {
  install(Vue) {
    const strategies = Vue.config.optionMergeStrategies;

    strategies.staticData = (toVal, fromVal) => {
      const values = [toVal, fromVal];
      return values.reduce((acc, el) => {
        const value = Array.isArray(el) ? el : [el];
        return [...acc, ...value];
      }, []).filter((el) => typeof el === 'function');
    };

    Vue.mixin({
      created() {
        const { staticData } = this.$options;
        if (Array.isArray(staticData)) {
          const obj = staticData.reduce((acc, fn) => ({ ...acc, ...fn(this) }), {});
          Object.assign(this, obj);
        }
      },
    });
  },
};
