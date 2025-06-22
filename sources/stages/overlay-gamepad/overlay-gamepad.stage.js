import {FACTORIES, Stage} from '@theatrejs/theatrejs';

import {getColor} from 'states/color.state.js';
import {getResolution} from 'states/resolution.state.js';

import ActorOverlayGamepad from './actors/overlay-gamepad/overlay-gamepad.actor.js';

class StageOverlayGamepad extends FACTORIES.StageWithPreloadables([

    ActorOverlayGamepad
]) {

    /**
     * @type {Stage['onCreate']}
     */
    onCreate() {

        this.engine.setColor(getColor());
        this.engine.setResolution(getResolution());

        this.createActor(ActorOverlayGamepad);
    }
}

export default StageOverlayGamepad;
