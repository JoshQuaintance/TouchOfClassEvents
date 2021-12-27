/**
 * Location: src/routes/seating-chart/seating-chart.ts
 * Description: Main execution process
 */
import '$utils/pixi-ssr-shim';
import type * as PIXI from 'pixi.js';
import { Application, Graphics } from 'pixi.js';

import { Viewport } from 'pixi-viewport';

import App from './utils/App';
import { percent } from '$utils/math';
import Container from './utils/Container';
import Spawner from './utils/Spawner';
import initEventListeners from './utils/initEventListeners';

export async function init() {
    return new Promise((resolve, reject) => {
        // const { Graphics } = App.PIXI;

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
            worldWidth: window.innerWidth * 6,
            worldHeight: window.innerHeight * 6,
            passiveWheel: false,

            interaction: app.renderer.plugins.interaction
        });

        viewport.drag({}).pinch().wheel({}).decelerate();
        viewport.clampZoom({ minScale: 0.15, maxScale: 3 });
        viewport.clamp({
            underflow: 'center',
            top: -viewport.worldHeight * 0.016,
            left: -viewport.worldWidth * 0.01,
            bottom: viewport.worldHeight * 1.016,
            right: viewport.worldWidth * 1.01
        });

        viewport.fit(false, viewport.screenWidth, viewport.screenHeight);
        viewport.moveCenter(viewport.worldWidth / 2, viewport.worldHeight / 2);

        app.stage.addChild(viewport);

        /**
         * Room Border
         */
        const border = viewport.addChild(new Graphics());
        border.lineStyle(20, 0xff0000).drawRect(0, 0, viewport.worldWidth, viewport.worldHeight);

        App.border = border;

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
        app.loader.add('seat', 'seat.svg');
        app.loader.add('table', 'table.svg');
        app.loader.add('circular_table', 'circular_table.svg');

        app.loader.onComplete.add(() => resolve(true));
        app.loader.onError.add(() => {
            alert('Error preloading resources');

            reject('Error preloading resources');
        });

        app.loader.load();

        App.resources = app.loader.resources;
    });
}

export async function run(el: HTMLDivElement, pixi: typeof PIXI): Promise<void> {
    // Put the dynamically imported PIXI into the class
    // App.PIXI = pixi;

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

    const spawnerContainer = new Container();

    function createSpawner(name) {
        const spawnerTexture = App.resources[name].texture;
        const newSpawner = new Spawner(spawnerTexture, `${name}-spawner`);

        newSpawner.sprite.x = viewport.center.x;
        newSpawner.sprite.y = viewport.center.y;
        newSpawner.sprite.alpha = 0.5;
        newSpawner.sprite.anchor.set(0.5);
        newSpawner.sprite.scale.set(percent(65, percent(12, window.innerHeight)) / newSpawner.sprite.height);

        return newSpawner;
    }

    const seatSpawner = createSpawner('seat');
    const tableSpawner = createSpawner('table');
    const circularTableSpawner = createSpawner('circular_table');

    app.stage.addChild(spawnerContainer.it);

    initEventListeners();
}
