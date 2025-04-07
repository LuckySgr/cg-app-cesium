import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { viteStaticCopy } from "vite-plugin-static-copy";
import vue from '@vitejs/plugin-vue'

const cgAppSource = "node_modules/cg-app/dist/cgAppStatic";
const cgAppBaseUrl = "cgAppStatic";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    CESIUM_BASE_URL: JSON.stringify(`/${cgAppBaseUrl}`),
  },
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        { src: `${cgAppSource}/ThirdParty`, dest: cgAppBaseUrl },
        { src: `${cgAppSource}/Workers`, dest: cgAppBaseUrl },
        { src: `${cgAppSource}/Assets`, dest: cgAppBaseUrl },
        { src: `${cgAppSource}/Widgets`, dest: cgAppBaseUrl },
      ],
    })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
