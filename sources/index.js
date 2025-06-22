import {Engine, ExtensionGamepad, ExtensionGravity, ExtensionGyroscope, ExtensionPointer} from '@theatrejs/theatrejs';

import StageExample from 'stages/example.stage.js';

ExtensionGamepad.activate();
ExtensionGravity.activate();
ExtensionGyroscope.activate();
ExtensionPointer.activate();

const engine = new Engine();
engine.initiate(25);

await engine.preloadStage(StageExample);
engine.createStage(StageExample);
