import {Actor, EVENT_CODES, FACTORIES, Vector2} from '@theatrejs/theatrejs';
import * as PLUGIN_ASEPRITE from '@theatrejs/plugin-aseprite';

import asepriteGamepadXbox from './spritesheets/gamepad-xbox/gamepad-xbox.aseprite';
import asepriteGamepadXboxInputs from './spritesheets/gamepad-xbox-inputs/gamepad-xbox-inputs.aseprite';

/**
 * @extends {Actor<undefined, undefined>}
 */
class ActorOverlayGamepad extends FACTORIES.ActorWithPreloadables([

    PLUGIN_ASEPRITE.FACTORIES.PreloadableAseprite(asepriteGamepadXbox),
    PLUGIN_ASEPRITE.FACTORIES.PreloadableAseprite(asepriteGamepadXboxInputs)
]) {

    /**
     * @typedef {('idle' | 'disconnected')} TypeTagAsepriteGamepad A gamepad Aseprite tag.
     */

    /**
     * @typedef {('a-activated' | 'a-idle' | 'b-activated' | 'b-idle' | 'x-activated' | 'x-idle' | 'y-activated' | 'y-idle' | 'lb-activated' | 'lb-idle' | 'rb-activated' | 'rb-idle' | 'lt-activated' | 'lt-idle' | 'rt-activated' | 'rt-idle' | 'back-activated' | 'back-idle' | 'start-activated' | 'start-idle' | 'lsb-activated' | 'lsb-idle' | 'rsb-activated' | 'rsb-idle' | 'up-activated' | 'up-idle' | 'down-activated' | 'down-idle' | 'left-activated' | 'left-idle' | 'right-activated' | 'right-idle' | 'xbox-activated' | 'xbox-idle')} TypeTagAsepriteGamepadInput A gamepad input Aseprite tag.
     */

    /**
     * Stores the input actors.
     * @type {Array<Actor>}
     * @private
     */
    $actorsInput;

    /**
     * Stores the connected status of the gamepad.
     * @type {boolean}
     * @private
     */
    $connected;

    /**
     * Stores the gamepad Aseprite spritesheet.
     * @type {PLUGIN_ASEPRITE.Spritesheet<TypeTagAsepriteGamepad>}
     * @private
     */
    $spritesheet;

    /**
     * Triggers the 'connected' action.
     * @private
     */
    $actionConnected() {

        this.$spritesheet.animate('idle');

        this.$connected = true;
    }

    /**
     * Triggers the 'disconnected' action.
     * @private
     */
    $actionDisconnected() {

        this.$spritesheet.animate('disconnected');

        this.$connected = false;
    }

    /**
     * Creates the button input actors.
     * @private
     */
    $createActorsInputButton() {

        /**
         * @type {Map<string, Array<TypeTagAsepriteGamepadInput>>}
         */
        const mappingInputsButtonRendering = new Map([

            [EVENT_CODES.GAMEPAD_XBOX.A, ['a-activated', 'a-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.B, ['b-activated', 'b-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.X, ['x-activated', 'x-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.Y, ['y-activated', 'y-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.LB, ['lb-activated', 'lb-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.RB, ['rb-activated', 'rb-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.LT, ['lt-activated', 'lt-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.RT, ['rt-activated', 'rt-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.BACK, ['back-activated', 'back-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.START, ['start-activated', 'start-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.UP, ['up-activated', 'up-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.DOWN, ['down-activated', 'down-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.LEFT, ['left-activated', 'left-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.RIGHT, ['right-activated', 'right-idle']],
            [EVENT_CODES.GAMEPAD_XBOX.XBOX, ['xbox-activated', 'xbox-idle']]
        ]);

        Array.from(mappingInputsButtonRendering).forEach(([$input, [$activated, $idle]]) => {

            const ActorInput = /** @type {typeof PLUGIN_ASEPRITE.FACTORIES.ActorWithSpritesheet<TypeTagAsepriteGamepadInput>} **/(PLUGIN_ASEPRITE.FACTORIES.ActorWithSpritesheet)({

                $aseprite: /** @type {PLUGIN_ASEPRITE.Aseprite<TypeTagAsepriteGamepadInput>} **/(asepriteGamepadXboxInputs),
                $tag: /** @type {TypeTagAsepriteGamepadInput} */((this.engine.getInput($input) === true) ? $activated : $idle)
            });

            const actor = this.stage.createActor(ActorInput)
            .setVisible(this.visible)
            .setZIndex(this.zIndex)
            .translate(this.translation.clone());

            this.$actorsInput.push(actor);
        });
    }

    /**
     * Creates the left stick input actor.
     * @private
     */
    $createActorsInputStickLeft() {

        const ActorInputStickLeft = /** @type {typeof PLUGIN_ASEPRITE.FACTORIES.ActorWithSpritesheet<TypeTagAsepriteGamepadInput>} **/(PLUGIN_ASEPRITE.FACTORIES.ActorWithSpritesheet)({

            $aseprite: /** @type {PLUGIN_ASEPRITE.Aseprite<TypeTagAsepriteGamepadInput>} **/(asepriteGamepadXboxInputs),
            $tag: (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.LSB) === true) ? 'lsb-activated' : 'lsb-idle'
        });

        const actorInputStickLeft = this.stage.createActor(ActorInputStickLeft)
        .setVisible(this.visible)
        .setZIndex(this.zIndex)
        .translate(this.translation.clone());

        this.$actorsInput.push(actorInputStickLeft);

        if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.LS_LEFT) === true) {

            actorInputStickLeft.translate(new Vector2(-2, 0));
        }

        if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.LS_RIGHT) === true) {

            actorInputStickLeft.translate(new Vector2(2, 0));
        }

        if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.LS_UP) === true) {

            actorInputStickLeft.translate(new Vector2(0, 2));
        }

        if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.LS_DOWN) === true) {

            actorInputStickLeft.translate(new Vector2(0, -2));
        }
    }

    /**
     * Creates the right stick input actor.
     * @private
     */
    $createActorsInputStickRight() {

        const ActorInputStickRight = /** @type {typeof PLUGIN_ASEPRITE.FACTORIES.ActorWithSpritesheet<TypeTagAsepriteGamepadInput>} **/(PLUGIN_ASEPRITE.FACTORIES.ActorWithSpritesheet)({

            $aseprite: /** @type {PLUGIN_ASEPRITE.Aseprite<TypeTagAsepriteGamepadInput>} **/(asepriteGamepadXboxInputs),
            $tag: (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.RSB) === true) ? 'rsb-activated' : 'rsb-idle'
        });

        const actorInputStickRight = this.stage.createActor(ActorInputStickRight)
        .setVisible(this.visible)
        .setZIndex(this.zIndex)
        .translate(this.translation.clone());

        this.$actorsInput.push(actorInputStickRight);

        if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.RS_LEFT) === true) {

            actorInputStickRight.translate(new Vector2(-2, 0));
        }

        if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.RS_RIGHT) === true) {

            actorInputStickRight.translate(new Vector2(2, 0));
        }

        if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.RS_UP) === true) {

            actorInputStickRight.translate(new Vector2(0, 2));
        }

        if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.RS_DOWN) === true) {

            actorInputStickRight.translate(new Vector2(0, -2));
        }
    }

    /**
     * Removes the input actors.
     * @private
     */
    $removeActorsInputs() {

        [...this.$actorsInput].forEach(($actor) => {

            this.stage.removeActor($actor);
        });
    }

    /**
     * @type {Actor['onBeforeRemove']}
     */
    onBeforeRemove() {

        [...this.$actorsInput].forEach(($actor) => {

            this.stage.removeActor($actor);
        });
    }

    /**
     * @type {Actor['onCreate']}
     */
    onCreate() {

        this.$spritesheet = new PLUGIN_ASEPRITE.Spritesheet(/** @type {PLUGIN_ASEPRITE.Aseprite<TypeTagAsepriteGamepad>} **/(asepriteGamepadXbox));

        this.$actorsInput = [];
        this.$connected = false;

        this.$actionDisconnected();
    }

    /**
     * @type {Actor['onSetVisible']}
     */
    onSetVisible($visible) {

        [...this.$actorsInput].forEach(($actor) => {

            $actor.setVisible($visible);
        });
    }

    /**
     * @type {Actor['onSetZIndex']}
     */
    onSetZIndex($zIndex) {

        [...this.$actorsInput].forEach(($actor) => {

            $actor.setZIndex($zIndex);
        });
    }

    /**
     * @type {Actor['onTick']}
     */
    onTick($timetick) {

        this.$removeActorsInputs();

        if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.CONNECTED) === true) {

            this.$actionConnected();
        }

        else if (this.engine.getInput(EVENT_CODES.GAMEPAD_XBOX.DISCONNECTED) === true) {

            this.$actionDisconnected();
        }

        if (this.$connected === true) {

            this.$createActorsInputButton();
            this.$createActorsInputStickLeft();
            this.$createActorsInputStickRight();
        }

        this.$spritesheet.tick($timetick);

        if (this.sprite !== this.$spritesheet.sprite) {

            this.setSprite(this.$spritesheet.sprite);
        }
    }

    /**
     * @type {Actor['onTranslate']}
     */
    onTranslate($translation) {

        [...this.$actorsInput].forEach(($actor) => {

            $actor.translate($translation);
        });
    }
}

export default ActorOverlayGamepad;
