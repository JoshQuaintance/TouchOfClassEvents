/**
 * Location: src/routes/seating-chart/utils/Spawner.ts
 * Description: A Spawner class that will be able to spawn objects
 */
import type { DraggingSprite } from './extras';
import '$utils/pixi-ssr-shim';

import { Sprite, InteractionEvent, Texture, Text, TextStyle } from 'pixi.js';
import App from './App';
import { checkIfBeyondWorld } from './extras';
import type { Viewport } from 'pixi-viewport';
import type { SpawnedObjectData } from '$utils/types';

export default class Spawner {
    private _sprite: Sprite;
    private _name: string;
    private _textureSrc: string;

    private static spawners = {};

    constructor(src: Texture, name: string) {
        this._textureSrc = src.textureCacheIds[0];
        this._sprite = new Sprite(src);
        this._name = name;

        this._sprite.buttonMode = true;
        this._sprite.cursor = 'pointer';
        this._sprite.interactive = true;

        Spawner.spawners[name] = this;

        this._sprite.on('pointerdown', (e) => this.clicked(e));
    }

    private clicked(e: { data: { getLocalPosition: (arg0: Viewport) => { x: any; y: any } } }) {
        App.app.renderer.plugins.interaction.setCursorMode('pointer');
        let { x, y } = e.data.getLocalPosition(App.viewport);

        if (!checkIfBeyondWorld(null, x, y)) this.spawnObject(x, y);
    }

    private spawnObject(xCoords: number, yCoords: number) {
        const clone = new SpawnedObject(this.createClone(), {
            parentType: this._name
        });

        clone.sprite.anchor.set(0.5);
        clone.sprite.x = xCoords;
        clone.sprite.y = yCoords;

        App.viewport.addChild(clone.sprite);

        SpawnedObject.addSpawnedObject(clone);

        if (App.editMode) clone.addPointerEvents();

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
        const clone = new Sprite(this._sprite.texture);
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
    parentType: string;
    label?: string;
}

export class SpawnedObject {
    private _sprite: Sprite;
    private _labelText: string;
    private _label: Text | null;
    private _isSeat: boolean;
    private _isTable: boolean;
    private _parentType: string;
    private _canHoldAmount: number;
    private _canHoldType: string;
    private static _spawnedObjectsStore = [];

    constructor(data: Sprite | SpawnedObjectData, options?: SpawnedObjectOptions) {
        if (data instanceof Sprite) {
            const { label, parentType } = options;
            this._sprite = data;
            this._isSeat = false;
            this._isTable = false;
            this._parentType = parentType;
            this._labelText = label || '';
        }

        if ((data as SpawnedObjectData).discriminator === 'spawned-object-data') {
            SpawnedObject.addSpawnedObject(this);

            const { label, isSeat, isTable, width, height, coords, holdAmount, canHoldType, texture } =
                data as SpawnedObjectData;

            this._sprite = new Sprite(App.resources[texture].texture);
            this.setLabel(label);
            this._isSeat = isSeat;
            this._isTable = isTable;
            this._sprite.width = width;
            this._sprite.height = height;
            this._sprite.x = coords.x;
            this._sprite.y = coords.y;
            this._canHoldAmount = holdAmount;
            this._canHoldType = canHoldType;

            this._sprite.anchor.set(0.5);

            console.log(App.editMode);
            if (App.editMode) this.addPointerEvents();

            App.viewport.addChild(this._sprite);
        }
    }

    addPointerEvents() {
        let _this = this;

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
                        spawnedObject: _this
                    }
                });

                return;
            }

            sprite.data = e.data;
            sprite.alpha = 0.5;
            let { x, y } = e.data.getLocalPosition(viewport);
            sprite.dragging = { x, y };
            _this.sprite.cursor = 'grabbing';
            viewport.drag({ pressDrag: false });
        }

        function onDragEnd(e: InteractionEvent) {
            const sprite: DraggingSprite = e.currentTarget as DraggingSprite;

            sprite.alpha = 1;
            sprite.dragging = null;
            sprite.data = null;
            _this.sprite.cursor = 'grab';
            if (App.mode != 'build') App.viewport.drag();
        }
        _this.sprite.interactive = true;
        _this.sprite.cursor = 'grab';

        _this.sprite.on('pointerdown', onDragStart);
        _this.sprite.on('pointermove', onDragMove);
        _this.sprite.on('pointerup', onDragEnd);
        _this.sprite.on('pointerupoutside', onDragEnd);
    }

    static get allSpawnedObjects() {
        return this._spawnedObjectsStore;
    }

    static addSpawnedObject(obj: SpawnedObject) {
        this._spawnedObjectsStore.push(obj);
    }

    static removeSpawnedObject(obj: SpawnedObject) {
        console.log(obj)
        let index = this._spawnedObjectsStore.indexOf(obj);
        console.log(index)
        this._spawnedObjectsStore.splice(index, 1);
        console.log(this._spawnedObjectsStore)
    }

    get spawnedObjectData(): SpawnedObjectData {
        return {
            discriminator: 'spawned-object-data',
            label: this._labelText,
            isSeat: this._isSeat,
            isTable: this._isTable,
            width: this._sprite.width,
            height: this._sprite.height,
            coords: { x: this._sprite.x, y: this._sprite.y },
            holdAmount: this._canHoldAmount,
            canHoldType: this._canHoldType,
            texture: this._sprite.texture.textureCacheIds[0]
        };
    }

    get isSeat() {
        return this._isSeat;
    }

    get isTable() {
        return this._isTable;
    }

    get parentType() {
        return this._parentType;
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
            wordWrap: true,
            wordWrapWidth: this._sprite.width + 400,
            fontSize: '150px'
        });

        const label = new Text(text, style || defaultStyle);

        label.anchor.set(0.5);

        this._label = label;
        this._sprite.addChild(label);
    }

    clone() {
        console.error('NOT IMPLEMENTED');
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
