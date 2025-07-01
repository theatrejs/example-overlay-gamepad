import {Engine, ExtensionGamepad} from '@theatrejs/theatrejs';

import {getStage} from 'states/stage.state.js';

ExtensionGamepad.activate();

const engine = new Engine();
engine.initiate(25);

await engine.preloadStage(getStage());
engine.createStage(getStage());
