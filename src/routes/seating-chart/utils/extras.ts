/**
 * Location: src/routes/seating-chart/utils/extras.ts
 * Description: Here are extra utilities and functions
 */
import type { InteractionData } from '@pixi/interaction';
import type { Sprite } from '@pixi/sprite';
import type { Graphics } from '@pixi/graphics';

import App from './App';

interface DraggingGraphics extends Graphics {
    dragging: { x: number; y: number };
    pointerInGraphic?: boolean;
    data?: InteractionData;
    origin: { width; height; x; y };
}

export function checkIfBeyondWorld(graphic: DraggingGraphics, x: number, y: any) {
    if (graphic == null) {
        if (
            x > App.viewport.worldWidth - App.border.line.width / 2 ||
            x < 0 + App.border.line.width / 2 ||
            y > App.viewport.worldHeight - App.border.line.width / 2 ||
            x < 0 + App.border.line.width / 2
        )
            return true;
        return false;
    }

    const spriteMoveX = graphic.position.x + (x - graphic.dragging.x);
    const spriteMoveY = graphic.position.y + (y - graphic.dragging.y);

    // Check if beyond in the x-axis
    if (
        spriteMoveX + graphic.width > App.viewport.worldWidth - App.border.line.width / 2 ||
        spriteMoveX < 0 + App.border.line.width / 2
    )
        return true;

    // Check if beyond in the y-axis
    if (
        spriteMoveY + graphic.height > App.viewport.worldHeight - App.border.line.width / 2 ||
        spriteMoveY < App.border.line.width / 2
    )
        return true;
}

export type { DraggingGraphics };
