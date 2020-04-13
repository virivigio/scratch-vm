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

        this.R = null;
        this.G = null;
        this.B = null;

    }

    getInfo () {
        return {
            id: 'lightplay',
            name: 'Lightplay',
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'setSpeed',
                    blockType: BlockType.COMMAND,
                    text: 'Set rotation speed to [SPEED]',
                    arguments: {
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 40
                        }
                    }
                },
                {
                    opcode: 'getSpeed',
                    blockType: BlockType.REPORTER,
                    text: 'Get current rotation speed',
                    arguments: {
                    }
                },
                {
                    opcode: 'setDirection',
                    blockType: BlockType.COMMAND,
                    text: 'Set direction to [DIRECTION]',
                    arguments: {
                        DIRECTION: {
                            type: ArgumentType.NUMBER,
                            menu: 'directionMenu'
                        }
                    }
                },
                {
                    opcode: 'getDirection',
                    blockType: BlockType.REPORTER,
                    text: 'Get current direction',
                    arguments: {
                    }
                },
                {
                    opcode: 'startRotation',
                    blockType: BlockType.COMMAND,
                    text: 'Start rotation',
                    arguments: {
                    }
                },
                {
                    opcode: 'stopRotation',
                    blockType: BlockType.COMMAND,
                    text: 'Stop rotation',
                    arguments: {
                    }
                },
                {
                    opcode: 'setColorRGB',
                    blockType: BlockType.COMMAND,
                    text: 'Set color RGB [R][G][B]',
                    arguments: {
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

                //presi da PEN
                {
                    opcode: 'setColorToColor',
                    blockType: BlockType.COMMAND,
                    text: 'set color to [COLOR]',
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR
                        }
                    }
                },
                {
                    opcode: 'changeColorParamBy',
                    blockType: BlockType.COMMAND,
                    text: 'change [COLOR_PARAM] by [VALUE]',
                    arguments: {
                        COLOR_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'colorParam'
                        },
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'setColorParamTo',
                    blockType: BlockType.COMMAND,
                    text: 'set pen [COLOR_PARAM] to [VALUE]',
                    arguments: {
                        COLOR_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'colorParam'
                        },
                        VALUE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    }
                }

            ],
            menus: {
                directionMenu: {
                    items: ['clockwise', 'counterclockwise']
                },
                colorParam : {
                    items: ['color','saturation','brightness','transparency']
                }
            }
        };
    }

    //
    // ENGINE
    //

    setSpeed (args) {
        //finito
        const speed = parseInt(args.SPEED, 10);
        if (isNaN(speed)) return;
        this.speed = speed;
    }

    getSpeed (args) {
        //finito
        return this.speed;
    }

    setDirection (args) {
        //manca la validazione
        this.direction = args.DIRECTION;
    }

    getDirection (args) {
        //finito
        return this.direction;
    }

    startRotation (args) {
        //manca l'invio del comando
    }

    stopRotation (args) {
        //manca l'invio del comando
        this.speed = 0;
    }

    //
    // LIGHT
    //

    setColorRGB (args) {
        //finito
        const R = parseInt(args.R, 10);
        const G = parseInt(args.R, 10);
        const B = parseInt(args.R, 10);

        if ( isNaN(R) || isNaN(G) || isNaN(B) ) return;
        this.R = R;
        this.G = G;
        this.B = B;
    }

    setColorToColor (args) {
        //preso da PEN
    }

    changeColorParamBy (args) {
        //preso da PEN
    }

    setColorParamTo (args) {
        //preso da PEN
    }
}

module.exports = Scratch3Lightplay;
