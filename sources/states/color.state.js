import {State, Vector3} from '@theatrejs/theatrejs';

/**
 * The state manager of the color.
 * @type {State<Vector3>}
 * @constant
 */
const stateColor = new State(new Vector3(34 / 255, 32 / 255, 52 / 255));

/**
 * Gets the color.
 * @returns {Vector3}
 */
function getColor() {

    return stateColor.getState();
}

export {

    stateColor,

    getColor
};
