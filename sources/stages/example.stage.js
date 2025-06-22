import {FACTORIES, Stage} from '@theatrejs/theatrejs';

import {getColor} from 'states/color.state.js';
import {getResolution} from 'states/resolution.state.js';

class StageExample extends FACTORIES.StageWithPreloadables([]) {

    /**
     * @type {Stage['onCreate']}
     */
    onCreate() {

        this.engine.setColor(getColor());
        this.engine.setResolution(getResolution());
    }
}

export default StageExample;
