import type { Application, LoaderResource, Graphics, utils as PIXI_Utils } from 'pixi.js';
import type * as PIXI from 'pixi.js';
import type { Viewport } from 'pixi-viewport';

export type AppMode = 'view' | 'build';

export default class App {
    private static _viewport: Viewport;
    private static _app: Application;
    private static _resources: PIXI_Utils.Dict<LoaderResource>;
    private static _border: Graphics;
    private static _mode: AppMode;
    private static _mode_event: EventTarget = new EventTarget();
    private static _PIXI: typeof PIXI;
    static parentEl: HTMLDivElement;

    static set viewport(vp: Viewport) {
        this._viewport = vp;
    }

    static set app(application: Application) {
        this._app = application;
    }

    static set mode(m: AppMode) {
        this._mode = m;

        let newEvent = new CustomEvent('app-mode-changed', {
            detail: {
                mode: this._mode
            }
        });
        this._mode_event.dispatchEvent(newEvent);
    }

    static set resources(res: PIXI_Utils.Dict<LoaderResource>) {
        this._resources = res;
    }

    static set border(b: Graphics) {
        this._border = b;
    }

    static set PIXI(pixi: typeof PIXI) {
        this._PIXI = pixi;
    }

    static get mode_event() {
        return this._mode_event;
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

    static get resources() {
        return this._resources;
    }

    static get border() {
        return this._border;
    }

    static get PIXI() {
        return this._PIXI;
    }
}
