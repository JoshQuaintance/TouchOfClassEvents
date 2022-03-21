/**
 * Location: src/routes/seating-chart/seating-chart.ts
 * Description: Main execution process
 */
import '$utils/pixi-ssr-shim';
import * as PIXI from 'pixi.js';
import { Application, Graphics, TextStyle, Text } from 'pixi.js';
import { Viewport } from 'pixi-viewport';

import App from './utils/App';
import { percent } from '$utils/math';
import Container from './utils/Container';
import { SpawnedObject, Spawner } from './utils/Spawner';
import initEventListeners from './utils/initEventListeners';

export async function init() {
    return new Promise((resolve, reject) => {
        const app = new Application({
            backgroundColor: 0xfaf0f2,
            resizeTo: window,
            autoStart: false,
            antialias: true
        });

        /**
         * Viewport initialization
         */
        const viewport = new Viewport({
            screenWidth: app.view.width,
            screenHeight: percent(88, app.view.height),
            worldWidth: 9600,
            worldHeight: 8600,
            passiveWheel: false,

            interaction: app.renderer.plugins.interaction
        });

        viewport.drag({}).pinch().wheel({}).decelerate();
        viewport.clampZoom({ minScale: 0.08, maxScale: 3 });
        viewport.clamp({
            underflow: 'center',
            top: -viewport.worldHeight * 0.016,
            left: -viewport.worldWidth * 0.016,
            bottom: viewport.worldHeight * 1.016,
            right: viewport.worldWidth * 1.016
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
        app.loader.baseUrl = '/images';
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

    const spawnerContainer = new Container();

    function createSpawner(name, renderFunction: Function) {
        // const spawnerTexture = App.resources[name].texture;
        const newSpawner = new Spawner(name, renderFunction);

        // newSpawner.sprite.x = viewport.center.x;
        // newSpawner.sprite.y = viewport.center.y;
        // newSpawner.sprite.alpha = 0.5;
        // newSpawner.sprite.anchor.set(0.5);
        // newSpawner.sprite.scale.set(percent(65, percent(12, window.innerHeight)) / newSpawner.sprite.height);

        return newSpawner;
    }


    function drawTable() {
        let table = new Graphics();

        table.beginFill(0xD1D1D1);

        // set the line style to have a width of 2 and set the color to red
        table.lineStyle(3, 0x111111, .7);

        let height = 73;

        // draw a rectangle
        table.drawRoundedRect(0, 0, 227, height, height / 10 + 10);
        table.endFill();


        table.position.x = viewport.center.x;
        table.position.y = viewport.center.y;

        table.pivot.x = percent(50, table.width);
        table.pivot.y = percent(50, table.height);

        return table;
    }

    // const seatSpawner = createSpawner('seat');
    const tableSpawner = createSpawner('table', drawTable);
    // const circularTableSpawner = createSpawner('circular_table');







    app.stage.addChild(spawnerContainer.it);

    initEventListeners();

    /*
        This is where data is imported
    */
    if (App.imported_data.length > 0) {
        for (const item of App.imported_data) {
            new SpawnedObject(item);
        }
    }
}


/*
var graphic = new PIXI.Graphics()
graphic.beginFill(0xFFFFFF, 0)
graphic.drawRect(0, 0, 1, 1)
graphic.endFill()
var mySpriteContainer = new PIXI.Sprite(graphic.generateTexture(false));
mySpriteContainer.anchor = new PIXI.Point(0.5, 0.5);

*/