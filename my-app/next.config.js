/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')
require('dotenv').config()

module.exports = {
  webpack: (config, { isServer }) => {
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
        systemvars: true
      })
    ]
    if (isServer) {
      return config
    }

    const isProduction = config.mode === 'production'
    if (!isProduction) {
      return config
    }
    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    )
    return config
  }
}

module.exports = {
  env: {
    TEST: process.env.TEST,
    NEXT_PUBLIC_TEST: process.env.STATIC_FILE_URL
  }
}

module.exports = {
  publicRuntimeConfig: {
    localeSubpaths: typeof process.env.LOCALE_SUBPATHS === 'string'
      ? process.env.LOCALE_SUBPATHS
      : 'none'
  }
}
