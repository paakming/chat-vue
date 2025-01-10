import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 5173,
        host: '0.0.0.0',
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@styles/custom-el-var.scss" ;`
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        }
    }
})
