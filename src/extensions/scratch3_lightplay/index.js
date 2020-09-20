const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const Color = require('../../util/color');
const log = require('../../util/log');
const MbitMore = require('./peripheral');
const formatMessage = require('format-message');

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

        //values are in the range 0-255 because it is the standard
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
        this.setupTranslations();
        return {
            id: 'lightplay',
            name: 'Lightplay',
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [

                //LIGHT

                {
                    opcode: 'switchOff',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'lightPlay.switchOff',
                        default: 'Turn off [WHICH]'
                    }),
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
                    text: formatMessage({
                        id: 'lightPlay.setColorRGB',
                        default: 'Set led [WHICH] to color Red [R] Green [G] Blue [B]'
                    }),
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
                    text: formatMessage({
                        id: 'lightPlay.setColorToColor',
                        default: 'Set led [WHICH] color to [COLOR]'
                    }),
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
                    text: formatMessage({
                        id: 'lightPlay.changeColorParamBy',
                        default: 'Change led [WHICH] [COLOR_PARAM] by [VALUE]'
                    }),
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
                },

                //ENGINE

                {
                    opcode: 'startRotation',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'lightPlay.startRotation',
                        default: 'Start rotating [DIRECTION] with speed [SPEED]'
                    }),
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
                    text: formatMessage({
                        id: 'lightPlay.stopRotation',
                        default: 'Stop rotation'
                    }),
                    arguments: {
                    }
                },
                {
                    opcode: 'setNumberOfStepperSteps',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'lightPlay.setNumberOfStepperSteps',
                        default: 'Configure stepper with [STEPS] steps'
                    }),
                    arguments: {
                        STEPS: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2048
                        },
                    }
                }

            ],
            menus: {
                directionMenu: {
                    items: [
                        {
                            text: formatMessage({
                                id: 'lightPlay.directionMenu.clockwise',
                                default: 'clockwise',
                            }),
                            value: 'clockwise'
                        },
                        {
                            text: formatMessage({
                                id: 'lightPlay.directionMenu.counterclockwise',
                                default: 'counterclockwise',
                            }),
                            value: 'counterclockwise'
                        }
                    ]
                },
                colorParamMenu : {
                    items: [
                        {
                            text: formatMessage({
                                id: 'lightPlay.colorParamMenu.color',
                                default: 'color',
                            }),
                            value: 'color'
                        },
                        {
                            text: formatMessage({
                                id: 'lightPlay.colorParamMenu.brightness',
                                default: 'brightness',
                            }),
                            value: 'brightness'
                        }
                    ]
                },
                ledMenu : {
                    items: [
                        {
                            text: formatMessage({
                                id: 'lightPlay.ledMenu.all',
                                default: 'all',
                            }),
                            value: 'all'
                        },
                        {
                            text: formatMessage({
                                id: 'lightPlay.ledMenu.1',
                                default: '1',
                            }),
                            value: '1'
                        },
                        {
                            text: formatMessage({
                                id: 'lightPlay.ledMenu.2',
                                default: '2',
                            }),
                            value: '2'
                        }
                    ]
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
        this.direction = args.DIRECTION;
        let comando = 4 << 12;                                               //0100 xxxx xxxx xxxx

        //Zero speed is equivalent to stop
        if (this.speed > 0) {
            this.speed = this.speed > 100 ? 100 : this.speed;
            const delay = Math.floor((1 - this.speed) * 2.57 + 255); //TODO make formula and bound to 255, we have 8 bit
            if ('clockwise' === this.direction) comando += 1 << 8;             //0100 0001 xxxx xxxx 16640+delay
            else if ('counterclockwise' === this.direction) comando += 2 << 8; //0100 0010 xxxx xxxx 16896+delay
            else this.direction='';                                            //0100 0000 xxxx xxxx
            comando += delay > 255 ? 255 : delay;                              //0100 00?? deee elay
        }

        this._peripheral.setSharedData(1, comando, util);
        log.info('Sending Start Command: '+comando);
    }

    stopRotation (args, util) {
        log.info('stopRotation');

        this.speed = 0;
        this.direction = 0;

        let comando = 4 << 12;                                            //0100 0000 0000 0000
        this._peripheral.setSharedData(1, comando, util);
        log.info('Sending Stop Command');
    }

    setNumberOfStepperSteps (args, util) {
        log.info('setNumberOfStepperSteps');

        const steps = parseInt(args.STEPS, 10);
        if (isNaN(steps)) return;
        if (steps > 4095) { //we have 12 bits
            log.error('Steps value of '+steps+' is too high, capping it to 4095');
            this.steps=4095; }
        else this.steps = steps;

        let comando = 7 << 12;                                            //0111 xxxx xxxx xxxx
        comando += this.steps;                                                 //0111 stee eeee eeps

        this._peripheral.setSharedData(0, comando, util);
        log.info('Sending Steps Command: '+comando);
    }



    //
    // LIGHT
    //

    //this is a function shared by all the light blocks
    _sendColorRGB (led, R, G, B, util) {
        log.info('_sendColorRGB');

        if (led === 1) {
            this.leds[0].R = R; this.leds[0].G = G; this.leds[0].B = B;
        } else
        if (led === 2) {
            this.leds[1].R = R; this.leds[1].G = G; this.leds[1].B = B;
        } else
        if (led === 3) {
            this.leds[0].R = R; this.leds[0].G = G; this.leds[0].B = B;
            this.leds[1].R = R; this.leds[1].G = G; this.leds[1].B = B;
        } else return;

        let comando = led << 12;                                           //00?? xxxx xxxx xxxx
        comando += Math.floor(R/16) << 8;                               //00?? RRRR xxxx xxxx
        comando += Math.floor(G/16) << 4;                               //00?? RRRR GGGG xxxx
        comando += Math.floor(B/16) << 0;                               //00?? RRRR GGGG BBBB

        this._peripheral.setSharedData(0, comando, util);
        log.info('Sending Led ('+led+'): '+R+':'+G+':'+B);
    }

    switchOff (args, util) {
        log.info('switchOff');

        let whichLed = 0;

        if ('1' === args.WHICH) whichLed = 1;
        if ('2' === args.WHICH) whichLed = 2;
        if ('all' === args.WHICH) whichLed = 3;
        if (whichLed === 0) return;

        this._sendColorRGB(whichLed, 0, 0, 0, util);
    }

    setColorRGB (args, util) {
        log.info('setColorRGB');

        let whichLed = 0;

        if ('1' === args.WHICH) whichLed = 1;
        if ('2' === args.WHICH) whichLed = 2;
        if ('all' === args.WHICH) whichLed = 3;
        if (whichLed === 0) return;

        let R = parseInt(args.R, 10);
        let G = parseInt(args.G, 10);
        let B = parseInt(args.B, 10);

        if ( isNaN(R) || isNaN(G) || isNaN(B) ) return;

        //bound to 0-255
        if (R > 255) R=255; if (G > 255) G=255; if (B > 255) B=255;
        if (R < 0) R=0; if (G < 0) G=0; if (B < 0) B=0;

        this._sendColorRGB(whichLed, R, G, B, util);
    }

    setColorToColor (args, util) {
        log.info('setColorToColor');

        let whichLed = 0;

        if ('1' === args.WHICH) whichLed = 1;
        if ('2' === args.WHICH) whichLed = 2;
        if ('all' === args.WHICH) whichLed = 3;
        if (whichLed === 0) return;

        const rgb = Cast.toRgbColorObject(args.COLOR);
        let R = rgb.r;
        let G = rgb.g;
        let B = rgb.b;


        //bound to 0-255. shouldn't be needed but just in case
        if (R > 255) R=255; if (G > 255) G=255; if (B > 255) B=255;
        if (R < 0) R=0; if (G < 0) G=0; if (B < 0) B=0;

        this._sendColorRGB(whichLed, R, G, B, util);
    }

    changeColorParamBy (args, util) {
        log.info('changeColorParamBy');
        // https://en.wikipedia.org/wiki/HSL_and_HSV
        // https://www.rapidtables.com/convert/color/rgb-to-hsv.html

        let whichLed = 0;
        let hsv;
        let R;
        let G;
        let B;

        if ('1' === args.WHICH) {
            whichLed = 1;
            R = this.leds[0].R;
            G = this.leds[0].G;
            B = this.leds[0].B;
        }
        if ('2' === args.WHICH) {
            whichLed = 2;
            R = this.leds[1].R;
            G = this.leds[1].G;
            B = this.leds[1].B;
        }
        if ('all' === args.WHICH) { //TODO verify if we should change them independently
            whichLed = 3;
            R = this.leds[0].R;
            G = this.leds[0].G;
            B = this.leds[0].B;
        }
        if (whichLed === 0) return;

        let value = parseInt(args.VALUE, 10);
        if ( isNaN(value) ) return;

        hsv = Color.rgbToHsv({r: R, g: G, b: B});
        let color = hsv.h;
        let saturation = 100 * hsv.s;
        let brightness = 100 * hsv.v;

        log.info('initial rgb: '+R+':'+G+':'+B);
        log.info('initial hsv: '+hsv.h+':'+hsv.s+':'+hsv.v);
        log.info('initial csb: '+color+':'+saturation+':'+brightness);

        if ('color' === args.COLOR_PARAM) {
            color += value;
        }
        if ('brightness' === args.COLOR_PARAM) {
            brightness += value;
        }

        log.info('final hsv: '+color+':'+saturation+':'+brightness);
        let rgb = Color.hsvToRgb({h: color, s: saturation/100, v: brightness/100 });

        R = rgb.r;
        G = rgb.g;
        B = rgb.b;
        log.info('final rgb: '+R+':'+G+':'+B);

        //bound to 0-255. shouldn't be needed but just in case
        if (R > 255) R=255; if (G > 255) G=255; if (B > 255) B=255;
        if (R < 0) R=0; if (G < 0) G=0; if (B < 0) B=0;

        this._sendColorRGB(whichLed, R, G, B, util);
    }

    setupTranslations () {
        const localeSetup = formatMessage.setup();
        const extTranslations = {
            'it': {
                'lightPlay.startRotation': 'Ruota in senso [DIRECTION] con velocità [SPEED]',
                'lightPlay.stopRotation': 'Ferma la rotazione',
                'lightPlay.setNumberOfStepperSteps': 'Configura stepper con [STEPS] passi',
                'lightPlay.switchOff': 'Spegni led [WHICH]',
                'lightPlay.setColorRGB': 'Imposta led [WHICH] con il colore Rosso [R] Verde [G] Blu [B]',
                'lightPlay.setColorToColor': 'Imposta led [WHICH] con il colore [COLOR]',
                'lightPlay.changeColorParamBy': 'Cambia [COLOR_PARAM] al led [WHICH] di [VALUE]',
                'lightPlay.directionMenu.clockwise': 'orario',
                'lightPlay.directionMenu.counterclockwise': 'antiorario',
                'lightPlay.colorParamMenu.color': 'colore',
                'lightPlay.colorParamMenu.brightness': 'luminosità',
                'lightPlay.ledMenu.all': 'tutti',
                'lightPlay.ledMenu.1': '1',
                'lightPlay.ledMenu.2': '2'
            }
        };
        for (const locale in extTranslations) {
            if (!localeSetup.translations[locale]) {
                localeSetup.translations[locale] = {};
            }
            Object.assign(localeSetup.translations[locale], extTranslations[locale]);
        }
    }
}

module.exports = Scratch3Lightplay;
