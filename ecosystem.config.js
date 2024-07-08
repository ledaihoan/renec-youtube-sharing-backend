module.exports = {
  apps: [
    {
      name: 'renec-yt-sharing-backend',
      script: './dist/main.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
