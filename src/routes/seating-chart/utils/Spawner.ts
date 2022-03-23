/**
 * Location: src/routes/seating-chart/utils/Spawner.ts
 * Description: A Spawner class that will be able to spawn objects
 */
import type { DraggingGraphics } from './extras';
import '$utils/pixi-ssr-shim';

import { Graphics, InteractionEvent, TextStyle, Text } from 'pixi.js';
import type { Viewport } from 'pixi-viewport';
import type { SpawnedObjectData } from '$utils/types';

import App from './App';
import { checkIfBeyondWorld } from './extras';
import { percent } from '$utils/math';


export class Spawner {

    private _spawnerName: string;
    private _objectName: string;
    private _graphic: Graphics;

    private static spawners = {}

    constructor(name: string, renderFunction) {

        this._spawnerName = `${name}-spawner`;
        this._objectName = name;
        this._graphic = renderFunction();


        this._graphic.buttonMode = true;
        this._graphic.cursor = 'pointer';
        this._graphic.interactive = true;
        this._graphic.alpha = .7;

        Spawner.spawners[this._spawnerName] = this;


        // App.viewport.addChild(this._graphic)

        this._graphic.on('pointerdown', (e) => this.clicked(e));

    }


    private clicked(e: { data: { getLocalPosition: (arg0: Viewport) => { x: any; y: any } } }) {
        App.app.renderer.plugins.interaction.setCursorMode('pointer');
        const { x, y } = e.data.getLocalPosition(App.viewport);

        if (!checkIfBeyondWorld(null, x, y))
            this.spawnObject(x, y);
    }


    private spawnObject(xCoords: number, yCoords: number) {
        const clone = new SpawnedObject(this.createClone(), {
            parentType: this._spawnerName,
            objectName: this._objectName
        });

        clone.graphic.alpha = 1;
        clone.graphic.position.x = xCoords - percent(50, clone.graphic.width);
        clone.graphic.position.y = yCoords - percent(50, clone.graphic.height);
        App.viewport.addChild(clone.graphic);

        SpawnedObject.addSpawnedObject(clone);

        if (App.editMode) clone.addPointerEvents();

        App.new_app_event({
            event: 'spawn-object',
            additional: {
                sprite: clone.graphic,
                coords: { x: clone.graphic.position.x, y: clone.graphic.position.y },
                parent: clone.graphic.parent
            }
        });

        return true;
    }

    private createClone(): Graphics {
        const clone = this._graphic.clone();

        return clone;
    }


    set x(val: number) {
        this._graphic.position.x = val;
    }

    set y(val: number) {
        this._graphic.position.y = val;
    }

    get graphic(): Graphics {
        return this._graphic;
    }

    static getSpawner(name: string): Spawner {
        return Spawner.spawners[`${name}-spawner`];
    }
}


interface SpawnedObjectOptions {
    parentType: string;
    objectName: string;
    label?: string;

}

export class SpawnedObject {
    private _graphic: Graphics;
    private _isSeat: boolean;
    private _isTable: boolean;
    private _parentType: string;
    private _labelText: string;
    private _canHoldAmount: number;
    private _canHoldType: string;
    private _objectName: string;
    private static _spawnedObjectsStore = [];
    private _label: any;


    constructor(data: Graphics | SpawnedObjectData, options?: SpawnedObjectOptions) {
        if (data instanceof Graphics) {
            const { label, parentType, objectName } = options;
            this._graphic = data;
            this._isSeat = false;
            this._isTable = false;
            this._parentType = parentType;
            this._labelText = label || '';
            this._objectName = objectName
        }

        if ((data as SpawnedObjectData).discriminator === 'spawned-object-data') {
            SpawnedObject.addSpawnedObject(this);

            const { label, isSeat, isTable, width, height, coords, holdAmount, canHoldType, parentType, objectName } =
                data as SpawnedObjectData;


            const parent = Spawner.getSpawner(objectName);
            

            this._graphic = parent.graphic.clone();

            
            this.setLabel(label);
            this._isSeat = isSeat;
            this._isTable = isTable;
            this._graphic.width = width;
            this._graphic.height = height;
            this._graphic.position.x = coords.x;
            this._graphic.position.y = coords.y;
            this._graphic.lineStyle(3, 0x111111, .7);
            this._canHoldAmount = holdAmount;
            this._canHoldType = canHoldType;
            this._parentType = parentType;
            this._objectName = objectName


            if (App.editMode) this.addPointerEvents();

            App.viewport.addChild(this._graphic);
        }
    }

