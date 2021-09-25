import gulp from 'gulp'
import gutil from 'gulp-util'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import webpackConfig from './webpack.config'
import del from 'del'
import fileInclude from 'gulp-file-include'
import postcss from 'gulp-postcss'
import replace from 'gulp-replace'
import htmlmin from 'gulp-htmlmin'
import sync from 'browser-sync'
import pimport from 'postcss-import'
import postcssMinMax from 'postcss-media-minmax'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const isProd = gutil.env.type === 'production'

const paths = {
  root: './dist',
    templates: {
      pages: 'src/views/pages/*.pug',
      src: 'src/views/**/*.pug',
      dest: 'dist/'
    }
}

export const html = () => {
  return gulp.src('src/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream())
}

export const styles = () => {
  return gulp.src('src/css/index.css')
    .pipe(postcss([
      pimport,
      postcssMinMax,
      autoprefixer,
      cssnano
    ]))
    .pipe(replace(/\.\.\//g, ''))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream())
}

export const scripts = () => {
  return gulp.src('./src/js/index.js')
    .pipe(webpackStream({ mode: isProd ? 'production' : 'development', ...webpackConfig }), webpack)
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream())
}

export const copy = () => {
  return gulp.src([
    'src/fonts/**/*',
    'src/images/**/*'
  ], {
    base: 'src'
  })
  .pipe(gulp.dest('dist'))
  .pipe(sync.stream({
    once: true
  }))
}

export const normalizePaths = () => {
  return gulp.src('dist/*.html')
    .pipe(replace(
      /(<link rel="stylesheet" href=")css\/(index.css">)/, '$1$2'
    ))
    .pipe(replace(
      /(<script src=")js\/(index.js">)/, '$1$2'
    ))
    .pipe(gulp.dest('dist'))
}

export const clean = () => {
  return del(paths.root)
}

export const server = () => {
  sync.init({
    ui: false,
    notify: false, 
    server: {
      baseDir: 'dist'
    }
  })
}

export const watch = () => {
  gulp.watch('src/**/*.html', gulp.series(html, normalizePaths)).on('change', sync.reload)
  gulp.watch('src/css/**/*.css', gulp.series(styles))
  gulp.watch('src/js/**/*.js', gulp.series(scripts))
  gulp.watch([
    'src/fonts/**/*',
    'src/images/**/*'
  ], gulp.series(copy))
}

export const build = gulp.series(
  clean,
  gulp.parallel(
    html,
    styles,
    scripts,
    copy
  ),
  normalizePaths
)

export default gulp.series(
  clean,
  gulp.parallel(
    html,
    styles,
    scripts,
    copy
  ),
  normalizePaths,
  gulp.parallel(
    watch,
    server
  )
)
