const path = require('path'); // Node.js utility for handling and transforming file paths.
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin to generate HTML files for the Webpack bundles.

module.exports = {
  mode: 'development', // Sets the mode to 'development', which enables debugging and detailed error messages.
  entry: './src/main.ts', // Entry point of the app, where Webpack starts building the dependency graph.
  output: {
    filename: 'bundle.js', // Name of the output JavaScript file that will be created.
    path: path.resolve(__dirname, 'docs'), // Output directory path, using 'docs' for deployment.
    clean: true, // Clean the output directory ('docs') before each build.
  },
  resolve: {
    extensions: ['.ts', '.js'], // File extensions that Webpack will resolve automatically when importing modules.
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Matches all TypeScript files (files ending with .ts).
        use: 'ts-loader', // Uses 'ts-loader' to transpile TypeScript into JavaScript.
        exclude: /node_modules/, // Excludes files in the 'node_modules' directory from being processed by 'ts-loader'.
      },
      {
        test: /\.html$/, // Matches all HTML files.
        use: 'html-loader', // Uses 'html-loader' to process and bundle HTML files.
      },
      {
        test: /\.scss$/, // Matches all SCSS files.
        use: ['style-loader', 'css-loader', 'sass-loader'], // Processes SCSS into CSS, injects CSS into the DOM using 'style-loader'.
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to the HTML template that serves as the base HTML file.
      filename: 'index.html', // Name of the generated HTML file in the output directory.
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'), // Serves static files from the 'docs' directory.
    },
    port: 3000, // Port number on which the development server will run.
    open: true, // Automatically opens the app in the default browser when the server starts.
    historyApiFallback: true, // Enables support for HTML5 History API based routing (useful for single-page applications).
  },
  devtool: 'inline-source-map', // Enable inline source maps for better debugging
};