    static get allSpawnedObjects() {
        return this._spawnedObjectsStore;
    }

    static addSpawnedObject(obj: SpawnedObject) {
        this._spawnedObjectsStore.push(obj);
    }

    static removeSpawnedObject(obj: SpawnedObject) {
        const index = this._spawnedObjectsStore.indexOf(obj);
        this._spawnedObjectsStore.splice(index, 1);
    }

    get spawnedObjectData(): SpawnedObjectData {

        console.log(this._graphic.height, 'sent')
        return {
            discriminator: 'spawned-object-data',
            label: this._labelText,
            isSeat: this._isSeat,
            isTable: this._isTable,
            width: this._graphic.width,
            height: this._graphic.height,
            coords: { x: this._graphic.x, y: this._graphic.y },
            holdAmount: this._canHoldAmount,
            canHoldType: this._canHoldType,
            parentType: this._parentType,
            objectName: this._objectName

        };
    }

    get graphic() {
        return this._graphic;
    }

    get objectName() {
        return this._objectName;
    }

    get parentType() {
        return this._parentType;
    }

    setLabel(text: string, style?: TextStyle) {
        if (this._label) {
            this._graphic.removeChild(this._label);
            this._label = null;
        }

        this._labelText = text;

        const defaultStyle = new TextStyle({
            align: 'center',
            wordWrap: true,
            wordWrapWidth: this._graphic.width,
            fontSize: `${percent(9, this._graphic.width)}px`
        });

        const label = new Text(text, style || defaultStyle);

        // Centers the text location
        label.anchor.set(0.5);
        label.x = percent(50, this._graphic.width);
        label.y = percent(50, this._graphic.height);

        this._label = label;
        this._graphic.addChild(label);
    }

    addPointerEvents() {
        const _this = this;

        function onDragMove(e: InteractionEvent) {
            const graphic: DraggingGraphics = e.currentTarget as DraggingGraphics;
            const viewport = App.viewport;

            if (graphic.dragging) {
                const { x, y } = e.data.getLocalPosition(viewport);

                if (!checkIfBeyondWorld(graphic, x, y)) {
                    graphic.position.x += x - graphic.dragging.x;
                    graphic.position.y += y - graphic.dragging.y;
                    graphic.dragging = { x, y };
                }
            }
        }

        function onDragStart(e: InteractionEvent) {
            const graphic: DraggingGraphics = e.currentTarget as DraggingGraphics;
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

            graphic.data = e.data;
            graphic.alpha = 0.5;
            const { x, y } = e.data.getLocalPosition(viewport);
            graphic.dragging = { x, y };
            _this._graphic.cursor = 'grabbing';
            viewport.drag({ pressDrag: false });
        }

        function onDragEnd(e: InteractionEvent) {
            const graphic: DraggingGraphics = e.currentTarget as DraggingGraphics;

            graphic.alpha = 1;
            graphic.dragging = null;
            graphic.data = null;
            _this._graphic.cursor = 'grab';
            if (App.mode != 'build') App.viewport.drag();
        }
        _this._graphic.interactive = true;
        _this._graphic.cursor = 'grab';

        _this._graphic.on('pointerdown', onDragStart);
        _this._graphic.on('pointermove', onDragMove);
        _this._graphic.on('pointerup', onDragEnd);
        _this._graphic.on('pointerupoutside', onDragEnd);
    }


}