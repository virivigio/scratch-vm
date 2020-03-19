const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');

class Scratch3Mentor {
    constructor (runtime) {
        this.runtime = runtime;

        this.webble = {};
        this.webble.name = null;
        this.webble.id = null;
        this.webble.connected = false;
    }

    getInfo () {
        return {
            id: 'mentor',
            name: 'Mentor',
            blocks: [
                {
                    opcode: 'askMentor',
                    blockType: BlockType.REPORTER,
                    text: 'Please, help me with [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: "I'm stuck, nothing works!"
                        }
                    }
                },
                {
                    opcode: 'connectBLE',
                    blockType: BlockType.COMMAND,
                    text: 'BLE information',
                    arguments: {}
                },
                {
                    opcode: 'showBLE',
                    blockType: BlockType.REPORTER,
                    text: 'BLE information',
                    arguments: {}
                }
            ],
            menus: {
            }
        };
    }

    askMentor (args) {
        const caso = Math.floor(Math.random() * (5 - 1) + 1); //return a whole number 1 <= x <= 5
        let text = null;

        switch(caso) {
            case 1:
                text = 'Look at different PROJECTS to solve "'+args.TEXT+'"';
                break;
            case 2:
                text = 'Ask your PEERS to work "'+args.TEXT+'" out';
                break;
            case 3:
                text = 'Be confident in your PASSION to deal with "'+args.TEXT+'"';
                break;
            case 4:
                text = 'Try to PLAY to address "'+args.TEXT+'"';
                break;
            case 5:
                text = 'Help yourself with "'+args.TEXT+'" :-p';
                break;
        }

        return text;
    }

    connectBLE (args) {
        let options = { acceptAllDevices : true };

        navigator.bluetooth.requestDevice(options)
            .then(device => {
            console.log('> Name:             ' + device.name);
            console.log('> Id:               ' + device.id);
            console.log('> Connected:        ' + device.gatt.connected);

            this.webble.name = device.name;
            this.webble.id = device.id;
            this.webble.connected = device.gatt.connected;

        })
        .catch(error => {
            console.log('Argh! ' + error);
            this.webble.name = null;
            this.webble.id = null;
            this.webble.connected = false;
        });
    }

    showBLE (args) {
        let connection = this.webble.connected ? 'connected': 'not connected';
        let result = 'Device '+ this.webble.name + '(ID:' + this.webble.id + ') is ' + connection;

        return result;
    }
}

module.exports = Scratch3Mentor;
