import { Viewport } from 'pixi-viewport';
import '$utils/pixi-ssr-shim';
import { Application, DisplayObject, Graphics, Sprite } from 'pixi.js';
import App from './App';
import { percent } from '$utils/math';

export async function init() {
    return new Promise((resolve, reject) => {
        const app = new Application({
            backgroundColor: 0xfaf0f2,
            resizeTo: window,
            autoStart: false
        });

        /**
         * Viewport initialization
         */
        const viewport = new Viewport({
            screenWidth: app.view.width,
            screenHeight: percent(88, app.view.height),
            worldWidth: app.view.width * 3 + 3000,
            worldHeight: app.view.width * 3,
            passiveWheel: false,

            interaction: app.renderer.plugins.interaction
        });

        viewport.drag({}).pinch().wheel({}).decelerate();
        // viewport.clampZoom({ minScale: 0.15, maxScale: 3 });
        // viewport.clamp({
        //     underflow: 'center',
        //     top: -viewport.worldHeight * 0.016,
        //     left: -viewport.worldWidth * 0.01,
        //     bottom: viewport.worldHeight * 1.016,
        //     right: viewport.worldWidth * 1.01
        // });

        // viewport.fit(false, viewport.screenWidth, viewport.screenHeight);
        // viewport.moveCenter(viewport.worldWidth / 2, viewport.worldHeight / 2);

        // app.stage.addChild(viewport);

        /**
         * Misc. Initializations
         */
        App.app = app;
        App.viewport = viewport;
        App.mode = 'view';

        /**
         * Preload Resources
         */
        app.loader.baseUrl = 'images';
        app.loader.add('rounded_seat', 'seat.svg');

        app.loader.onComplete.add(() => resolve(true));
        app.loader.onError.add(() => {
            alert('Error preloading resources');

            reject('Error preloading resources');
        });

        app.loader.load();

        App.resources = app.loader.resources;
    });
}

export async function run(el: HTMLDivElement): Promise<void> {
    try {
        await init();
    } catch (e: any) {
        console.error(e);
    }

    const app = App.app;
    const viewport = App.viewport;

    el.appendChild(app.view);
    app.stage.addChild(viewport);

    app.start();

    let s = new Sprite(App.resources.rounded_seat.texture);
    s.anchor.set(0.5);
    s.x = app.view.width / 2;
    s.y = app.view.height / 2;
    viewport.drag({});
    // app.stage.addChild(s);
    viewport.addChild(s);
}
