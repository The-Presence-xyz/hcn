const { src, dest } = require('gulp');
const plumber = require('gulp-plumber');

module.exports = function copyVideos() {
  return src('video/**/*') // Вибираємо всі файли з папки video
    .pipe(plumber()) // Запобігаємо помилкам
    .pipe(dest('build/video')); // Копіюємо у папку build/video
};
