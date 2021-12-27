/**
 * Location: src/routes/seating-chart/utils/initEventListeners.ts
 * Description: Initializes all the event listeners attached to the app events
 */
import type { InteractionEvent } from 'pixi.js';
import App from './App';
import { checkIfBeyondWorld } from './extras';
import type { DraggingSprite } from './extras';
import Spawner from './Spawner';
import { dialogUsed, openModal } from './localStores';

export default function initEventListeners() {
    const app = App.app;
    const viewport = App.viewport;

    App.event_medium.addEventListener('app-mode-changed', (e: CustomEventInit) => {
        const mode = e.detail.mode;

        console.log(mode);

        if (mode == 'view') {
            viewport.drag({});
            let buildingObject = Spawner.getSpawner(App.build_object + '-spawner');

            if (buildingObject) viewport.removeChild(buildingObject.sprite);
        }

        if (mode == 'build') {
            let buildingObject = Spawner.getSpawner(App.build_object + '-spawner');
            let previousObject = Spawner.getSpawner(App.previous_object + '-spawner');

            function highlighting(e: InteractionEvent) {
                const sprite: DraggingSprite = Spawner.getSpawner(App.build_object + '-spawner')
                    .sprite as DraggingSprite;
                const viewport = App.viewport;
                let { x, y } = e.data.getLocalPosition(viewport);
                if (sprite.dragging) {
                    if (!checkIfBeyondWorld(sprite, x, y)) {
                        sprite.position.x += x - sprite.dragging.x;
                        sprite.position.y += y - sprite.dragging.y;
                        sprite.dragging = { x, y };
                    }
                } else {
                    sprite.position.x = x;
                    sprite.position.y = y;
                }
            }

            viewport.on('pointermove', highlighting);
            if (previousObject) viewport.removeChild(previousObject.sprite);
            viewport.addChild(buildingObject.sprite);
            viewport.drag({ pressDrag: false });
        }
    });

    App.event_medium.addEventListener('options-add-label', (e: CustomEventInit) => {
        const spawnedObject = e.detail.additional.spawnedObject;

        dialogUsed.set('LabelChangedDialog');
        openModal.set(true);

        console.log(spawnedObject);
    });
}
