const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

const blockIconURI = 'data:image/png;base64,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'

class Scratch3Lightplay {


    constructor (runtime) {
        this.runtime = runtime;

        this.speed = null;
        this.direction = null;

        this.leds = {};
        this.leds.led_1 = {};
        this.leds.led_2 = {};

        this.leds.led_1.R = null;
        this.leds.led_1.G = null;
        this.leds.led_1.B = null;

        this.leds.led_2.R = null;
        this.leds.led_2.G = null;
        this.leds.led_2.B = null;
    }

    getInfo () {
        return {
            id: 'lightplay',
            name: 'Lightplay',
            blockIconURI: blockIconURI,
            blocks: [

                //ENGINE

                {
                    opcode: 'startRotation',
                    blockType: BlockType.COMMAND,
                    text: 'Start rotating [DIRECTION] with speed [SPEED]',
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'directionMenu'
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40
                        }
                    }
                },
                {
                    opcode: 'stopRotation',
                    blockType: BlockType.COMMAND,
                    text: 'Stop rotation',
                    arguments: {
                    }
                },

                //LIGHT

                {
                    opcode: 'switchOff',
                    blockType: BlockType.COMMAND,
                    text: 'Turn off [WHICH]',
                    arguments: {
                        WHICH: {
                            type: ArgumentType.NUMBER,
                            menu: 'ledMenu'
                        }
                    }
                },
                {
                    opcode: 'setColorRGB',
                    blockType: BlockType.COMMAND,
                    text: 'Set led [WHICH] to color Red [R] Green [G] Blue [B]',
                    arguments: {
                        WHICH: {
                            type: ArgumentType.STRING,
                            menu: 'ledMenu'
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 255
                        },
                        G: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 255
                        },
                        B: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 255
                        }

                    }
                },
                {
                    opcode: 'setColorToColor',
                    blockType: BlockType.COMMAND,
                    text: 'Set led [WHICH] color to [COLOR]',
                    arguments: {
                        WHICH: {
                            type: ArgumentType.STRING,
                            menu: 'ledMenu'
                        },
                        COLOR: {
                            type: ArgumentType.COLOR
                        }
                    }
                },
                {
                    opcode: 'changeColorParamBy',
                    blockType: BlockType.COMMAND,
                    text: 'Change led [WHICH] [COLOR_PARAM] by [VALUE]',
                    arguments: {
                        WHICH: {
                            type: ArgumentType.STRING,
                            menu: 'ledMenu'
                        },
                        COLOR_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'colorParamMenu'
                        },
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                }

            ],
            menus: {
                directionMenu: {
                    items: ['clockwise', 'counterclockwise']
                },
                colorParamMenu : {
                    items: ['color', 'saturation forse', 'brightness']
                },
                ledMenu : {
                    items: ['all leds', 'led 1', 'led 2']
                }
            }
        };
    }

    //
    // ENGINE
    //

    startRotation (args) {
        const speed = parseInt(args.SPEED, 10);
        if (isNaN(speed)) return;
        this.speed = speed;

        //manca la validazione
        this.direction = args.DIRECTION;

        //manca l'invio del comando
    }

    stopRotation (args) {
        //manca l'invio del comando
        this.speed = 0;
    }

    //
    // LIGHT
    //

    switchOff (args) {
        let whichLed = args.WHICH;
    }

    setColorRGB (args) {
        let whichLed = args.WHICH;

        const R = parseInt(args.R, 10);
        const G = parseInt(args.R, 10);
        const B = parseInt(args.R, 10);

        if ( isNaN(R) || isNaN(G) || isNaN(B) ) return;
    }

    setColorToColor (args) {
    }

    changeColorParamBy (args) {
    }

}

module.exports = Scratch3Lightplay;
