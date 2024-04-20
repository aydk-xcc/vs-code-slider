import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: 'packages/index.ts',
      name: 'vs-code-slide',
      fileName: (format) => `vs-code-slider.${format}.js`,
    },
    rollupOptions: {
      // 将外部化依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量名
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin({topExecutionPriority: false}),
    VueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./packages', import.meta.url))
    }
  }
})
