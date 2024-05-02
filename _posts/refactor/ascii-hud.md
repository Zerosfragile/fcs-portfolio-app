---
title: "Ascii-Hud"
subtitle: "Visualizing Dynamic Matrix Transformations with Responsive Rendering"
route: "https://fragileservices.com"
date: "2023-05-01"
tags: ["js", "graphics", "design"]
draft: false
---

# ASCII-HUD: Visualizing Dynamic Matrix Transformations with Responsive Rendering

## I. Context

This system was made as an experiment in the exploration of matrix transformations, computer graphics and chadri patterns. As my first exploration into JavaScript, I was curious to limit test dynamic elements and to explore different the programming patterns and utilities such as caching, web workers, canvas, Web API animation frames, and more.

![Matrix Animation Final](../posts/projects/Matrix%20Animation%20Final.MP4)
## II. Introduction

### Technologies

`["HTML", "CSS", "Javascript", "Web Workers", "Animation Frames", "Run-length Encoding", "SVG"]`

- **HTML**: Plain HTML, just 50 lines in total, was used to structure the project.
- **CSS**: CSS 260 lines were used for the styling and layout.
- **Javascript**: Javascript, as the backbone for all the interactive and dynamic behavior, was used with a combination of async, OOP, dynamic, and modular programming principles.
- **Web Workers**: Web workers were crucial for improving the animation performance of computationally complex animations like the radial matrix transformations, due to their ability to offload work to a separate thread, preventing the main thread from being blocked. This parallelization kept the animation sequence smooth and UI interactions responsive.
- **Animation Frames**: Animation Frames significantly improved animation fluidity and responsiveness by synchronizing rendering with the browser's refresh rate. It was a key factor in achieving smooth 60fps performance.
- **Run-length Encoding**: To efficiently store ASCII art for rendering, I coded a custom RLE storage worker, which could compress and decompress the art without losing fidelity.
- **SVG**: The use of SVG's are notable as when replacing upwards of 150 elements 60 times per second, the animation performance, due to GPU acceleration and browser native optimizations, is improved over elements like `<p> `and `<span>`, as well as being more responsive, behaving like elements, when compared to canvas based animations.

### Inspiration

