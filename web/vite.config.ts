import { defineConfig } from 'vitest/config'
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      exclude: [
        "**/node_modules/**",
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        "./**/*Type.{js,ts,jsx,tsx}",
        "./**/*d.{js,ts,jsx,tsx}",
        "./**/*.{css,scss}",
        "./**/icons/**",
        "./**/App.tsx",
        "./**/main.tsx",
        "./src/test-utils",
        "./**/vite-env.d.ts",
        "./**/index.ts",
        "./**/*.config.{js,ts}",
        "./**/setup-tests.{js,ts}",
        "**/*.test.{ts,tsx}",
        "./__mocks__/*.js",
        "./**/*.enum.{js,ts,jsx,tsx}"]
    },
    include: ['**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
