/** @type {import('next').NextConfig} */
const nextConfig = {
    // Si estás usando App Router, asegúrate de activar appDir
    experimental: {
      appDir: true
    }, // Missing comma fixed here
    // aquí puedes agregar cualquier otra configuración que necesites
};

module.exports = nextConfig;
