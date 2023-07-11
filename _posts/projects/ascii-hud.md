---
title: "Ascii-Hud"
subtitle: "Visualizing Dynamic Matrix Transformations with Responsive Rendering"
route: "https://fragileservices.com"
date: "2023-05-01"
tags: ["js", "graphics", "design"]
draft: false
---

# ASCII-HUD: Visualizing Dynamic Matrix Transformations with Responsive Rendering

## I. Introduction

This document serves to outline the architecture, background, design process, system features, and future improvements of the system.

### Project Overview

The `ASCII-HUD` project is a system for visualizing dynamic matrix transformations with responsive rendering. It's a web-based application that allows users to queue matrix transformations and render in real-time. The system also provides the ability to save and load matrices and transformation parameters, as well as share the resulting visualizations with others.

## II. Architecture

### System Architecture

The system architecture can be divided into three main components: the front-end user interface, the back-end data storage and retrieval, and the computation and rendering engine. These components work together to create a responsive and interactive user experience.

#### Front-End UI

The front-end user interface is built using HTML and CSS, with dynamic behavior handled by JavaScript. The user interface allows users to input matrices and transformation parameters, and displays the resulting visualization in real-time. The Matrix is rendered using a `SVG` element with the individual lines being `text` elements.
![UI Preview](/posts/projects/preview-ascii-hud.png)

Abstract Architecture

```html
<div class="HUD-001">
  <div class="CARD-001">
    <svg
      id="ASCII-000"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  </div>
  <div class="CARD-002">
    <BtnContainer class="BTN-CONTAINER" />
  </div>
</div>
```

#### Back-End Data storage and Retrieval

The back-end data storage and retrieval is handled using JavaScript and local storage APIs. This allows the system to save and load matrices and transformation parameters, as well as share the resulting visualizations with others.

Abstract Architecture

```js
const storageHandler = {
  saveMatrix: function (matrix) {
    localStorage.setItem("input-matrix", JSON.stringify(matrix));
  },
  loadMatrix: function () {
    const matrix = localStorage.getItem("input-matrix");
    return matrix ? JSON.parse(matrix) : null;
  },
  saveTransformationParams: function (params) {
    localStorage.setItem("transformation-params", JSON.stringify(params));
  },
  loadTransformationParams: function () {
    const params = localStorage.getItem("transformation-params");
    return params ? JSON.parse(params) : null;
  },
};
```

This code snippet demonstrates how the `storageHandler` object abstracts away the details of local storage operations and provides a simple interface for the rest of the system to save and load data. The `saveMatrix` and `loadMatrix` methods handle the input matrix data, while the `saveTransformationParams` and `loadTransformationParams` methods handle the transformation parameters. The methods use `localStorage` APIs to store and retrieve data, and they handle JSON serialization and deserialization to ensure that the data is stored in a format that can be easily read and parsed by the rest of the system.

#### Computation and Rendering Engine

The computation and rendering engine is responsible for transforming matrices and rendering visualizations in real-time. The engine is implemented using JavaScript and utilizes web workers to perform the computationally-intensive matrix transformations. The system uses a queue to manage animations and allows for responsive rendering by using a `Dimensions` object that updates dynamically based on the size of the parent SVG element.

##### Computation

The computation component is implemented using web workers, which allows for asynchronous computation and offloads processing from the main thread. The web workers are used to perform the computationally-intensive matrix transformations, and the results are sent back to the main thread for rendering.

Abstract Architecture

```js
// Compute Matrix Density with a radial gradient
function computeRadialDensityMatrix(data, x, y, frame) {
  // perform matrix transformations
  // return transformed matrix data
}

// Compute a whirlpool transformation
function computeWhirlpoolMatrix(data, x, y, frame) {
  // perform matrix transformations
  // return transformed matrix data
}

// Compute a push transformation
function computePushMatrix(data, x, y, frame) {
  // perform matrix transformations
  // return transformed matrix data
}
```

This code snippet demonstrates how the matrix transformations are implemented as functions that take in matrix data, x and y dimensions, and a frame parameter, and return the transformed matrix data. These functions are run inside web workers to perform the computationally-intensive matrix transformations in a separate thread.

##### Rendering

The rendering component manages the queue of animations and is responsible for rendering the visualization in real-time. It utilizes a `Dimensions` object that updates dynamically based on the size of the parent SVG element to ensure that the visualization is always responsive to changes in the viewport size.

