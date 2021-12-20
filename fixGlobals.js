/**
 * This file is used to fix some modules that doesn't like SSR much
 * and we need to give it the references it needed. I have
 * changed the code in the main package repo, but it hasn't been merged yet
 * but when it is merged and served, we will not need the first two edits
 */
import fs from 'fs';

fs.readFile('./node_modules/@pixi/settings/dist/cjs/settings.js', (err, data) => {
    if (err) throw err;

    if (data.toString().split('\n')[0] == 'if (!self) self = globalThis.self;')
        return console.log('@pixi/settings already rewritten');
    fs.writeFile(
        './node_modules/@pixi/settings/dist/cjs/settings.js',
        'if (!self) self = globalThis.self;\n' + data,
        (err, file) => {
            if (err) throw err;
            console.log('Rewrite of @pixi/settings successful!');
        }
    );
});

fs.readFile('./node_modules/@pixi/polyfill/dist/cjs/polyfill.js', (err, data) => {
    if (err) throw err;

    if (data.toString().split('\n')[0] == 'let self = globalThis.self;')
        return console.log('viewport.js already rewritten');

    fs.writeFile(
        './node_modules/pixi-viewport/dist/cjs/viewport.js',
        'let let self = globalThis.self;\n' + data,
        (err, file) => {
            if (err) throw err;
            console.log('Rewrite of @pixi/polyfill successfully!');
        }
    );
});

fs.readFile('./node_modules/pixi-viewport/dist/cjs/viewport.js', (err, data) => {
    if (err) throw err;

    if (data.toString().split('\n')[0] == 'let window = globalThis;')
        return console.log('viewport.js already rewritten');

    fs.writeFile(
        './node_modules/pixi-viewport/dist/cjs/viewport.js',
        'let window = globalThis;\n' + data,
        (err, file) => {
            if (err) throw err;
            console.log('Rewrite viewport.js successfully!');
        }
    );
});
