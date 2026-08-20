import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  /* New PPR cache components. https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents */
  cacheComponents: true,
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
