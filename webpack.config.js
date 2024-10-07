// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// // const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// module.exports = {
//   // ...其他配置...
//   plugins: [
//     // ...可能的其他插件...

//     new ForkTsCheckerWebpackPlugin({
//       // 在这里配置ForkTsCheckerWebpackPlugin的选项，例如memoryLimit
//       memoryLimit: 4096, // 例如，设置为4GB
//     }),
//   ],
// };



// const swcDefaultConfig =
//   require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory()
//     .swcOptions;

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'swc-loader',
//           options: swcDefaultConfig,
//         },
//       },
//     ],
//   },
// };
