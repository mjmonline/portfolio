const paths = require('../config/paths');
const del = require('del');

module.exports = function () {
  return function () {
    del([paths.appBuild + '/*'], {
      dot: true
    });
  };
};
