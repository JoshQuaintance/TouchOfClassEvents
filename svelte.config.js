import sveltePreprocess from 'svelte-preprocess';
import makeAttractionsImporter from 'attractions/importer.js';
import vercel from '@sveltejs/adapter-vercel';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: sveltePreprocess({
        postcss: true,
        scss: {
            importer: makeAttractionsImporter({
                themeFile: path.join(__dirname, 'static/css/theme.scss')
            }),
            includePaths: [path.join(__dirname, './static/css')]
        }
    }),

    kit: {
        // hydrate the <div id="svelte"> element in src/app.html
        target: '#svelte',
        adapter: vercel(),
        vite: {
            ssr: {
                noExternal: ['dayjs', 'pixi.js']
            },
            optimizeDeps: {
                exclude: ['bcrypt', 'pixi.js']
            },
            resolve: {
                alias: {
                    $lib: resolve('src/lib'),
                    $components: resolve('src/components'),
                    $utils: resolve('src/utils'),
                    '$auth-utils': resolve('src/routes/auth/auth-utils')
                }
            }
        }
    }
};

export default config;
