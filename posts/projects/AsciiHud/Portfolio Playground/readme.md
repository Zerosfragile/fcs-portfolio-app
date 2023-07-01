# Visualizing Dynamic Matrix Transformations with Responsive Rendering

This project provides a set of functions to create and animate dynamic matrix transformations, and to display the resulting data using responsive SVG rendering.

## Table of Contents

- [Introduction](#introduction)
- [Functions](#functions)
  - [createDimensions(svgId)](#createdimensionssvgid)
  - [createAsciiHandler(elementId)](#createasciihandlerelementid)
  - [animateDensity(ascii, totalFrames)](#animatedensityascii-totalframes)
  - [animateWhirlpool(ascii, totalFrames)](#animatewhirlpoolascii-totalframes)
  - [animatePush(ascii, totalFrames)](#animatepushascii-totalframes)
  - [pushMatrix(matrix, frame)](#pushmatrixmatrix-frame)
  - [AsciiAnimate()](#asciianimate)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is designed to provide dynamic matrix transformations with responsive rendering using JavaScript. It includes the following functions:

- createDimensions(svgId)
- createAsciiHandler(elementId)
- animateDensity(ascii, totalFrames)
- animateWhirlpool(ascii, totalFrames)
- animatePush(ascii, totalFrames)
- pushMatrix(matrix, frame)
- AsciiAnimate()

### Dependencies

- asciiEncoderWorker.js
- asciiStorageWorker.js
- radialDensityMatrixWorker.js
- radialWhirlMatrixWorker.js

### Usage

The functions can be used to create and render dynamic matrix transformations in SVG format. The `AsciiAnimate()` function can be used to initiate a series of animations using the other functions.

## Functions

### createDimensions(svgId)

This function creates an object containing dimensions for the SVG element with the specified ID.

#### Parameters

- svgId: The ID of the SVG element to be used.

#### Returns

An object containing the following properties:

- matrix: An object containing data about the matrix to be displayed.
- font: An object containing data about the font to be used.
- container: An object containing data about the container to be used.
- svg: The SVG element.
- updateFontX: A method to update the font X dimension.
- updateContainer: A method to update the container dimensions.
- render: A method to render the matrix.
- clear: A method to clear the SVG element.

### createAsciiHandler(elementId)

This function creates an object containing methods to retrieve and list ASCII objects.

#### Parameters

- elementId: The ID of the element to be used.

#### Returns

An object containing the following properties:

- asciiElement: The HTML element to be used.
- get: A method to retrieve an ASCII object.
- list: A method to list ASCII objects.

### animateDensity(ascii, totalFrames)

This function animates a radial density matrix.

#### Parameters

- ascii: The object containing the data to be rendered.
- totalFrames: The total number of frames for the animation.

#### Returns

A Promise that resolves when the animation is complete.

### animateWhirlpool(ascii, totalFrames)

This function animates a radial whirlpool matrix.

#### Parameters

- ascii: The object containing the data to be rendered.
- totalFrames: The total number of frames for the animation.

#### Returns

A Promise that resolves when the animation is complete.

### animatePush(ascii, totalFrames)

This function animates a radial push matrix.

#### Parameters

- ascii: The object containing the data to be rendered.
- totalFrames: The total number of frames for the animation.

#### Returns

A Promise that resolves when the animation is complete.

### pushMatrix(matrix, frame)

This function returns a matrix with a radial push effect.

#### Parameters

- matrix: The matrix to be transformed.
- frame: The current frame of the animation.

#### Returns

A matrix with the radial push effect applied.

### AsciiAnimate()

This function initiates a series of animations using the other functions.

## Contributing

Contributions to this project are welcome! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Make your changes.
4. Push your changes to your forked repository.
5. Create a pull request to merge your changes into the original repository.

## License

This project is licensed under the FCS License - see the [LICENSE](LICENSE) file for details.
