# Web Audio Chat

## Overview

- Handle audio operations inside an **audio context**
- Basic audio operations are performed with **audio nodes**
- Those are linked together to form an **audio routing graph**

### Audio Nodes
- Are linked into chains and simple webs by their inputs and outputs
  - Typically start with one or more sources

### Sources
- Provide arrays of sound intensities (samples) at very small timeslices
  - Could be mathematically generated (OscillatorNode)
  - Could sound/video files (AusioBufferSourceNode) (MediaElementAudioSourceNode)
  - Could be streams (MediaStreamAudioSourceNode)
- Sound files are just recordings of sound intensities themselves

### Outputs
- Outputs of one source can go as input to another
- A common modification is multiplying the samples by a value to change volume (GainNode)
  - After processing this, it can be linked to the input of a destination (AudioContext.destination)
  - This sends the sound to the speakers or headphones
    - This last connection is only necessary is the user is supposed to hear the audio

## A typical workflow

A simple, typical workflow for web audio would look something like this:

    Create audio context
    Inside the context, create sources — such as <audio>, oscillator, stream
    Create effects nodes, such as reverb, biquad filter, panner, compressor
    Choose final destination of audio, for example your system speakers
    Connect the sources up to the effects, and the effects to the destination.

## The simplest example

```
_______________          ______________
|              |         |             |
| Source       | ======> | Destination |
| mediaElement |         | context.    |
|______________|         | destination |
                          -------------
```