Abstract Architecture

```js
// Define an animation queue
const animationQueue = [];

// Define a function to add animations to the queue
function queueAnimation(animationFunction, duration) {
  animationQueue.push({ animationFunction, duration });
}

// Define a function to execute the animation queue
async function executeAnimationQueue(dimensions) {
  while (animationQueue.length > 0) {
    const animation = animationQueue.shift();
    const { animationFunction, duration } = animation;
    await animationFunction(dimensions, duration);
  }
}

// Define a Dimensions object to manage the size and layout of the visualization
function Dimensions(svgId = "svg") {
  // Define properties and methods to manage the size and layout of the visualization
  // ...
}
```

This code snippet demonstrates how the rendering component manages the queue of animations and utilizes a `Dimensions` object to manage the size and layout of the visualization. The `queueAnimation` function is used to add animations to the queue, and the `executeAnimationQueue` function is used to execute the animations in the queue. The `Dimensions` object defines properties and methods to manage the size and layout of the visualization, and ensures that the visualization is always responsive to changes in the viewport size.

The current implementation of this is just an async function:

Abstract Architecture

```js
async function AsciiAnimate() {
  dimensions000.clear();
  dimensions000.updateFontX(15);
  await animateDensity(dimensions000, 10);
  dimensions000.clear();
  dimensions000.updateFontX(10);
  await animateDensity(dimensions000, 100);
  await animateWhirlpool(dimensions000, 800);
  await animatePush(dimensions000, 200);
}
```

## III. Background

### Inspiration

