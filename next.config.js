const nextConfig = {
  // This is a crucial configuration to handle Node.js-specific modules in the client-side bundle.
  // We tell webpack to ignore 'node:buffer' and 'node:stream' when building for the browser.
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // Keep existing fallbacks
      buffer: false, // Prevents a 'buffer' module being included
      stream: false, // Prevents a 'stream' module being included
    };
    return config;
  },
};

module.exports = nextConfig;
