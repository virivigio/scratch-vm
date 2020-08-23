const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const Color = require('../../util/color');
const log = require('../../util/log');
const MbitMore = require('./peripheral');

const blockIconURI = 'data:image/png;base64,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'

class Scratch3Lightplay {

    constructor (runtime) {
        this.runtime = runtime;

        this.speed = 0;
        this.direction = '';
        this.steps = 0;

        this.leds = [];
        this.leds.push({});
        this.leds.push({});

        this.leds[0].R = 0;
        this.leds[0].G = 0;
        this.leds[0].B = 0;

        this.leds[1].R = 0;
        this.leds[1].G = 0;
        this.leds[1].B = 0;

        // Create a new MicroBit peripheral instance
        this._peripheral = new MbitMore(this.runtime, 'lightplay');
    }



    getInfo () {
        return {
            id: 'lightplay',
            name: 'Lightplay',
            blockIconURI: blockIconURI,
            showStatusButton: true,
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
                {
                    opcode: 'setNumberOfStepperSteps',
                    blockType: BlockType.COMMAND,
                    text: 'Set motor steps to [STEPS]',
                    arguments: {
                        STEPS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 200
                        },
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

    startRotation(args, util) {
        log.info('startRotation');

        const speed = parseInt(args.SPEED, 10);
        if (isNaN(speed)) return;
        this.speed = speed;
        const delay = this.speed; //TODO make formula and bound to 255

        this.direction = args.DIRECTION;

        let comando = 4 << 12;                                             //0100 xxxx xxxx xxxx
        if ('clockwise' === this.direction) comando += 1 << 8;             //0100 0001 xxxx xxxx 16640+delay
        else if ('counterclockwise' === this.direction) comando += 2 << 8; //0100 0010 xxxx xxxx 16896+delay
        else this.direction='';                                            //0100 0000 xxxx xxxx
        comando += delay > 255 ? 255 : delay;                              //0100 00?? deee elay

        this._peripheral.setSharedData(0, comando, util);
        log.info('Invio Start: '+comando);
    }

    stopRotation (args, util) {
        log.info('stopRotation');

        this.speed = 0;
        this.direction = 0;

        let comando = 4 << 12;                                            //0100 0000 0000 0000
        this._peripheral.setSharedData(0, comando, util);
        log.info('Invio Stop');
    }

    setNumberOfStepperSteps (args, util) {
        log.info('setNumberOfStepperSteps');

        const steps = parseInt(args.STEPS, 10);
        if (isNaN(steps)) return;
        this.steps = steps; //TODO bounded to 255

        let comando = 7 << 12;                                            //0111 xxxx xxxx xxxx
        comando += steps;                                                 //0111 stee eeee eeps

        this._peripheral.setSharedData(0, comando, util);
        log.info('Invio Steps: '+comando);
    }



    //
    // LIGHT
    //

    //this is a function shared by all the light blocks
    _sendColorRGB (led, R, G, B, util) {
        log.info('_sendColorRGB');

        if (led === 1) {
            this.leds[0].R = 0; this.leds[0].B = 0; this.leds[0].G = 0;
        } else
        if (led === 2) {
            this.leds[1].R = 0; this.leds[1].B = 0; this.leds[1].G = 0;
        } else
        if (led === 3) {
            this.leds[0].R = 0; this.leds[0].B = 0; this.leds[0].G = 0;
            this.leds[1].R = 0; this.leds[1].B = 0; this.leds[1].G = 0;
        } else return;

        let comando = led << 12;                                           //00?? xxxx xxxx xxxx
        comando += R << 8;                                                 //00?? RRRR xxxx xxxx
        comando += G << 4;                                                 //00?? RRRR GGGG xxxx
        comando += B << 0;                                                 //00?? RRRR GGGG BBBB

        this._peripheral.setSharedData(0, comando, util);
        log.info('Invio Led ('+led+'): '+R+':'+G+':'+B);
    }

    switchOff (args, util) {
        log.info('switchOff');

        let whichLed = 0;

        if ('led 1' === args.WHICH) whichLed = 1;
        if ('led 2' === args.WHICH) whichLed = 2;
        if ('all leds' === args.WHICH) whichLed = 3;
        if (whichLed === 0) return;

        this._sendColorRGB(whichLed, 0, 0, 0, util);
    }

    setColorRGB (args, util) {
        log.info('setColorRGB');

        let whichLed = 0;

        if ('led 1' === args.WHICH) whichLed = 1;
        if ('led 2' === args.WHICH) whichLed = 2;
        if ('all leds' === args.WHICH) whichLed = 3;
        if (whichLed === 0) return;

        let R = parseInt(args.R, 10);
        let G = parseInt(args.G, 10);
        let B = parseInt(args.B, 10);

        if ( isNaN(R) || isNaN(G) || isNaN(B) ) return;

        R = Math.floor(R/16);
        G = Math.floor(G/16);
        B = Math.floor(B/16);

        //bound to 0-15
        if (R > 15) R=15; if (G > 15) G=15; if (B > 15) B=15;
        if (R < 0) R=0; if (G < 0) G=0; if (B < 0) B=0;

        this._sendColorRGB(whichLed, R, G, B, util);
    }

    setColorToColor (args, util) {
        log.info('setColorToColor');

        let whichLed = 0;

        if ('led 1' === args.WHICH) whichLed = 1;
        if ('led 2' === args.WHICH) whichLed = 2;
        if ('all leds' === args.WHICH) whichLed = 3;
        if (whichLed === 0) return;

        const rgb = Cast.toRgbColorObject(args.COLOR);
        let R = rgb.r;
        let G = rgb.g;
        let B = rgb.b;
        log.info('Scelto Colore: '+R+':'+G+':'+B);

        R = Math.floor(R/16);
        G = Math.floor(G/16);
        B = Math.floor(B/16);

        //bound to 0-15. shouldn't be needed but just in case
        if (R > 15) R=15; if (G > 15) G=15; if (B > 15) B=15;
        if (R < 0) R=0; if (G < 0) G=0; if (B < 0) B=0;

        this._sendColorRGB(whichLed, R, G, B, util);
    }

    changeColorParamBy (args, util) {
    }

}

module.exports = Scratch3Lightplay;
