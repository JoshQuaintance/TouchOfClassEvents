/**
 * Location: src/routes/seating-chart/utils/initEventListeners.ts
 * Description: Initializes all the event listeners attached to the app events
 */
import '$utils/pixi-ssr-shim';

import { Graphics, InteractionEvent } from 'pixi.js';
import App from './App';
import { checkIfBeyondWorld } from './extras';
import type { DraggingSprite, DraggingGraphics } from './extras';
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

            // if (shared['resizing']) {
            //     const { spawnedObject, resizer } = shared['resizing'];

            //     spawnedObject.graphic.removeChild(resizer);
            // }

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
        console.log(spawnedObject)
        const objectSpawner: Spawner = Spawner.getSpawner(spawnedObject.parentType);
        const { x, y } = spawnedObject.sprite.getLocalBounds();

        App.mode = 'options-resizing';
        viewport.drag({ pressDrag: false });
        hintText.set('');

        const resizer = new Graphics();

        const resizerWidth = 150;

        resizer
            .beginFill(0xdea3f8)
            .drawRect(Math.abs(x) - resizerWidth, Math.abs(y) - resizerWidth, resizerWidth, resizerWidth)
            .endFill();

        resizer.zIndex = 100;
        resizer.interactive = true;
        resizer.buttonMode = true;
        resizer.cursor = 'nwse-resize';

        spawnedObject.sprite.addChild(resizer);
        shared['resizing'] = {
            spawnedObject,
            resizer
        };

        resizer.on('pointerdown', dragStart);
        resizer.on('pointermove', dragMove);
        resizer.on('pointerup', dragEnd);

        function dragStart(e: InteractionEvent) {
            const sprite: DraggingSprite = spawnedObject.sprite as DraggingSprite;
            const viewport = App.viewport;

            sprite.data = e.data;
            sprite.alpha = 0.5;
            const { x, y } = e.data.getLocalPosition(viewport);
            sprite.dragging = { x, y };
            viewport.drag({ pressDrag: false });
        }

        function dragMove(e: InteractionEvent) {
            const sprite: DraggingSprite = spawnedObject.sprite as DraggingSprite;
            const viewport = App.viewport;

            if (sprite.dragging) {
                const { x, y } = e.data.getLocalPosition(viewport);

                if (
                    sprite.width + x - sprite.dragging.x > percent(35, objectSpawner.sprite.width) &&
                    sprite.height + y - sprite.dragging.y > percent(35, objectSpawner.sprite.height)
                ) {
                    sprite.width += x - sprite.dragging.x;
                    sprite.height += y - sprite.dragging.y;
                    sprite.dragging = { x, y };
                } else {
                    // eslint-disable no-self-assign
                    sprite.width = sprite.width;
                    // eslint-disable no-self-assign
                    sprite.height = sprite.height;
                    sprite.dragging = { x, y };
                }
            }
        }

        function dragEnd(e: InteractionEvent) {
            const sprite: DraggingSprite = spawnedObject.sprite as DraggingSprite;

            sprite.alpha = 1;
            sprite.dragging = null;
            sprite.data = null;
            if (App.mode != 'build') App.viewport.drag();
        }
    });
}
