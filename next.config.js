const path = require('path');

module.exports = {
  experimental: {
    forceSwcTransformations: true,
  },

  webpack: (config, { isServer }) => {
    // Add custom loader rules here if necessary
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel']
        }
      }
    });

    return config;
  }
};