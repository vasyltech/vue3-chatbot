import { fileURLToPath, URL } from 'node:url';
import Fs from 'fs';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

function svgLoader () {
  return {
    name: 'svg-loader-inline',
    enforce: 'pre',

    async load (id) {
      let response;

      if (id.includes('.svg?inline')) {
        try {
          const [path] = id.split('?');
          const svg    = Fs.readFileSync(path, 'utf-8');
          response  = `export default "data:image/svg+xml;base64,${Buffer.from(svg, 'utf-8').toString('base64')}"`;
        } catch (ex) {
          console.log(`Failed to load ${id}`);
        }
      }

      return response;
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    cssInjectedByJsPlugin()
    // svgLoader({
    //   svgo: true,
    //   svgoConfig: {
    //     datauri: 'base64'
    //   }
    // })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
