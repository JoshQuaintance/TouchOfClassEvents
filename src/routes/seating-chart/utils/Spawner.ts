/**
 * Location: src/routes/seating-chart/utils/Spawner.ts
 * Description: A Spawner class that will be able to spawn objects
 */
import type { DraggingSprite } from './extras';

import { Sprite, InteractionEvent, Texture, Text, TextStyle } from 'pixi.js';
import App from './App';
import { checkIfBeyondWorld } from './extras';

export default class Spawner {
    private _sprite: Sprite;
    private _name: string;

    private static spawners = {};

    constructor(src: Texture, name: string) {
        this._sprite = new Sprite(src);
        this._name = name;

        this._sprite.buttonMode = true;
        this._sprite.cursor = 'pointer';
        this._sprite.interactive = true;

        Spawner.spawners[name] = this;

        this._sprite.on('pointerdown', (e) => this.clicked(e));
    }

    private clicked(e) {
        App.app.renderer.plugins.interaction.setCursorMode('pointer');
        let { x, y } = e.data.getLocalPosition(App.viewport);

        this.spawnObject(x, y);
    }

    private spawnObject(xCoords: number, yCoords: number) {
        const clone = new SpawnedObject(this.createClone(), {
            type: this._name
        });

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

            if (App.mode.startsWith('options-')) {
                App.new_app_event({
                    event: App.mode as `options-${string}`,
                    additional: {
                        spawnedObject: clone
                    }
                });

                return;
            }

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
            if (App.mode != 'build') App.viewport.drag();
        }

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

        App.new_app_event({
            event: 'spawn-object',
            additional: {
                sprite: clone.sprite,
                coords: { x: clone.sprite.x, y: clone.sprite.y },
                parent: clone.sprite.parent
            }
        });

        return true;
    }

    private createClone(): Sprite {
        let clone = new Sprite(this._sprite.texture);
        clone.scale = this._sprite.scale;

        return clone;
    }

    set x(val: number) {
        this._sprite.x = val;
    }

    set y(val: number) {
        this._sprite.y = val;
    }

    get sprite(): Sprite {
        return this._sprite;
    }

    static getSpawner(name: string): Spawner {
        return Spawner.spawners[name];
    }
}
interface SpawnedObjectOptions {
    type: string;
    label?: string;
}

class SpawnedObject {
    private _sprite: Sprite;
    private _labelText: string;
    private _label: Text | null;
    private _objectType: string;
    private _isSeat: boolean;
    private _isTable: boolean;
    private _canHoldAmount: number;
    private _canHoldType: string;

    constructor(sprite: Sprite, options?: SpawnedObjectOptions) {
        const { label, type } = options;

        this._sprite = sprite;
        this._objectType = type;
        this._isSeat = false;
        this._isTable = false;

        this._labelText = label || '';

        this.setLabel('Test123');
    }

    get isSeat() {
        return this._isSeat;
    }

    get isTable() {
        return this._isTable;
    }

    get type() {
        return this._objectType;
    }

    get label() {
        return this._label;
    }

    get sprite() {
        return this._sprite;
    }

    setLabel(text: string, style?: TextStyle) {
        if (this._label) {
            this._sprite.removeChild(this._label);
            this._label = null;
        }

        this._labelText = text;

        const defaultStyle = new TextStyle({
            align: 'center',
            fontSize: '150px'
        });

        const label = new Text(text, style || defaultStyle);

        label.anchor.set(0.5);

        this._label = label;
        this._sprite.addChild(label);
    }

    makeNormalObject() {
        this._isSeat = false;
        this._isTable = false;
    }

    makeSeat(capacity?: number) {
        if (this._isTable) return Error('This object is already a table. Make it a normal object first!');

        this._canHoldAmount = capacity || 1;
        this._canHoldType = 'person';
        this._isSeat = true;
    }

    makeTable(capacity?: number) {
        if (this._isSeat) return Error('This object is already a seat. Make it a normal object first!');

        this._canHoldAmount = capacity || 1;
        this._canHoldType = 'seat';
        this._isTable = true;
    }
}
