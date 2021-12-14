import fs from 'fs';

fs.readFile('./node_modules/@pixi/settings/dist/cjs/settings.js', (err, data) => {
    if (err) throw err;

    if (data.toString().split('\n')[0] == 'let self = globalThis;')
        return console.log('@pixi/settings already rewritten');
    fs.writeFile(
        './node_modules/@pixi/settings/dist/cjs/settings.js',
        'let self = globalThis;\n' + data,
        (err, file) => {
            if (err) throw err;
            console.log('Rewrite of @pixi/settings successful!');
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
