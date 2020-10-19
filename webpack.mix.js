let mix = require('laravel-mix');

mix.setPublicPath("public");
mix.sass("./src/app.scss", "public/css");
