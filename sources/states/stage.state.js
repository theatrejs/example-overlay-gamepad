import {Stage, State} from '@theatrejs/theatrejs';

import StageOverlayGamepad from 'stages/overlay-gamepad/overlay-gamepad.stage.js';

/**
 * The state manager of the stage.
 * @type {State<typeof Stage>}
 * @constant
 */
const stateStage = new State(StageOverlayGamepad);

/**
 * Gets the stage.
 * @returns {typeof Stage}
 */
function getStage() {

    return stateStage.getState();
}

export {

    stateStage,

    getStage
};
