import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React Compiler: https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
  reactCompiler: true,
  // Enabling PPR & Cache Components: https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents
  cacheComponents: true,
  // Partial Prefetching: https://nextjs.org/docs/app/api-reference/config/next-config-js/partialPrefetching
  partialPrefetching: true,
  experimental: {
    useTypeScriptCli: true, // TypeScript 7.0 CLI for native speed
  },
};

export default nextConfig;
