import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { VitePluginFonts } from 'vite-plugin-fonts'

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '@': resolve('.'),
      },
    },
    server: {
      host: 'localhost',
      port: 5173,
    },
    plugins: [
      vue(),
      VitePluginFonts({
        google: {
          families: [
            {
              name: 'Poppins',
              styles: 'wght@400',
              defer: true,
            },
            {
              name: 'Poppins',
              styles: 'wght@600',
              defer: true,
            },
            {
              name: 'Poppins',
              styles: 'wght@500',
              defer: true,
            },
          ],
        },
      }),
    ],
  }
})
