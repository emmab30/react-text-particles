AnimatedText Component Documentation

![Demo](https://i.ibb.co/jfcxxGr/demo.gif)

## Or try it live: https://adibus.dev/particles

# AnimatedText Component

The `AnimatedText` component is a React component designed to display text with animated particle effects using Framer Motion. It utilizes the text's characters to create individual particles that animate into view, creating a dynamic visual effect.

## Features

-   Dynamic text animations using Framer Motion.
-   Customizable text styles and animations.
-   Responsive particle adjustments based on device type (desktop or mobile).

## Installation

To use the `AnimatedText` component, ensure you have React and Framer Motion installed in your project:

    npm install react framer-motion

## Props

> **activeIndex**: The index of the current text being shown.

> **texts**: An array of objects. Each object will contain:

> > **text**: text to be shown

> > **textStyle**: object containing styles for the text. It supports color, fontFamily at the moment. Font size is calculated automatically based on the width and height of the container

> > **maxParticles**: Maximum number of particles being rendered for a single char (not full text).

## Usage

Here's a simple example to embed the `AnimatedText` component in your application:

```
import React, { useState } from 'react';
import AnimatedText from './components/AnimatedText'; // Adjust the path as necessary

const App = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const texts = [
        { text: "Hello!", textStyle: { color: "#21ebff", fontFamily: "Raleway" }, maxParticles: 60 },
        { text: "I hope you\n are having", textStyle: { color: "#77abff", fontFamily: "Raleway" }, maxParticles: 60 },
        { text: "A nice day!\n:-)", textStyle: { color: "#99ffa6", fontFamily: "Raleway" }, maxParticles: 60 }
    ];

    return (
        <div>
            <AnimatedText texts={texts} activeIndex={activeIndex} />
        </div>
    );
};
export default App;
```
