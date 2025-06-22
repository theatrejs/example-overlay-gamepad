import {Stage, State} from '@theatrejs/theatrejs';

import StageExample from 'stages/example/example.stage.js';

/**
 * The state manager of the stage.
 * @type {State<typeof Stage>}
 * @constant
 */
const stateStage = new State(StageExample);

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
