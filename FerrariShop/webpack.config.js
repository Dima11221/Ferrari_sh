const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './newSrc/script/index.js',  // Точка входа (главный файл проекта)
    mode: 'development',
    output: {
        filename: 'bundle.js',  // Выходной файл для JS
        path: path.resolve(__dirname, 'dist'),  // Папка для выходных файлов
        assetModuleFilename: 'assets/[hash][ext]',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            sources: {
                                list: [
                                    {
                                        tag: "source",
                                        attribute: "src",
                                        type: "src"
                                    },
                                    {
                                        tag: "video",
                                        attribute: "src",
                                        type: "src",
                                    },
                                ]
                            }
                        }
                    }
                ]
            },

            {
                test: /\.(mp4|webm|ogg|avi)$/, // Регулярное выражение для видеофайлов
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]', // Настройка имени выходного файла
                        outputPath: 'videos', // Папка для сохранения видео в папке dist
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i, // Поддерживаемые форматы изображений
                type: 'asset/resource',               // Используем встроенный модуль для ресурсов
                generator: {                          // Настраиваем имя и путь для выходного файла
                    filename: 'images/[name].[hash][ext]' // Папка для сохранения изображений
                },
            },


            {
                test: /\.js$/,  // Транспиляция JS
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.scss$/,  // Преобразование Sass в CSS
                use: [
                    MiniCssExtractPlugin.loader,  // Используем плагин для извлечения CSS
                    'css-loader',                  // Обрабатываем CSS
                    'sass-loader',                 // Компилируем Sass в CSS
                ],
            },
            {
                test: /\.css$/,  // Преобразование обычного CSS
                use: [
                    MiniCssExtractPlugin.loader,  // Используем плагин для извлечения CSS
                    'css-loader',                 // Обрабатываем CSS
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './newSrc/index.html',  // Шаблон для генерации HTML
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',  // Название файла для сгенерированного CSS
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'newSrc/images'),
                    to:   path.resolve(__dirname, 'dist/images'),
                }
            ]
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),  // Минимизация CSS
        ],
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
