/**
 * Location: src/routes/seating-chart/utils/initEventListeners.ts
 * Description: Initializes all the event listeners attached to the app events
 */
import '$utils/pixi-ssr-shim';

import { Container, Graphics, graphicsUtils, InteractionEvent, Renderer, TextStyle } from 'pixi.js';
import App from './App';
import { checkIfBeyondWorld } from './extras';
import type { DraggingGraphics } from './extras';
import { Spawner, SpawnedObject } from './Spawner';
import { dialogUsed, hintText, openModal } from './localStores';
import { percent } from '$utils/math';

export default function initEventListeners() {
    const viewport = App.viewport;
    const shared = {};

    App.event_medium.addEventListener('app-mode-changed', (e: CustomEventInit) => {
        const mode = e.detail.mode;


        if (mode == 'options-save') {
            App.mode = 'view';

            App.save_seating_chart();
        }

        if (mode == 'view') {
            hintText.set('');
            viewport.drag({});
            const buildingObject = Spawner.getSpawner(App.build_object);

            if (shared['resizing']) {
                const { spawnedObject, resizer } = shared['resizing'];

                spawnedObject.graphic.removeChild(resizer);
            }

            if (buildingObject) viewport.removeChild(buildingObject.graphic);
        }

        if (mode == 'build') {
            const buildingObject = Spawner.getSpawner(App.build_object);
            const previousObject = Spawner.getSpawner(App.previous_object);

            viewport.on('pointermove', (e: InteractionEvent) => {
                const graphic: DraggingGraphics = Spawner.getSpawner(App.build_object).graphic as DraggingGraphics;
                const viewport = App.viewport;
                const { x, y } = e.data.getLocalPosition(viewport);

                if (graphic.dragging) {
                    if (!checkIfBeyondWorld(graphic, x, y)) return;

                    buildingObject.x += x - graphic.dragging.x;
                    buildingObject.y += y - graphic.dragging.y;
                    graphic.dragging = { x, y };

                } else {
                    buildingObject.x = x;
                    buildingObject.y = y;
                }

            })

            if (previousObject) viewport.removeChild(previousObject.graphic);
            viewport.addChild(buildingObject.graphic);
            viewport.drag({ pressDrag: false });
        }

        if (mode == 'options-resize') hintText.set('Select an object to resize');

        if (mode == 'options-delete') hintText.set('Select an object to delete');
    });

    App.event_medium.addEventListener('options-delete', (e: CustomEventInit) => {
        const spawnedObject: SpawnedObject = e.detail.additional.spawnedObject;

        // hintText.set('');
        dialogUsed.set('ConfirmDeletion');

        openModal.set(true);

        function handleDeletion(e: CustomEventInit) {
            App.new_app_event({
                event: 'delete-object',
                additional: {
                    sprite: spawnedObject.graphic,
                    coords: { x: spawnedObject.graphic.position.x, y: spawnedObject.graphic.position.y },
                    parent: spawnedObject.graphic.parent
                }
            });
            SpawnedObject.removeSpawnedObject(spawnedObject);
            spawnedObject.graphic.parent.removeChild(spawnedObject.graphic);

            App.event_medium.removeEventListener('deletion-confirmed', handleDeletion);

        }

        App.event_medium.addEventListener('deletion-confirmed', handleDeletion);
    });

    App.event_medium.addEventListener('options-add-label', (e: CustomEventInit) => {
        const spawnedObject: SpawnedObject = e.detail.additional.spawnedObject;

        dialogUsed.set('LabelChangeDialog');
        openModal.set(true);

        function handleLabelChange(e: CustomEventInit) {
            const newLabel: string = e.detail.additional.label;

            spawnedObject.setLabel(newLabel);

            // Remove the event listener so that this element doesn't change label when a different object is changing label
            App.event_medium.removeEventListener('label-change-input', handleLabelChange);
        }

        App.event_medium.addEventListener('label-change-input', handleLabelChange);
    });

    App.event_medium.addEventListener('options-resize', (e: CustomEventInit) => {
        const spawnedObject: SpawnedObject = e.detail.additional.spawnedObject;
        const objectSpawner: Spawner = Spawner.getSpawner(spawnedObject.objectName);
        const { x, y } = spawnedObject.graphic.getLocalBounds();

        App.mode = 'options-resizing';
        viewport.drag({ pressDrag: false });
        hintText.set('');

        const resizer = new Graphics() as DraggingGraphics;

        const resizerWidth = percent(10, spawnedObject.graphic.width);

        resizer
            .beginFill(0xdea3f8)
            .drawRect(Math.abs(x) - resizerWidth, Math.abs(y) - resizerWidth, resizerWidth, resizerWidth)
            .endFill();


        resizer.pivot.x = percent(50, resizer.width);
        resizer.pivot.y = percent(50, resizer.height);
        resizer.zIndex = 100;
        resizer.interactive = true;
        resizer.buttonMode = true;
        resizer.position.set(spawnedObject.graphic.width + percent(50, resizer.width), spawnedObject.graphic.height + percent(50, resizer.height));
        
        resizer.cursor = 'nwse-resize';

        spawnedObject.graphic.addChild(resizer);
        shared['resizing'] = {
            spawnedObject,
            resizer
        };

        let __graphic = spawnedObject.graphic as DraggingGraphics
        __graphic.origin = { width: __graphic.width, height: __graphic.height, x: __graphic.position.x, y: __graphic.position.y } as DraggingGraphics

        console.log(spawnedObject.graphic.width)

        resizer.on('pointerdown', dragStart);
        resizer.on('pointermove', dragMove);
        resizer.on('pointerup', dragEnd);
        resizer.on('pointerupoutside', dragEnd);

        function dragMove(e: InteractionEvent) {
            const graphic: DraggingGraphics = spawnedObject.graphic as DraggingGraphics;
            const viewport = App.viewport;



            if (graphic.dragging) {
                const { x, y } = e.data.getLocalPosition(viewport);
                // console.log(e.data.getLocalPosition(graphic))

                if (
                    graphic.origin.width + x - graphic.dragging.x > percent(35, objectSpawner.graphic.width) &&
                    graphic.origin.height + y - graphic.dragging.y > percent(35, objectSpawner.graphic.height) &&
                    !checkIfBeyondWorld(graphic, x, y)
                ) {
                    // console.log(graphic.origin)
                    let width = graphic.origin.width + x - graphic.dragging.x - 6;
                    let height = graphic.origin.height + y - graphic.dragging.y - 6;



                    graphic.scale.set(1, 1);
                    graphic.clear();
                    graphic.beginFill(0xD1D1D1);

                    graphic.lineStyle(3, 0x111111, .7);

                    graphic.drawRoundedRect(0, 0, width, height, Math.abs(height) / 10 + 10);
                    graphic.endFill();

                    graphic.updateTransform();
                    graphic.calculateBounds();

                    // TODO: Find a way to make sure the text is inside the container
                    spawnedObject.setLabel(spawnedObject.labelText, new TextStyle({
                        align: 'center',
                        wordWrap: true,
                        wordWrapWidth: width,
                        fontSize: `${percent(9, width)}px`
                    }))

                    graphic.origin.width += x - graphic.dragging.x;
                    graphic.origin.height += y - graphic.dragging.y;

                    resizer.position.set(graphic.origin.width + x - graphic.dragging.x, graphic.origin.height + y - graphic.dragging.y)

                    spawnedObject.dimensions.set(width, height)

                    graphic.dragging = { x, y };


                } else {
                    // eslint-disable no-self-assign
                    graphic.width = graphic.width;
                    // eslint-disable no-self-assign
                    graphic.height = graphic.height;
                    graphic.dragging = { x, y };
                }
            }
        }

        function dragEnd(e: InteractionEvent) {
            const graphic: DraggingGraphics = spawnedObject.graphic as DraggingGraphics;

            graphic.dragging = null;
            graphic.data = null;
            if (App.mode != 'build') App.viewport.drag();

        }


        function dragStart(e: InteractionEvent) {
            const graphic: DraggingGraphics = spawnedObject.graphic as DraggingGraphics;
            const viewport = App.viewport;

            graphic.data = e.data;
            graphic.alpha = 0.5;
            const { x, y } = e.data.getLocalPosition(viewport);
            graphic.dragging = { x, y };
            viewport.drag({ pressDrag: false });
        }

    });
}
