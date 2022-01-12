/**
 * Location: src/routes/seating-chart/utils/App.ts
 * Description: This class will act as a way for every part of
 * the seating chart have access to the pixi.js application
 */

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
    static parentEl: HTMLDivElement;

    static set setEventTarget(eventTarget: EventTarget) {
        this._event_medium = eventTarget;
    }

    static save_seating_chart() {
        console.error("NOT IMPLEMENTED");
    }

    static undo_prev_event() {
        if (this._previous_app_events.length == 0) return;

        let prevEvent = this._previous_app_events.shift();

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

    static set mode(m: AppMode) {
        if (m != 'view') this.mode = 'view';

        this._mode = m;

        let newEvent = new CustomEvent('app-mode-changed', {
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
        let newEvent = new CustomEvent(event.event, {
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
