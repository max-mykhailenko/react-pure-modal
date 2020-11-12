module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { chrome: 70 },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
