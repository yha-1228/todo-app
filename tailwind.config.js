// TODO: line-heightの既定値を1.7に変更する

module.exports = {
  purge: ['./src/**/*.js'],
  theme: {
    lineHeight: {
      normal: 1.65,
    },
    extend: {
      colors: {
        'apple-default-blue': 'rgb(0, 122, 255)'
      },
    },
  },
  variants: {},
  plugins: [],
};
