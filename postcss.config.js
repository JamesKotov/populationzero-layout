module.exports = {
  plugins: {
    // include whatever plugins you want
    // but make sure you install these via yarn or npm!

    // add browserslist config to package.json (see below)
    autoprefixer: {
      browsers: [
        'last 1 major version',
        '>= 1%',
        'Chrome >= 45',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 9',
        'Safari >= 9',
        'Android >= 4.4',
        'Opera >= 30',
      ],
    },
  },
};
