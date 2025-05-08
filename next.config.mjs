// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
    experimental: { appDir: true },
    async rewrites() {
      return [
        {
          source: "/register",
          destination: "/#register",
        },
      ];
    },
  };
  