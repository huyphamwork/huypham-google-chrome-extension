const path = require('path');
const nodeExternals = require('webpack-node-externals');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const outputDir = path.resolve(__dirname, `dist`);
  console.log(outputDir);
  return {
    mode: 'production',
    target: 'web',
    entry: {
      popup: './src/scripts/popup.ts',
      'service-worker': './src/scripts/service-worker.ts',
      content: './src/scripts/content.ts',
    },
    watchOptions: {
      ignored: ['./dist/**/*'],
    },
    output: {
      path: outputDir,
      filename: 'scripts/[name].js',
      clean: true,
    },
    optimization: {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        // `...`,
        new CssMinimizerPlugin(),
      ],
    },
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    plugins: [
      new MiniCssExtractPlugin({ filename: 'style.css' }),
      new CopyPlugin({
        patterns: [
          { from: './src/manifest.json', to: '.' },
          { from: './src/popup.html', to: '.' },
          { from: './src/icon.png', to: '.' },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                url: {
                  // skip any data URLs of type image/svg+xml
                  filter: (url) => !url.startsWith('data:image/svg+xml'),
                },
              },
            },
            // Resolve issue for relative path in scss
            'resolve-url-loader',
            // Compiles Sass to CSS
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true, // <-- Important for resolve-url-loader working
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.(jp(e)?g|png|gif|svg|webp)$/,
          type: 'asset/resource',
          generator: {
            filename: 'style/[hash][ext][query]',
          },
        },
      ],
    },
  };
};
