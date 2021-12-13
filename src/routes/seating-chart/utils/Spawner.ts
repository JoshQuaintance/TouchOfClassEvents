import type { Texture } from '@pixi/core';
import type { InteractionEvent } from '@pixi/interaction';
import type { Sprite } from '@pixi/sprite';
import App from './App';
import { checkIfBeyondWorld, DraggingSprite } from './extras';

export default class Spawner {
    private _sprite: Sprite;
    private _name: string;

    private static spawners = [];

    constructor(src: Texture, name: string) {
        this._sprite = new App.PIXI.Sprite(src);
        this._name = name;

        this._sprite.buttonMode = true;
        this._sprite.cursor = 'pointer';
        this._sprite.interactive = true;

        Spawner.spawners.push(this);

        this._sprite.on('pointerdown', (e) => this.clicked(e));
    }

    private clicked(e) {
        App.app.renderer.plugins.interaction.setCursorMode('pointer');
        let { x, y } = e.data.getLocalPosition(App.viewport);

        this.spawnObject(x, y);
    }

    private spawnObject(xCoords: number, yCoords: number) {
        function onDragMove(e: InteractionEvent) {
            const sprite: DraggingSprite = e.currentTarget as DraggingSprite;
            const viewport = App.viewport;

            if (sprite.dragging) {
                let { x, y } = e.data.getLocalPosition(viewport);

                if (!checkIfBeyondWorld(sprite, x, y)) {
                    sprite.position.x += x - sprite.dragging.x;
                    sprite.position.y += y - sprite.dragging.y;
                    sprite.dragging = { x, y };
                }
            }
        }

        function onDragStart(e: InteractionEvent) {
            const sprite: DraggingSprite = e.currentTarget as DraggingSprite;
            const viewport = App.viewport;

            sprite.data = e.data;
            sprite.alpha = 0.5;
            let { x, y } = e.data.getLocalPosition(viewport);
            sprite.dragging = { x, y };
            clone.sprite.cursor = 'grabbing';
            viewport.drag({ pressDrag: false });
        }

        function onDragEnd(e: InteractionEvent) {
            const sprite: DraggingSprite = e.currentTarget as DraggingSprite;

            sprite.alpha = 1;
            sprite.dragging = null;
            sprite.data = null;
            clone.sprite.cursor = 'grab';
            App.viewport.drag();
        }

        const clone = new SpawnedObject(this.createClone());

        clone.sprite.anchor.set(0.5);
        clone.sprite.x = xCoords;
        clone.sprite.y = yCoords;

        App.viewport.addChild(clone.sprite);
        clone.sprite.interactive = true;
        clone.sprite.cursor = 'grab';

        clone.sprite.on('pointerdown', onDragStart);
        clone.sprite.on('pointermove', onDragMove);
        clone.sprite.on('pointerup', onDragEnd);
        clone.sprite.on('pointerupoutside', onDragEnd);

        return true;
    }

    private createClone(): Sprite {
        let clone = new App.PIXI.Sprite(this._sprite.texture);
        clone.scale = this._sprite.scale;

        return clone;
    }
}

class SpawnedObject {
    private _sprite: Sprite;
    private _objectName: string;

    constructor(sprite: Sprite) {
        this._sprite = sprite;
    }

    get name() {
        return this._objectName;
    }

    get sprite() {
        return this._sprite;
    }
}
