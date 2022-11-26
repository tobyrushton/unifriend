module.exports = {
    presets: [
      "next/babel",
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
      ['@babel/preset-react', {runtime: 'automatic'}]
    ],
  };