/**
 * Location: src/routes/seating-chart/utils/extras.ts
 * Description: Here are extra utilities and functions
 */
import type { InteractionData } from '@pixi/interaction';
import type { Sprite } from '@pixi/sprite';

import App from './App';

interface DraggingSprite extends Sprite {
    dragging: { x: number; y: number };
    pointerInSprite?: boolean;
    data?: InteractionData;
}

export function checkIfBeyondWorld(sprite: DraggingSprite, x: number, y: any) {
    if (sprite == null) {
        if (
            x > App.viewport.worldWidth - App.border.line.width / 2 ||
            x < 0 + App.border.line.width / 2 ||
            y > App.viewport.worldHeight - App.border.line.width / 2 ||
            x < 0 + App.border.line.width / 2
        )
            return true;
        return false;
    }

    const spriteMoveX = sprite.position.x + (x - sprite.dragging.x);
    const spriteMoveY = sprite.position.y + (y - sprite.dragging.y);

    // Check if beyond in the x-axis
    if (
        spriteMoveX + sprite.width > App.viewport.worldWidth - App.border.line.width / 2 ||
        spriteMoveX < 0 + App.border.line.width / 2
    )
        return true;

    // Check if beyond in the y-axis
    if (
        spriteMoveY + sprite.height > App.viewport.worldHeight - App.border.line.width / 2 ||
        spriteMoveY < App.border.line.width / 2
    )
        return true;
}

export type { DraggingSprite };
