import {Engine, ExtensionGamepad} from '@theatrejs/theatrejs';

import StageExample from 'stages/overlay-gamepad/overlay-gamepad.stage.js';

ExtensionGamepad.activate();

const engine = new Engine();
engine.initiate(25);

await engine.preloadStage(StageExample);
engine.createStage(StageExample);
