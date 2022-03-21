/**
 * Location: src/routes/seating-chart/utils/App.ts
 * Description: This class will act as a way for every part of
 * the seating chart have access to the pixi.js application
 */
import '$utils/pixi-ssr-shim';

import type {
    Application,
    LoaderResource,
    Graphics,
    utils as PIXI_Utils,
    Sprite,
    DisplayObject,
    Container
} from 'pixi.js';
import type * as PIXI from 'pixi.js';
import type { Viewport } from 'pixi-viewport';
import { SpawnedObject } from './Spawner';
import type { SpawnedObjectData } from '$utils/types';
import { newSnackbar } from '$utils/stores';

export type AppMode = 'view' | 'build' | `options-${string}`;

interface SpawnObjectEvent {
    sprite: Sprite;
    coords: { x: number; y: number };
    parent: DisplayObject | Container;
}
interface AppEvent {
    undone?: boolean;
    event: string;
    additional?: SpawnObjectEvent | {};
}

/**
 * Fully static class to let every part of the
 * seating chart application can access these properties
 * without passing in variables here and there
 */
export default class App {
    private static _viewport: Viewport;
    private static _app: Application;
    private static _resources: PIXI_Utils.Dict<LoaderResource>;
    private static _border: Graphics;
    private static _mode: AppMode;
    private static _event_medium: EventTarget;
    private static _build_object: string;
    private static _previous_object: string;
    private static _PIXI: typeof PIXI;
    private static _previous_app_events: AppEvent[] = [];
    private static _undone_app_events: AppEvent[] = [];
    private static _seating_chart_data: SpawnedObjectData[] = [];
    private static _editMode: boolean;
    static parentEl: HTMLDivElement;

    // If there is data to be used for the seating chart
    static import_data(data: []) {
        this._seating_chart_data = data || [];
    }

    // Clears the entire application
    static clearViewport() {
        this._viewport.removeChildren();
    }

    // Used to initialize the event medium when DOM is loaded
    // because this file cannot reference it directly
    static set setEventTarget(eventTarget: EventTarget) {
        this._event_medium = eventTarget;
    }

    static async save_seating_chart() {
        const new_data: SpawnedObjectData[] = [];

        SpawnedObject.allSpawnedObjects.forEach((spawnedObject) => {
            new_data.push(spawnedObject.spawnedObjectData);
        });

        this._seating_chart_data = new_data;
        const event_id = window.location.pathname.replace('/seating-chart/', '');

        let res = await fetch('/seating-chart/save', {
            method: 'POST',
            body: JSON.stringify({
                data: new_data,
                event_id
            })
        });

        let serialized = await res.json()

        if (serialized?.message == "Update successful!") {
            newSnackbar({
                props: {
                    text: 'Seating Chart Saved!',
                    class: 'bg-green-500'
                },
                component: undefined,
                duration: 2000
            })
        }
    }

    // If the user decides to undo an event (building a new object or deleting one)
    static undo_prev_event() {
        if (this._previous_app_events.length == 0) return;

        const prevEvent = this._previous_app_events.shift();

        if (prevEvent.event == 'spawn-object') {
            const { sprite, parent } = prevEvent.additional as SpawnObjectEvent;

            parent.removeChild(sprite);
        }

        if (prevEvent.event == 'delete-object') {
            const { sprite, parent } = prevEvent.additional as SpawnObjectEvent;

            (parent as Container).addChild(sprite);
        }

        prevEvent.undone = true;
        this._undone_app_events.unshift(prevEvent);
    }

    static set viewport(vp: Viewport) {
        this._viewport = vp;
    }

    static set app(application: Application) {
        this._app = application;
    }

    static set editMode(m: boolean) {
        this._editMode = m || false;
    }

    static set mode(m: AppMode) {
        if (m != 'view') this.mode = 'view';

        this._mode = m;

        const newEvent = new CustomEvent('app-mode-changed', {
            detail: {
                mode: this._mode
            }
        });
        this._event_medium.dispatchEvent(newEvent);
    }

    static set build_object(obj: string) {
        this._previous_object = this._build_object || '';

        this._build_object = obj;
    }

    static set resources(res: PIXI_Utils.Dict<LoaderResource>) {
        this._resources = res;
    }

    static set border(b: Graphics) {
        this._border = b;
    }

    static new_app_event(event: AppEvent) {
        const newEvent = new CustomEvent(event.event, {
            detail: {
                additional: event.additional
            }
        });

        this._event_medium.dispatchEvent(newEvent);

        this._previous_app_events.unshift(event);
    }

    static set PIXI(pixi: typeof PIXI) {
        this._PIXI = pixi;
    }

    /**
     * Getters
     */

    static get editMode() {
        return this._editMode;
    }

    static get imported_data() {
        return this._seating_chart_data;
    }

    static get event_medium() {
        return this._event_medium;
    }

    static get viewport() {
        return this._viewport;
    }

    static get app() {
        return this._app;
    }

    static get mode() {
        return this._mode;
    }

    static get build_object() {
        return this._build_object;
    }

    static get previous_object() {
        return this._previous_object;
    }

    static get resources() {
        return this._resources;
    }

    static get border() {
        return this._border;
    }

    static get last_event() {
        return this._previous_app_events[0];
    }

    static get PIXI() {
        return this._PIXI;
    }
}
