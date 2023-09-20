import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'packages/index.ts'),
        // 组件库名字
        name: 'chain-graph',
        fileName: () => `index.js`,
        // 输出格式
        formats: ['es'],
      },
      outDir: resolve(__dirname, 'lib'),
      emptyOutDir: false,
      rollupOptions: {
        //忽略打包vue文件
        external: ['@antv/g6'],
      },
    },

    plugins: [Vue()],
  }
})
