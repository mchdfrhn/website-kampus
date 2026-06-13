import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Ensure a consistent encryption key for Server Actions between build and runtime
if (!process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY) {
  process.env.NEXT_SERVER_ACTIONS_ENCRYPTION_KEY = 'ciYNR/t1hjCQzmw9QS5scY/xKmMSy4Y0b2C1fjpiTqQ=';
}

const nextConfig: NextConfig = {
  // Required for Docker: bundles the server and its deps into
  // .next/standalone so the runner stage needs no node_modules.
  output: "standalone",
  poweredByHeader: false,
  generateBuildId: async () => {
    const buildId =
      process.env.NEXT_BUILD_ID ||
      process.env.ZEABUR_GIT_COMMIT_SHA ||
      process.env.ZEABUR_DEPLOYMENT_ID ||
      process.env.GITHUB_SHA ||
      process.env.VERCEL_GIT_COMMIT_SHA ||
      process.env.SOURCE_VERSION;

    if (buildId) {
      return buildId;
    }

    if (process.env.NODE_ENV === "production" || process.env.CI === "true") {
      throw new Error(
        "Missing production build id. Set NEXT_BUILD_ID, ZEABUR_GIT_COMMIT_SHA, ZEABUR_DEPLOYMENT_ID, GITHUB_SHA, VERCEL_GIT_COMMIT_SHA, or SOURCE_VERSION before running next build."
      );
    }

    return "development-build-id";
  },
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "website-kampus.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/media/**",
      },
    ],
  },
};

export default withPayload(nextConfig);