I was inspired to start this project after researching the origins of computer graphics and old text-based user interfaces(TUI's). Through researching these two areas, I became intrigued with the concept of representing pixel data numerically in a matrix. If you had access to that matrix, you could then apply different transformations to it using a simple function, while achieving complex unified effects.

## III. Project Specifications

### Matrix Manager

#### Mobile View

![mobile matrix animation](../posts/projects/mobile-matrix-animation.mp4)
#### Abstract

```txt
[createDimensions Function]
    │
    ├── [SVG Element]
    │
    ├── [Components]
    │     ├── [Matrix]
    │     │     └── Update Dimensions
    │     ├── [Font]
    │     │     └── Manage Font Size
    │     └── [Container]
    │           └── Update SVG Attributes
    │
    └── [Operations]
          ├── updateFontX(newX)
          ├── updateContainer()
          ├── render(matrix)
          └── clear()
```

#### Usage
```ts
// Initialize dimensions manager for a specific SVG element
const dimensions = createDimensions('svg-id');

// Update font size and re-render the matrix
dimensions.updateFontX(18);

// Adjust to new container size and re-render
dimensions.updateContainer();

// Render a new matrix data
dimensions.render([[1, 2], [3, 4]]);

// Clear the SVG contents
dimensions.clear();
```

#### Code
```ts
// Initializes a function to manage SVG dimensions based on an optional SVG ID.
function createDimensions(svgId = "svg") {
  // Retrieves the SVG element by ID from the document.
  const svg = document.getElementById(svgId);

  // Matrix object to handle data and dimension calculations.
  const matrix = {
    data: [],
    x: 0, // Number of columns in the matrix
    y: 0, // Number of rows in the matrix
    update: function (container, font) {
      // Recalculates matrix dimensions based on container size and font dimensions.
      this.y = Math.floor(container.y / (font.x + 1)) + 1;
      this.x = Math.floor(container.x / font.y);
    },
  };

  // Font object to manage font dimensions used in SVG text elements.
  const font = {
    x: 15, // Width of the font
    y: 9, // Height of the font
  };

  // Container object to manage and update SVG dimensions.
  const container = {
    x: 0, // Width of the SVG container
    y: 0, // Height of the SVG container
    update: function (svg) {
      // Updates SVG dimensions to match its parent's client dimensions.
      this.x = svg.parentNode.clientWidth;
      this.y = svg.parentNode.clientHeight;
      const viewBox = `0 0 ${this.x} ${this.y}`;
      svg.setAttribute("viewBox", viewBox); // Sets the viewBox attribute of the SVG
    },
  };

  // Dimensions object encapsulating all components and their interactions.
  const dimensions = {
    matrix,
    font,
    container,
    svg,
    updateFontX: function (newX) {
      // Updates font width and recalculates related dimensions.
      const currentRatio = this.font.y / this.font.x;
      this.font.y = newX * currentRatio;
      this.font.x = newX;
      this.matrix.update(this.container, this.font);
    },
    updateContainer: function () {
      // Triggers container dimension update and re-calculates matrix dimensions.
      this.container.update(this.svg);
      this.matrix.update(this.container, this.font);
    },
    render: function (matrix) {
      // Updates matrix data and renders text elements in the SVG.
      this.matrix.data = matrix;
      const asciiMap = "              .,*:#% '\"...".split("");
      const createLine = (svg, y, fontDimensions) => {
        // Creates and returns a text element for a line in the SVG.
        const textEl = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        textEl.setAttribute("x", "50%");
        textEl.setAttribute("y", y);
        textEl.setAttribute("text-anchor", "middle");
        textEl.setAttribute("fill", "#8b8a87");
        textEl.style.fontSize = `${fontDimensions.x}px`;
        svg.appendChild(textEl);
        return textEl;
      };

      const fontDimensions = this.font;
      const fontSize = fontDimensions.x + 1; // +1 for better spacing when rendered
      const numberOfLines = this.matrix.y;
      const existingLines = this.svg.children;
      const lines = [];

      // Iterates through every row in the matrix to update or create new text elements
      for (let i = 0; i < numberOfLines; i++) {
        // Calculates the y position for the text element; it's vertically spaced by 'fontSize'
        const y = i * fontSize + fontSize; // Each line is offset by one 'fontSize' from the top plus its index times 'fontSize'

        // Attempts to reuse existing SVG 'text' elements if they are in the correct position to minimize DOM updates
        const existingLine = existingLines[i];
        const textEl =
          existingLine && existingLine.getAttribute("y") === `${y}`
            ? existingLine // Use the existing text element if it's at the correct y position
            : createLine(this.svg, y, fontDimensions); // Otherwise, create a new text element at the calculated y position

        // Converts the numerical matrix row into a string of ASCII characters
        const asciiRow = matrix[i]
          .map((value) => asciiMap[Math.round(value)])
          .join("");
        textEl.textContent = asciiRow; // Updates the text content of the SVG text element
        lines.push(textEl); // Stores the reference to the updated or new text element
      }

      // Removes any leftover text elements that are no longer needed after the last valid matrix row
      for (let i = numberOfLines; i < existingLines.length; i++) {
        this.svg.removeChild(existingLines[i]); // This ensures the SVG does not have stale text elements
      }
    },

    clear: function () {
      // Removes all text elements from the SVG to clear the rendered content.
      const textElements = this.svg.querySelectorAll("text");
      for (let i = 0; i < textElements.length; i++) {
        this.svg.removeChild(textElements[i]);
      }
    },
  };

  // Initial update of container dimensions upon creation.
  dimensions.updateContainer();

  return dimensions; // Returns the dimensions object containing all functionality.
}
```

### Animation Sequence

```ts
// Matrix Manager for "ASCII-000" SVG
// <svg id="ASCII-000"viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" />
const dimensions000 = createDimensions("ASCII-000");

// Resize Event Handler
window.addEventListener("resize", function () {
  dimensions000.updateContainer();
});

// Main Animation Sequence
async function AsciiAnimate() {
  dimensions000.clear();
  dimensions000.updateFontX(15);
  await animateDensity(dimensions000, 10);
  dimensions000.clear();
  dimensions000.updateFontX(10);
  await animateDensity(dimensions000, 100);
  await animateWhirlpool(dimensions000, 800);
  await animatePush(dimensions000, 200);
  const asciiArt = document.querySelector("#ASCII-001").innerText.split("\n");
  let data = new Array(dimensions000.matrix.y)
    .fill(0)
    .map(() => new Array(dimensions000.matrix.x).fill(0));
  const options = {
    spacing: 1,
  };
  data = displayStrings(data, asciiArt, options);
  dimensions000.render(data);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await animateDistortion(dimensions000, 200);
}
```
### Animation Functions

*Only complex animations are featured*
#### Animate Density
![density animation](../posts/projects/density-matrix-animation.mp4)
##### Animation Sequence

```ts
// `ascii` is the Matrix Manager 
function animateDensity(ascii, totalFrames) {
  totalFrames = totalFrames / 10;
  return new Promise((resolve) => {
    // Initialize a worker to handle computation-heavy tasks off the main thread
    const worker = new Worker("scripts/radialDensityMatrixWorker.js");
    let frame = 0;

    function loop() {
	  // Send the current frame data to the worker
      worker.postMessage({ frame, x: ascii.matrix.x, y: ascii.matrix.y });

      worker.onmessage = function (event) {
        const data = event.data;
        // Render Data and Increment Frame
        ascii.render(data);
        frame += 0.01;
        console.log(
          `Frame count: ${Math.floor(
            frame * 100
          )}, Time: ${new Date().toLocaleTimeString()}`
        );
        // Continue the animation if the total frame limit hasn't been reached
        if (frame < totalFrames) {
          requestAnimationFrame(loop);
        } else {
	      // Terminate the worker and resolve the promise when animation ends
          worker.terminate();
          resolve();
        }
      };
    }

    requestAnimationFrame(loop);
  });
}
```
##### Animation Worker
```ts
onmessage = function(event) {
  const { frame, x, y } = event.data;
  const matrix = new Array(y);
  // Calculate center coordinates of the matrix for radial calculations
  const centerX = x / 2;
  const centerY = y / 2;
  // Define scaling factor to control the spread of the wave pattern
  const scalingFactor = 2;
  // Set the maximum possible value for matrix elements (Maps to Ascii Map in render function)
  const maxValue = 20;

  // Each matrix cell's value is calculated based on its distance from the center, creating a dynamic, 
  // radial density pattern that evolves as the 'frame' value increases with each animation cycle.
  for (let j = 0; j < y; j++) {
  matrix[j] = new Array(x);
  for (let i = 0; i < x; i++) {
    // Calculate the scaled coordinates relative to the center. Scaling is used to control the frequency
    // of the wave pattern across the matrix, affecting how tightly packed the waves are.
    const xCoord = (i - centerX) * scalingFactor;
    const yCoord = (j - centerY) * scalingFactor;

    // Compute the radial distance from the center to apply a wave pattern. The cosine function
    // creates a wave effect that radiates from the center of the matrix. Multiplying the frame number
    // by the distance introduces animation, causing the wave pattern to evolve over time.
    const amplitude = Math.cos(frame * Math.sqrt(xCoord * xCoord + yCoord * yCoord));

    // Normalize the amplitude value to ensure it fits within the matrix value range (0 to maxValue).
    // The cosine function outputs values between -1 and 1. By adjusting this to range from 0 to maxValue,
    // we can visualize the wave pattern more clearly, where maxValue represents peak density.
    const Value = Math.max(0, Math.min(maxValue, maxValue * (amplitude + 1) / 2));

    // Assign the computed value to the matrix cell. This value determines the visual representation
    // of the matrix at this cell, which will be used to display the animation frame in the interface.
    matrix[j][i] = Value;
  }
}

  postMessage(matrix);
};
```
#### Animate Whirlpool

![whirlpool animation](../posts/projects/whirlpool-matrix-animation.mp4)
##### Animation Sequence

```ts
// `ascii` is the Matrix Manager 
function animateWhirlpool(ascii, totalFrames) {
  return new Promise((resolve) => {
    // Create a new web worker to process matrix transformations without blocking the UI
    const worker = new Worker("Scripts/radialWhirlMatrixWorker.js");
    const matrix = ascii.matrix.data; // Reference to the current ASCII matrix data
    let frame = 0; // Initialize frame count

    // Animation loop function, scheduled to run on each animation frame
    function loop() {
      // Post the current frame data to the worker for processing
      worker.postMessage({
        frame,
        matrix: matrix,
        x: ascii.matrix.x,
        y: ascii.matrix.y,
        speed: 1000000, // Fixed speed value for the transformation
        damping: 0, // Damping factor set to 0 for full effect
      });

      // Handler for messages received from the worker
      worker.onmessage = function (event) {
        const data = event.data;
        ascii.render(data); // Render the updated matrix data
        frame += 1; // Increment frame count

        console.log(
          `Frame count: ${Math.floor(
            frame
          )}, Time: ${new Date().toLocaleTimeString()}`
        );

        if (frame < totalFrames) {
          // Schedule the next frame if total frames aren't reached
          requestAnimationFrame(loop);
        } else if (ascii.matrix.data.flat().every((val) => val === 0) == true) {
          // Terminate the worker if the matrix is completely zeroed out
          worker.terminate();
          resolve(); // Resolve the promise when animation is complete
        } else {
          // Terminate the worker and resolve the promise in other cases
          worker.terminate();
          resolve();
        }
      };
    }

    // Start the animation loop
    requestAnimationFrame(loop);
  });
}

```
##### Animation Worker
```ts
onmessage = function(event) {
  const { frame, matrix, x, y, speed, damping } = event.data;

  // Calculate the center of the matrix
  const center = {x: Math.floor(x / 2), y: Math.floor(y / 2)};
  // Initialize a result matrix with the same dimensions as the input
  const result = new Array(y).fill(0).map(() => new Array(x).fill(0));

  // Iterate over each row and column in the matrix
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      // Calculate the distance (dx, dy) from the current point to the center of the matrix
      const dx = j - center.x;
      const dy = i - center.y;
      const distance = Math.sqrt(dx * dx + dy * dy); // Euclidean distance from center
      const angle = Math.atan2(dy, dx); // Angle relative to the horizontal axis

      // Apply a transformation for the whirlpool effect
      // The transformation varies by distance, adjusted by sine wave, creating a swirling effect
      const whirlpoolDistance = distance + frame * Math.sin(distance / 10 - frame / 7);
      // Modify the angle for the swirl; the modification increases with frame number, creating rotation
      const whirlpoolAngle = angle + frame / speed * whirlpoolDistance / (1 + damping * Math.abs(whirlpoolDistance));

      // Calculate the new coordinates after applying the whirlpool effect
      const whirlpoolX = Math.round(center.x + whirlpoolDistance * Math.cos(whirlpoolAngle));
      const whirlpoolY = Math.round(center.y + whirlpoolDistance * Math.sin(whirlpoolAngle));

      // Ensure the new coordinates are within bounds before setting them in the result matrix
      if (whirlpoolX >= 0 && whirlpoolX < x && whirlpoolY >= 0 && whirlpoolY < y) {
        result[i][j] = matrix[whirlpoolY][whirlpoolX]; // Assign the transformed value
      }
    }
  }
  
  // Post the transformed matrix back to the main thread
  postMessage(result);
};

```
#### Animate Matrix Distortion

![distort matrix animation](../posts/projects/distort-matrix-animation.mp4)
##### Animation
```ts
function distortMatrix(matrix, frame) {
  const height = matrix.length;           // Total number of rows in the matrix
  const width = matrix[0].length;         // Total number of columns in the matrix

  // Parameters defining the behavior of the wave pulses
  const numPulses = 3;                    // Number of wave pulses to apply
  const pulseRadius = Math.min(width, height) / 4; // Radius of each pulse, set to a quarter of the smaller matrix dimension
  const pulseIntensity = 0.5;             // Intensity factor of each pulse
  const decayRate = 0.01;                 // Rate at which the matrix values decay after each pulse

  // Apply wave pulses to the matrix
  for (let i = 0; i < numPulses; i++) {
    const cx = Math.floor(Math.random() * width);  // Random x-coordinate for the center of the pulse
    const cy = Math.floor(Math.random() * height); // Random y-coordinate for the center of the pulse

    // Calculate and apply the wave pulse effect based on distance from the center
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2); // Euclidean distance from the center
        if (distance < pulseRadius) {
          const intensity = pulseIntensity * (1 - distance / pulseRadius); // Decrease intensity with distance
          const phase = Math.sin(frame * 0.1 + distance * 0.1) * intensity; // Phase of the wave varies with distance and frame
          matrix[y][x] += phase; // Apply the calculated phase to the matrix element
        }
      }
    }

    // Decay the matrix values to reduce the effects of the wave over time
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        matrix[y][x] *= 1 - decayRate; // Apply decay factor to each element
      }
    }
  }

  // Reset the matrix to zero when the frame number reaches a threshold
  if (frame >= 2 * width) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        matrix[y][x] = 0; // Set all elements to zero
      }
    }
  }

  return matrix; // Return the distorted matrix
}
```

### Storage Handler

##### Storage Worker
```ts
// Key = Name of Ascii Art
// Value = RLE Encoded Ascii Art
const asciiStorage: {[key: string]: string} = {}

onmessage = function(event) {
  const action = event.data.action;
  const asciiObject = event.data.asciiObject;

  // If the action is "get", send get the variable name in asciiObject and send variable back to the main thread
  if (action === "get") {
    postMessage(asciiStorage[asciiObject]);
  }
  else if (action === "list") {
    const keys = Object.keys(asciiStorage);
    postMessage(keys);
  }
  else {
    postMessage("Unknown action: " + action);
  }
};
```
##### RLE Handler 
```ts
function createAsciiHandler(elementId = "ASCII-001") {
  const asciiElement = document.getElementById(elementId);

  const asciiHandler = {
    asciiElement,
    get: function (asciiObjectName) {
      const encodeAsciiObjs = new Worker("Scripts/asciiStorageWorker.js");
      const decoderWorker = new Worker("Scripts/asciiEncoderWorker.js");

      encodeAsciiObjs.onmessage = function (event) {
        // When the encoded ASCII data is received, decode it using the decoder worker
        const operation = "decode";
        decoderWorker.postMessage({
          asciiArt: event.data,
          operation: operation,
        });
      };

      // Request the encoded ASCII data from the worker
      encodeAsciiObjs.postMessage({
        action: "get",
        asciiObject: asciiObjectName,
      });

      decoderWorker.onmessage = function (event) {
        // When the ASCII data is decoded, display it on the page
        const asciiArray = event.data;
        asciiElement.innerHTML = asciiArray;
      };
    },
    list: function () {
      const encodeAsciiObjs = new Worker("Scripts/asciiStorageWorker.js");

      // Set up a message handler to log the data that is returned by the worker to the console
      encodeAsciiObjs.onmessage = function (event) {
        console.log(event.data);
      };

      // Send a message to the worker with an action of "list"
      encodeAsciiObjs.postMessage({ action: "list" });
    },
  };
  return asciiHandler;
}
```
##### RLE Worker

```ts
// Run-Length Encoding (RLE) function
function encodeRLE(input) {
  return new Promise((resolve, reject) => {
    let output = "";
    let count = 1;
    let currentChar = input[0];

    for (let i = 1; i < input.length; i++) {
      if (input[i] === currentChar) {
        count++;
      } else {
        output += `${count}${currentChar}`;
        count = 1;
        currentChar = input[i];
      }
    }

    // Add the last character(s)
    output += `${count}${currentChar}`;

    resolve(output);
  });
}

// Function to decode the ASCII art
function decodeRLE(input) {
  return new Promise((resolve, reject) => {
    let output = "";
    let count = "";

    for (let i = 0; i < input.length; i++) {
      if (/\d/.test(input[i])) {
        count += input[i];
      } else {
        const numChars = parseInt(count, 10);
        output += input[i].repeat(numChars);
        count = "";
      }
    }

    if (count !== "") {
      reject("Invalid input");
    } else {
      resolve(output);
    }
  });
}

// Listen for messages from the main thread
onmessage = function(event) {
  let asciiArt = event.data.asciiArt;
  const operation = event.data.operation;
  
  // If the encodedAscii is a list, convert it to a string
  if (Array.isArray(asciiArt)) {
    asciiArt = asciiArt.join("\n");
  }

  let result;

  // Call the appropriate function based on the operation
  if (operation === "encode") {
    result = encodeRLE(asciiArt);
  } else if (operation === "decode") {
    result = decodeRLE(asciiArt);
  } else {
    result = Promise.reject("Invalid operation");
  }

  // Send the result back to the main thread
  result
    .then((output) => {
      postMessage(output);
    })
    .catch((error) => {
      postMessage(error);
    });
};
```
#### Display Strings

```ts
/**
 * Embeds an array of strings into a given matrix, allowing for customized placements.
 * 
 * @param {Array<Array<number>>} matrix - The matrix where strings are to be embedded.
 * @param {Array<string>} strings - The strings to embed into the matrix.
 * @param {Object} options - Configuration options for embedding the strings.
 * @param {number} [options.startX] - The starting x-coordinate for the first string. Defaults to centering the string.
 * @param {number} [options.startY] - The starting y-coordinate for the first string. Defaults to centering vertically.
 * @param {number} [options.spacing=1] - The line spacing between strings, default is 1.
 * @returns {Array<Array<number>>} The updated matrix with strings embedded.
 *
 * @example
 * // Define a 10x10 matrix and embed the words "hello" and "world"
 * const matrix = Array.from({ length: 10 }, () => Array(10).fill(0));
 * const strings = ["hello", "world"];
 * displayStrings(matrix, strings);
 */
function displayStrings(matrix, strings, options = {}) {
  // Create an array from a string of ASCII characters for mapping
  const asciiMap =
    "              .,*:#% '\"“”‘’¹²³!#$&%()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuüvwxyz{|}~½¼¡«»×░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌".split(
      ""
    );

  // Determine the maximum string length to help center the text if needed
  const maxStringLength = Math.max(...strings.map((str) => str.length));
  // Calculate the starting x-coordinate based on options or default to center alignment
  const startX =
    options.startX !== undefined
      ? options.startX
      : Math.floor((matrix[0].length - maxStringLength) / 2);
  // Calculate the starting y-coordinate based on options or default to middle alignment
  const startY =
    options.startY !== undefined
      ? options.startY
      : Math.floor((matrix.length - strings.length) / 2);
  // Use the provided spacing or default to 1
  const spacing = options.spacing ?? 1;

  let x = startX;
  let y = startY;

  // Loop through each string to embed it into the matrix
  for (const str of strings) {
    // Convert string to indices from the asciiMap, filtering out any characters not found
    const indexArray = str
      .split("")
      .map((char) => asciiMap.indexOf(char))
      .filter((index) => index >= 0 && index < asciiMap.length);

    // Embed each character into the matrix
    for (let i = 0; i < indexArray.length; i++) {
      if (x >= matrix[0].length) { // Reset x if it exceeds matrix width
        x = startX;
        y += spacing; // Move down to the next line
      }
      if (y >= matrix.length) { // Stop if y exceeds matrix height
        break;
      }

      matrix[y][x] = indexArray[i]; // Place character index into matrix

      x++;
    }

    // Reset x to start and move y to the next line
    x = startX;
    y += spacing;
  }

  return matrix; // Return the updated matrix
}

```
