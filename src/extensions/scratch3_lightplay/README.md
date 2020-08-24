## lightplay
Lightplay is a Scratch extension for playing with lights and shadows on a rotating platform. The extension controls two RGB Leds and 1 StepMotor

## Features
This extension features several blocks. Some are related to lights management, other to the movement of the board

### Light Blocks
General note: in Scratch colors are represented as
- {RGBObject} rgb {r: red [0,255], g: green [0,255], b: blue [0,255]}.
- {HSVObject} hsv {h: hue [0,360), s: saturation [0,1], v: value [0,1]}

and graphically with a Color Picker with Hue, Saturation and Brightness in the range [0..100]
####Set led to RGB
Sets a specific led to the RGB values set.  Leds can be: led 1, led 2 or both. Values must be in the range [0..255] but will be internally reduced to 0+15shades
####Set led to color
Sets a specific led to the visually chosen value.  Leds can be: led 1, led 2 or both. Values are internally managed and reduced to 0+15shades. Transparency is ignored
####Turn off leds
Sets all led values to zero. Leds can be: led 1, led 2 or both
####Change led aspect
Changes Color or Brightness (no Saturation) of leds. To decide if we can modify both leds at the same time, it can generate multiple messages [TODO]
### Movement Blocks
####Set motor steps
Tells the low-level motor library the number of steps the step motor has. This is dependend on the specific stepper engine.
####Start rotating
Starts the rotation (clockwise or counterclockwise) with a speed in range [TODO]. Internally -given the nature of the motor- this is converted to a number of steps to be moved per iteration. Thus the speed is not uniform and low values make this more visibile.
####Stop rotation
Stops the rotation

## Development
- in debug mode each command prints a led stripe on the microbit. This means that until it finishes all subsequent commands are ignored
- all internal RGB representations are 0-255. when we communicate with microbit we shrink it to 16 levels (but this is dependent on the protocol)
## Installation

## Demo
To view the Demo, make sure the dev server's running and go to [http://localhost:8073/playground/](http://localhost:8073/playground/).
