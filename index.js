'use strict';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';

import './src/assets/css/styles.scss';

require.context(
  './src', // context folder
  true, // include subdirectories
  /.html/ // RegExp
);

import './src/assets/js/script.js';