I was inspired to start this project after researching the origins of computer graphics and old text-based user interfaces(TUI's). Through researching these two areas, I became intrigued with the concept of representing pixel data numerically in a matrix. If you had access to that matrix, you could then apply different transformations to it using a simple function, while achieving complex unified effects.

This simple concept acted as a gateway to explore many rich and intricate fields in mathematics, sciences, computer-science, graphics, animation and design. It allowed me to achieve a more hands on approach to understanding the concepts as I implemented them into my system.

## IV. Design Process

I used a iterative process to build this system. It took me many iteration, but I'll break it down into the 3 major versions.

### V1.0

In V1.0 of the system underwent three implementations, with each trying to address different design challenges. The first implementation used nested `div` elements, but while it worked for fixed-length matrixes, it had limitations with display and speed. The second implementation utilized a canvas to generate the text inside it, and while this method was initially attractive, it was not adaptable and dynamic enough, and destroyed the purpose of the system. The third implementation used a grid to get the responsiveness needed out of the rendering system, but it fell into the same performance trap.

One of the design decisions made during the first implementation was to use `div` elements because they were straightforward to use, and their properties could be easily manipulated using CSS. However, this approach led to significant performance issues, particularly when it came to larger and more complex matrix transformations. To address this issue, the second implementation utilized a canvas, which allowed for more advanced visual effects, such as having the mouse impact the position of characters in the matrix. However, this approach led to other challenges, particularly with responsiveness and adaptability.

The third implementation addressed the challenges posed by the previous iterations by using a grid to get the responsiveness needed out of the rendering system. The grid was used to take advantage of some of the CSS properties, making it easy to center matrix elements. However, this approach required each index of the matrix to be its own element, which resulted in significant performance issues, particularly with larger and more complex matrix transformations.

Overall, the design process for this system was iterative, with each implementation attempting to address some of the challenges encountered in the previous iterations. While the implementations had different strengths and weaknesses, none of them could fully realize the desired outcomes. However, this process allowed for experimentation and learning about what worked and what did not work, ultimately leading to insights that could be used to guide future iterations. The performance issues encountered during the third implementation suggest the need for a more comprehensive and effective solution that can balance performance, responsiveness, and functionality.

V1.1

- [Design Page - 006](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20006/script.js): Initial implementation using nested `div` elements.
- [Design Page - 007](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20007/script.js): Full code for `div` Implementation.
  V1.2
- [Design Page - 009](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20009/script.js): Canvas Implementation where the mouse effects the position of characters in the matrix.
- [Design Page - 010](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20010/script.js): Further experimentation with Canvas Implementation.
- [Design Page - 016](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20016/script.js): More experimentation with canvas animation.
  V1.3
- [Design Page - 027](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20027/script.js): Grid Implementation using a grid to get the responsiveness needed out of the rendering system.

### V1.2

The development of V1.2 involved an iterative process that focused on improving performance, modularizing the code, and experimenting with various matrix transformations and rendering methods.

Iteration 1
As I experimented with larger matrixes and more dynamic rendering methods, my focus shifted to improving performance and experimenting with different matrix transformations and rendering methods. I tried using a debounce to limit the frames per second (FPS) but found it to be choppy. I also tried rendering every other frame, but the performance wasn't noticeable. Ultimately, I settled on using requestAnimationFrame(), a method in JavaScript that synchronizes animations with the browser's repaint cycle, resulting in smoother and more efficient animations with improved performance.

Iteration 2
Experimenting with new matrix transformations.

#### createWhirlpool Function

Uses some basic trigonometry to apply a whirlpool-like transformation to a heightmap matrix.

For each point in the matrix, we calculate its distance from the center using the Pythagorean theorem **(Math.sqrt(dx _dx + dy_ dy))**, and its angle from the center using **Math.atan2(dy, dx)**. This gives us a polar coordinate representation of the point's position relative to the center of the matrix.
To apply the whirlpool transformation, we first calculate a **whirlpoolDistance** value based on the **distance** of the point from the center and the **frame** parameter. This creates the spiral effect of the whirlpool by increasing the distance from the center over time. We also add a sine wave to create some undulation in the spiral.

We then calculate a **whirlpoolAngle** value based on the **angle** of the point from the center and the **frame** parameter. This creates the rotation effect of the whirlpool by changing the angle of the point over time. You can modify the constant multiplying the **whirlpoolDistance** to adjust the rate of spin on the effect.

Finally, we calculate the **whirlpoolX** and **whirlpoolY** coordinates of the point after applying the whirlpool transformation. We do this by adding the **whirlpoolDistance** value to the **center.x** and **center.y** coordinates, respectively, and multiplying by the cosine and sine of the **whirlpoolAngle** value, respectively. We also round the resulting coordinates to the nearest integer to get the closest corresponding point in the **heightmap** matrix.

Iteration 3
The createSquarePattern function takes two parameters: the current frame number and the heightmap array. It iterates over each row of the heightmap array, calculates the number of tiles in the row, generates an array of indices representing the tiles in the row, and randomly shuffles the array of indices. It then fills a random tile with a value of 0 in the row, in the order specified by the shuffled array of indices. The function returns the modified heightmap array.

Iteration 4
The main goal of the project was the experimentation with different techniques for creating dynamic visual effects using JavaScript and ASCII art.

The mouse-based positioning diffusion effect is one such technique, which involves modifying the density levels of nearby points on the heightmap based on the position of the mouse cursor. However, this technique is found to be too laggy and is not used in the final version of the code.

The animate function is another key aspect of the project, which sets up an animation loop using requestAnimationFrame to continually update the heightmap and display various effects. While the current implementation of the animate function does not include an animation queue system, it could potentially be expanded upon in future iterations of the code.

Iteration 5
The key experimentation involved representing text as a matrix of numbers and applying a matrix transformation over that abstracted text. This technique enabled me to manipulate the text in various ways, such as rotating or skewing it, and to visualize the results. It included functions to break up text strings according to the dimensions of the matrix, and parameters on where to display the text.

Iteration 6
This iteration expanded on the previous, focusing on displaying ascii art using the functions generated in the last. It was successful, using a hidden pre element to initially hold the art, the having a var set to that text allowed the previous code to function on the art without issue. The only problems I occasionally ran into was the pre element not formatting spaces correctly when pasted, I found it to be a little unreliable, and took up a lot of space, so while it worked when manually implemented and checked, I was worried about how it would preform in more dynamic situations.

Iteration 7
In this page I went back to experimenting with effects, I was looking for a radial pulse that would propagate through the matrix, applying some sort of distortion. I experimented with different ways of implementing this effect, but none of them gave me the sort of effect I was envisioning, so I moved on. In hindsight, I lacked a real example, or preparation when trying to code out this effect, so I'm not that surprised it didn't turn out amazingly. When trying to create effect, specifically ones that aren't iterative or recursive but use mathematical functions/principles, planning is really important.

Iteration 8
This was another implementation of the radial pulse effect, but was still recursive.
applyRadialWavePulses(), creates a wave pulse effect by applying a series of concentric circles to the input matrix. Each pulse adds a sinusoidal phase shift to the matrix values within the circle, with the intensity and radius of the pulse varying based on parameters such as numPulses, pulseIntensity, maxRadius, and decayRate. The function then decays the matrix values over time to create a fading effect.

Iteration 9
This was another implementation of the radial pulse effect, but was using a displacement approach.
applyRadialWave(), creates a wave effect by displacing the matrix values based on their distance from the center of the matrix. It calculates the angle and distance from the center of each matrix element, and then applies a sine wave offset to the distance based on the frameCount parameter. This offset is then used to calculate the new position of each element, and the result is returned as a new matrix.

Iteration 10
This was experimenting with queuing effects, and general code improvements

Iteration 11
It's through this process that I landed on the "finial" rendering implementation, using an `svg` container and `text` elements.

I also added some more functional functions that adjusted the font size and for updating the dimensions of the svg element. I also implemented a proper queue system, using async await functions.

```js
// Initialization
async function Initialization() {
  await setViewBox();
  await setPortLines();
  await setMatrix();
}

async function AsciiAnimate() {
  updateFontDimensionsX(fontDimensions, 15);
  // updateFontDimensionsX(fontDimensions, 100);

  await animateDensity();
  await animateWhirlpool();
  // await animateRippleWave();
  console.log("done");
  // updateFontDimensionsX(fontDimensions, 15);
  // await animateDensity();
  // await animateWhirlpool();
}

Initialization();
AsciiAnimate();
```

However, I was still running into problems with trying to update the font dimensions between animations.Overall, this iteration was a big step, really cleaning up the code, and compiling every thing I had learned/created into a more comprehensive system.

- [Design Page - 017](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20017/script.js): Experimented with larger matrixes and rendering methods, settling on using `requestAnimationFrame()` to improve performance.
- [Design Page - 018](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20018/script.js): Created a `createWhirlpool()` function to apply a whirlpool-like transformation to a heightmap matrix, using trigonometry to calculate the transformation.
- [Design Page - 019](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20019/script.js): Created a `createSquarePattern()` function to generate a pattern of randomly placed squares within a matrix.
- [Design Page - 020](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20020/script.js): Implemented mouse-based positioning diffusion effect, and used `requestAnimationFrame()` to continually update the heightmap and display various effects.
- [Design Page - 021](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20021/script.js): Experimented with representing text as a matrix of numbers and applying a matrix transformation over the text.
- [Design Page - 022](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20022/script.js): Focused on displaying ASCII art using the functions generated in the previous page, using a hidden `pre` element to hold the art.
- [Design Page - 023](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20023/script.js): Experimented with creating a radial pulse effect, but did not achieve the desired effect.
- [Design Page - 024](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20024/script.js): Created `applyRadialWavePulses()` function to create a wave pulse effect on a matrix, with the intensity and radius of the pulse varying based on parameters such as `numPulses`, `pulseIntensity`, and `maxRadius`.
- [Design Page - 025](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20025/script.js): Created `applyRadialWave()` function to create a wave effect on a matrix, displacing the matrix values based on their distance from the center of the matrix.
- [Design Page - 026](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20026/script.js): Experimented with queuing effects and general code improvements.
- [Design Page - 028](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20028/script.js): Settled on using an `svg` container and `text` elements for rendering, added functional functions for updating the font size and for updating the dimensions of the `svg` element, and implemented a proper queue system using async/await functions.

### V1.3

In order to address the previous problems, a combination of OOP and function programming was used to overhaul the system. The createDimensions function was added, which creates a dimensions object to manage the ASCII art display within the web page. This object stores information about the ASCII art and its rendering, including the font size, the container size, and the matrix data. It also provides methods for updating the container and font sizes, rendering the ASCII matrix on the SVG element, and clearing the SVG element of all ASCII characters. Encapsulating this functionality in a single object makes it easier to manage and manipulate the ASCII art display.

The createAsciiHandler function was also added, which creates an ASCII handler object that retrieves and displays ASCII art. The animateDensity, animateWhirlpool, animatePush, and animateDistortion functions were added to create different visual effects for the ASCII art. These functions were also updated to use web workers to optimize speed.

To animate the ASCII art using the different visual effects created by the other functions, the AsciiAnimate function was added. It clears the existing ASCII art, sets the font size, and then animates the ASCII art.

Lastly, the code was cleaned up further, and different designs and features were experimented with, and controls were added to the UI. In conclusion, the finishing touches stage involved a comprehensive review and optimization of the system. The changes made improved the overall user experience and functionality.

- [Design Page - 031](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20031/script.js): Design overhaul with OOP and functional programming, added createDimensions and createAsciiHandler functions for managing and displaying ASCII art, optimized with web workers.
- [Design Page - 033](https://github.com/Zerosfragile/000-Playground/blob/main/Design%20Page%20-%20033/script.js): Cleaned up and optimized code, experimented with new designs and features, and added controls to the portfolio.

## V. System Features

The "Visualizing Dynamic Matrix Transformations with Responsive Rendering" system allows users to input matrices and apply dynamic transformations to visualize the data in real-time. The system utilizes web workers to perform computationally-intensive matrix transformations, and a queue to manage animations. The system also utilizes a `Dimensions` object to ensure that the visualization is always responsive to changes in the viewport size.

### System Overview

The system allows users to input matrices and apply dynamic transformations to visualize the data in real-time. The system utilizes web workers to perform computationally-intensive matrix transformations, and a queue to manage animations. The system also utilizes a `Dimensions` object to ensure that the visualization is always responsive to changes in the viewport size.

The user inputs a matrix, which is displayed in real-time as an ASCII art representation. The user can then select from a range of transformations to apply to the matrix, such as radial density, whirlpool, or push. The selected transformation is added to the animation queue, and the system begins animating the matrix in real-time.

### System Versions

The system has gone through several versions, each with different features and improvements. The following are brief overviews of each version:

- Version 1.0: The initial release of the system, which included basic matrix input and visualization functionality.
- Version 1.1: Added web workers for computationally-intensive matrix transformations.
- Version 1.2: Added a queue to manage animations and allow for responsive rendering.
- Version 1.3: Added a `Dimensions` object to ensure that the visualization is always responsive to changes in the viewport size.
- Version 1.4: Added a range of dynamic transformations, such as radial density, whirlpool, and push.
- Version 1.5: Improved the UI and added a range of customization options, such as font size and line spacing.

## VI. Future Improvements

There are several potential improvements that could be made to the "Visualizing Dynamic Matrix Transformations with Responsive Rendering" system in the future. Some of these potential improvements include:

- Improving the UI to make it more intuitive and user-friendly.
- Optimizing the performance of the system to improve its speed and reduce its memory usage.
- Implementing a data storage system to allow users to save and load matrices and visualizations.
- Design and implement a data model/schema that can store matrices and visualizations.
- Write APIs and endpoints in Node.js that enable users to save and load matrices and visualizations.
- Integrate the data storage system into the existing system, ensuring compatibility with the React front-end.
- Write tests and ensure data integrity and consistency, with typescript.
- Package the data storage system as a Node.js module that can be imported and used in other projects.
- Develop coordinate-based matrix effects that can be applied uniformly to all `divs` in a document, while accounting for the spacing between `divs`.

### Reflection on Design Process

The design process for the "Visualizing Dynamic Matrix Transformations with Responsive Rendering" system was challenging but rewarding. One major lesson learned during the design process was the importance of modularity and separation of concerns. By breaking the system down into smaller, more manageable components, it was easier to test and debug each part of the system individually.

Another lesson learned during the design process was the importance of careful planning and testing. By thoroughly testing each component of the system and planning out the system's architecture beforehand, it was possible to identify and resolve issues early on in the development process.

## VII. Conclusion

### Lessons Learned

Overall, the design process for the "Visualizing Dynamic Matrix Transformations with Responsive Rendering" system was a valuable learning experience. It taught the importance of modularity, separation of concerns, and careful planning and testing. Additionally, it highlighted the importance of staying up-to-date with the latest web development technologies and best practices, such as web workers and responsive design.

Moving forward, there are several areas of this system that I would like to improve. On the top of that list is packaging the system for node.js and enabling other developers to experiment with it. Additionally, I aim to make the system more customizable and comprehensive. I look forward to revisiting this project in the future, once my skills are further honed, and continuing to implement new features.

### Contact

For further inquiries or questions, please contact the developer at Marcus@fragileservices.com
