const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${process.env.MONITOR_API_URL || "http://127.0.0.1:5200"}/api/:path*` },
      { source: "/general-api/:path*", destination: "http://127.0.0.1:5100/:path*" },
    ];
  },
};

export default nextConfig;
