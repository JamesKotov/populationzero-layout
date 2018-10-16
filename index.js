'use strict';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/collapse';
import 'bootstrap-slider/dist/bootstrap-slider';

import './assets/css/styles.scss';

require.context(
  './src', // context folder
  true, // include subdirectories
  /.html/ // RegExp
);

import './assets/js/script.js';
