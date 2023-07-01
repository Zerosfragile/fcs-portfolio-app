function createDimensions(svgId = 'svg') {
  const svg = document.getElementById(svgId);

  const matrix = {
    data: [],
    x: 0,
    y: 0,
    update: function(container, font) {
      this.y = Math.floor(container.y / (font.x + 1)) + 1;
      this.x = Math.floor(container.x / font.y);
    }
  };

  const font = {
    x: 15,
    y: 9
  };

  const container = {
    x: 0,
    y: 0,
    update: function(svg) {
      this.x = svg.parentNode.clientWidth;
      this.y = svg.parentNode.clientHeight;
      const viewBox = `0 0 ${this.x} ${this.y}`;
      svg.setAttribute('viewBox', viewBox);
    }
  };

  const dimensions = {
    matrix,
    font,
    container,
    svg,
    updateFontX: function(newX) {
      const currentRatio = this.font.y / this.font.x;
      this.font.y = newX * currentRatio;
      this.font.x = newX;
      this.matrix.update(this.container, this.font);
    },
    updateContainer: function() {
      this.container.update(this.svg);
      this.matrix.update(this.container, this.font);
    },
    render: function(matrix) {
      this.matrix.data = matrix;
      const asciiMap =  "              .,*:#% '\"“”‘’¹²³!#$&%()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuüvwxyz{|}~½¼¡«»×░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌".split("");
      const createLine = (svg, y, fontDimensions) => {
        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.setAttribute('x', '50%');
        textEl.setAttribute('y', y);
        textEl.setAttribute('text-anchor', 'middle');
        textEl.setAttribute('fill', '#8b8a87');
        textEl.style.fontSize = `${fontDimensions.x}px`;
        svg.appendChild(textEl);
        return textEl;
      };

      const fontDimensions = this.font;
      const fontSize = fontDimensions.x + 1;
      const numberOfLines = this.matrix.y;
      const existingLines = this.svg.children;
      const lines = [];

      for (let i = 0; i < numberOfLines; i++) {
        const y = i * fontSize + fontSize;
        const existingLine = existingLines[i];
        const textEl = existingLine && existingLine.getAttribute('y') === `${y}`
          ? existingLine
          : createLine(this.svg, y, fontDimensions);
        const asciiRow = matrix[i].map(value => asciiMap[Math.round(value)]).join("");
        textEl.textContent = asciiRow;
        lines.push(textEl);
      }

      for (let i = numberOfLines; i < existingLines.length; i++) {
        this.svg.removeChild(existingLines[i]);
      }
    },
    clear: function() {
      const textElements = this.svg.querySelectorAll("text");
      for (let i = 0; i < textElements.length; i++) {
        this.svg.removeChild(textElements[i]);
      }
    }
  };

  dimensions.updateContainer();

  return dimensions;
}

function createAsciiHandler(elementId = 'ASCII-001') {
  const asciiElement = document.getElementById(elementId);

  const asciiHandler = {
    asciiElement,
    asciiList: null,
    get: function(asciiObjectName) {
      const encodeAsciiObjs = new Worker("Scripts/asciiStorageWorker.js");
      const decoderWorker = new Worker("Scripts/asciiEncoderWorker.js");

      encodeAsciiObjs.onmessage = function(event) {
        // When the encoded ASCII data is received, decode it using the decoder worker
        const operation = "decode";
        decoderWorker.postMessage({ asciiArt: event.data, operation: operation });
      };

      // Request the encoded ASCII data from the worker
      encodeAsciiObjs.postMessage( { action: "get", asciiObject: asciiObjectName } );

      decoderWorker.onmessage = function(event) {
        // When the ASCII data is decoded, display it on the page
        const asciiArray = event.data;
        console.log(event.data);
        asciiElement.innerHTML = asciiArray;
        decoderWorker.terminate();
        encodeAsciiObjs.terminate();
      };
    },
    list: function() {
      const encodeAsciiObjs = new Worker("Scripts/asciiStorageWorker.js");

      // Set up a message handler to log the data that is returned by the worker to the console
      encodeAsciiObjs.onmessage = function(event) {
        const artList = event.data 
        console.log( artList );
        this.asciiList = artList;
        encodeAsciiObjs.terminate();
      };

      // Send a message to the worker with an action of "list"
      encodeAsciiObjs.postMessage( { action: "list"} );
    }


  }
  return asciiHandler;
}

// Create a new dimensions object with a different SVG element
const dimensions000 = createDimensions('ASCII-000');

window.addEventListener('resize', function() {
  dimensions000.updateContainer();
});

const replayBtn = document.getElementById("replay-btn");

replayBtn.addEventListener("click", () => {
  AsciiAnimate();
});
const aboutBtn = document.getElementById("about-btn");

aboutBtn.addEventListener("click", () => {
  AsciiAbout();
});
const projectBtn = document.getElementById("projects-btn");

projectBtn.addEventListener("click", () => {
  AsciiProjects();
});
const resumeBtn = document.getElementById("resume-btn");

resumeBtn.addEventListener("click", () => {
  AsciiResume();
});
const contactBtn = document.getElementById("contact-btn");

contactBtn.addEventListener("click", () => {
  AsciiContact();
});

function animateDensity(ascii, totalFrames) {
  totalFrames = totalFrames/10
  return new Promise((resolve) => { // Return a Promise that resolves when the animation completes
    const worker = new Worker('Scripts/radialDensityMatrixWorker.js');
    let frame = 0;

    function loop() {
      worker.postMessage({ frame, x: ascii.matrix.x, y: ascii.matrix.y });

      worker.onmessage = function(event) {
        const data = event.data;
        ascii.render(data);
        frame += 0.01;
        console.log(`Frame count: ${Math.floor(frame * 100)}, Time: ${new Date().toLocaleTimeString()}`);
        if (frame < totalFrames) {
          requestAnimationFrame(loop);
        } else {
          worker.terminate();
          resolve(); // Resolve the Promise when the animation is complete
        }
      };
    }

    requestAnimationFrame(loop);
  });
}
function animateWhirlpool(ascii, totalFrames) {
    return new Promise((resolve) => { // Return a Promise that resolves when the animation completes
        const worker = new Worker('Scripts/radialWhirlMatrixWorker.js');
        const matrix = ascii.matrix.data;
        let frame = 0;
        function loop() {
          worker.postMessage({ frame, matrix: matrix, x: ascii.matrix.x, y: ascii.matrix.y, speed: 1000000, damping: 0});
          worker.onmessage = function(event) {
              const data = event.data;
              ascii.render(data);
              frame += 1;
              console.log(`Frame count: ${Math.floor(frame)}, Time: ${new Date().toLocaleTimeString()}`);
              if (frame < totalFrames) {
                  requestAnimationFrame(loop);
              } else if (ascii.matrix.data.flat().every(val => val === 0) == true) {
                worker.terminate();
                resolve(); // Resolve the Promise when the animation is complete
              } else {
                worker.terminate();
                resolve();
              }
          }
        }
        requestAnimationFrame(loop);
    });
}
function animatePush(ascii, totalFrames) {
    return new Promise((resolve) => { // Return a Promise that resolves when the animation completes
        let matrix = ascii.matrix.data;
        let frame = 0;
        function loop() {
            data = pushMatrix( matrix, frame );
            ascii.render(data);
            frame += 1;
            console.log(`Frame count: ${Math.floor(frame)}, Time: ${new Date().toLocaleTimeString()}`);
            if (frame < totalFrames) {
                requestAnimationFrame(loop);
            } else if (ascii.matrix.data.flat().every(val => val === 0) == true) {
              resolve(); // Resolve the Promise when the animation is complete
            } else {
              resolve();
            }
        }
        requestAnimationFrame(loop);
    });
}

function animateDistortion(ascii, totalFrames) {
    return new Promise((resolve) => { // Return a Promise that resolves when the animation completes
        let matrix = ascii.matrix.data;
        let frame = 0;
        function loop() {
            data = distortMatrix( matrix, frame );
            ascii.render(data);
            frame += 1;
            console.log(`Frame count: ${Math.floor(frame)}, Time: ${new Date().toLocaleTimeString()}`);
            if (frame < totalFrames) {
                requestAnimationFrame(loop);
            } else if (ascii.matrix.data.flat().every(val => val === 0) == true) {
              resolve(); // Resolve the Promise when the animation is complete
            } else {
              resolve();
            }
        }
        requestAnimationFrame(loop);
    });
}

function distortMatrix(matrix, frame) {
  const height = matrix.length;
  const width = matrix[0].length;

  // Set up parameters for the wave pulses
  const numPulses = 3;
  const pulseRadius = Math.min(width, height) / 4;
  const pulseIntensity = 0.5;
  const decayRate = 0.01;

  // Apply each wave pulse
  for (let i = 0; i < numPulses; i++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (distance < pulseRadius) {
          const intensity = pulseIntensity * (1 - distance / pulseRadius);
          const phase = Math.sin(frame * 0.1 + distance * 0.1) * intensity;
          matrix[y][x] += phase;
        }
      }
    }

    // Decay the matrix after each wave pulse
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        matrix[y][x] *= 1 - decayRate;
      }
    }
  }

  // Set all values to zero with the last pulse
  if (frame >= 2 * width) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        matrix[y][x] = 0;
      }
    }
  }

  return matrix;
}

function pushMatrix(matrix, frame) {
  // ! This is a radial push from the center, but it doesn't yet look like the effect im trying to achieve.
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));
  const centerRow = Math.floor(rows / 2);
  const centerCol = Math.floor(cols / 2);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const value = matrix[row][col];
      if (value !== 0) {
        const dRow = row - centerRow;
        const dCol = col - centerCol;
        const angle = Math.atan2(dRow, dCol);
        const distance = Math.sqrt(dRow * dRow + dCol * dCol);

        const newRow = centerRow + Math.round((distance + frame) * Math.sin(angle));
        const newCol = centerCol + Math.round((distance + frame) * Math.cos(angle));

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          result[newRow][newCol] = value;
        }
      }
    }
  }
  return result;
}

function displayStrings(matrix, strings, options = {}) {
  const asciiMap = "              .,*:#% '\"“”‘’¹²³!#$&%()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuüvwxyz{|}~½¼¡«»×░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌".split("");

  const maxStringLength = Math.max(...strings.map(str => str.length));
  const startX = options.startX !== undefined ? options.startX : Math.floor((matrix[0].length - maxStringLength) / 2);
  const startY = options.startY !== undefined ? options.startY : Math.floor((matrix.length - strings.length) / 2);
  const spacing = options.spacing ?? 1;

  let x = startX;
  let y = startY;

  for (const str of strings) {
    const indexArray = str
      .split("")
      .map((char) => asciiMap.indexOf(char))
      .filter((index) => index >= 0 && index < asciiMap.length);

    for (let i = 0; i < indexArray.length; i++) {
      if (x >= matrix[0].length) {
        x = startX;
        y += spacing;
      }
      if (y >= matrix.length) {
        break;
      }

      matrix[y][x] = indexArray[i];

      x++;
    }

    x = startX;
    y += spacing;
  }

  return matrix;
}

runAnimation = true;
async function AsciiAnimate() {
  runAnimation = false;
  dimensions000.clear();
  dimensions000.updateFontX(15);
  console.log(dimensions000.matrix.y);
  await animateDensity(dimensions000, 10);
  dimensions000.clear();
  dimensions000.updateFontX(10);
  await animateDensity(dimensions000, 100);
  await animateWhirlpool(dimensions000, 800);
  await animatePush(dimensions000, 200);
  runAnimation = true;
  while (runAnimation == true) {
    if (window.innerWidth > 2000) {
      handler001.get("fragileLogo_001");
    }
    else {
      handler001.get("fragileLogo_002");
    }
    const asciiArt = document.querySelector('#ASCII-001').innerText.split('\n');
    let data = new Array(dimensions000.matrix.y).fill(0).map(() => new Array(dimensions000.matrix.x).fill(0));
    const options = {
      // startX: 25,
      // startY: 50,
      spacing: 1
    };
    data = displayStrings(data, asciiArt, options);
    dimensions000.render(data);
    let min = 500;
    let max = 10000;

    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise(resolve => setTimeout(resolve, 2000));
    min = 10;
    max = 50;

    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    await animateDistortion(dimensions000, randomNumber);
  }
  
}

async function AsciiAbout() {
  runAnimation = false;
  await animateDistortion(dimensions000, 200);
  dimensions000.clear();
}
async function AsciiProjects() {
  runAnimation = false;
  await animateDistortion(dimensions000, 200);
  dimensions000.clear();
  dimensions000.updateFontX(6);
  handler002.list();
  const getAsciiList = () => {
    return new Promise((resolve, reject) => {
      const encodeAsciiObjs = new Worker("Scripts/asciiStorageWorker.js");

        encodeAsciiObjs.onmessage = function(event) {
          const artList = event.data 
          console.log(artList);
          encodeAsciiObjs.terminate();
          resolve(artList);
        };

        encodeAsciiObjs.onerror = function(error) {
          reject(error);
        };

        encodeAsciiObjs.postMessage({ action: "list" });
      });
  };
  handler002.asciiList = await getAsciiList();
  let artList = handler002.asciiList
  console.log(artList)
  runAnimation = true;
  while(runAnimation == true) {
    for (var i = 0; i < artList.length; i++) {
      handler002.get(artList[i]);
      await new Promise(resolve => setTimeout(resolve, 2500));
      let asciiArt = document.querySelector('#ASCII-002').innerText.split('\n');
      let data = new Array(dimensions000.matrix.y).fill(0).map(() => new Array(dimensions000.matrix.x).fill(0));
      const options = {
        spacing: 1
      };
      data = displayStrings(data, asciiArt, options);
      dimensions000.render(data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      await animateWhirlpool(dimensions000, 200);
      await animatePush(dimensions000, 200); 
      await animateWhirlpool(dimensions000, 25);
      await animatePush(dimensions000, 100); 
    }
  }
}
async function AsciiResume() {
  runAnimation = false;
  await animateDistortion(dimensions000, 100);
  dimensions000.clear();
  handler002.list();
  handler002.get("fragileLogo_002");
  let asciiArt = document.querySelector('#ASCII-002').innerText.split('\n');
  let data = new Array(dimensions000.matrix.y).fill(0).map(() => new Array(dimensions000.matrix.x).fill(0));
  const options = {
    // startX: 25,
    // startY: 0,
    spacing: 1
  };
  data = displayStrings(data, asciiArt, options);
  dimensions000.render(data);
  handler002.get("resumeTest");
  await new Promise(resolve => setTimeout(resolve, 2000));
  asciiArt = document.querySelector('#ASCII-002').innerText.split('\n');
  data = new Array(dimensions000.matrix.y).fill(0).map(() => new Array(dimensions000.matrix.x).fill(0));
  dimensions000.clear();
  dimensions000.updateFontX(10);
  const options1 = {
    // startX: 25,
    startY: 10,
    spacing: 1
  };
  data = displayStrings(data, asciiArt, options1);
  dimensions000.render(data);
}
async function AsciiContact() {
  runAnimation = false;
  await animateDistortion(dimensions000, 200);
  dimensions000.clear();
}

const handler001 = createAsciiHandler("ASCII-001");
handler001.list();
handler001.get("fragileLogo_001");

const handler002 = createAsciiHandler("ASCII-002");
handler002.list();
handler002.get("fragileLogo_002");
AsciiAnimate();

function createHUDLines(containerSelector, options) {
  const { colors, widths, durations, numOfTracks, numOfLines } = options;
  const linesContainer = document.querySelector(containerSelector);
  linesContainer.classList.add('lines');

  for (let trackIndex = 0; trackIndex < numOfTracks; trackIndex++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    const trackElement = document.createElement('div');
    trackElement.classList.add('track');

    const animationDuration = pickDuration();
    trackElement.style.setProperty('--duration', animationDuration);
    trackElement.style.setProperty('--from', trackIndex % 2 === 0 ? '-50%' : '0%');
    trackElement.style.setProperty('--to', trackIndex % 2 === 0 ? '0%' : '-50%');

    for (let lineIndex = 0; lineIndex < numOfLines; lineIndex++) {
      const lineElement = document.createElement('div');
      lineElement.classList.add('line');
      lineElement.style.setProperty('--bg', pickColor());
      lineElement.style.setProperty('--w', pickWidth());
      trackElement.appendChild(lineElement);
    }

    rowElement.appendChild(trackElement);
    linesContainer.appendChild(rowElement);
  }

  function pickColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function pickWidth() {
    return widths[Math.floor(Math.random() * widths.length)];
  }

  function pickDuration() {
    return durations[Math.floor(Math.random() * durations.length)];
  }
}

const hudLineOptions = {
  colors: ['#fff', '#fff', '#b3b3b3', '#595959', '#e2e2e2'],
  widths: [1, 2, 2, 3, 3, 4, 4],
  durations: ['20s', '35s', '32.5s'],
  numOfTracks: 6,
  numOfLines: 25,
};

createHUDLines('.HUD-002', hudLineOptions);

function showEmail() {
  var emailDiv = document.getElementById("HUD-EMAIL");
  // emailDiv.style.display = "block";
  emailDiv.parentNode.style.zIndex = 1;
  emailDiv.style.opacity = 100;
}
function getButtonWidth(btn) {
  var btnWidth = btn.offsetWidth;
  var btnStyles = window.getComputedStyle(btn);
  var btnPadding = 25;
  return btnWidth + btnPadding;
}

function setBtnBackPosition(btnBack, btn, width) {
  btnBack.style.opacity = 100;
  btnBack.style.width = width + 'px';
  btnBack.style.left = (btn.offsetLeft + (btn.offsetWidth - width) / 2) + 'px';
}

function resetBtnBackPosition(btnBack) {
  btnBack.style.opacity = 0;
  btnBack.style.width = '';
  btnBack.style.left = '';
}

function setBtnList(btnBack, btn, btnDropdownList) {
  var btnContainerHeight = btn.parentElement.offsetHeight;
  var btnBackInitialHeight = btnContainerHeight * 1.5;
  var initialBottom = -(btnBackInitialHeight - btnContainerHeight) / 2;

  var btnId = btn.getAttribute("id");
  var siteList = btnDropdownList[btnId];

  btnBack.style.bottom = initialBottom + 'px';
  btnBack.style.height = ( (siteList.length + 1) * 62) + `px`;

  while (btnBack.firstChild) {
    btnBack.removeChild(btnBack.firstChild);
  }

  if (siteList !== undefined) {
    siteList.forEach(function(site) {
      var a = document.createElement("a");
      if (site.route !== undefined) {
        a.href = site.route;
      } else if (site.event !== undefined) {
        a.onclick = function() {
          eval(site.event);
        };
      }
      a.textContent = site.title;
      btnBack.appendChild(a);
    });
  }

  setTimeout(function () {
    var aElements = btnBack.querySelectorAll('a');
    for (var i = 0; i < aElements.length; i++) {
      aElements[i].style.opacity = 100;
    }
  }, 100);
}

function resetBtnList(btnBack) {
  btnBack.style.height = '150%'; // Set the new height
  btnBack.style.position = ''; // Reset the 'position' property
  btnBack.style.bottom = ''; // Reset the 'bottom' property
  
  while (btnBack.firstChild) {
    btnBack.removeChild(btnBack.firstChild);
  }
}

var btnContainers = document.querySelectorAll('.BTN-CONTAINER');

btnContainers.forEach(function(btnContainer) {
  var btnBack = btnContainer.querySelector('.BTN-BACK');
  var currentBtn = null;

  var btns = btnContainer.querySelectorAll('.BTN-001'); 

  const btnDropdownList = {
    "about-btn": [{
      title: "Blog Posts",
      route: "/Blog"
    },{
      title: "Github",
      route: "https://github.com/Zerosfragile"
    },{
      title: "More",
      route: "/About"
    }],
    "projects-btn": [{
      title: "Portfolio 2023",
      route: "/Projects/Portfolio2023"
    },{
      title: "Playground",
      route: "/Projects/Playground"
    },{
      title: "More",
      route: "/Projects"
    }],
    "resume-btn": [{
      title: "PDF View",
      route: "/Resume/pdf"
    },{
      title: "More",
      route: "/Resume"
    }],
    "contact-btn": [{
      title: "Email",
      event: "showEmail()"
    },{
      title: "Github",
      route: "https://github.com/Zerosfragile"
    },{
      title: "Linkedin",
      route: "https://www.linkedin.com/in/marcus-lim-b6a721260/"
    },{
      title: "More",
      route: "/Contact"
    }],
    "replay-btn": []
  }
  btns.forEach(function(btn) {
    btn.addEventListener('mouseenter', function () {
      if (currentBtn) {
        resetBtnList(btnBack);
      }
    
      var width = getButtonWidth(btn);
      setBtnBackPosition(btnBack, btn, width);
      setTimeout(function () {
        btnBack.style.width = btnContainer.offsetWidth + 'px';
        btnBack.style.left = -0.5 + 'px';

        setTimeout(function () {
          setBtnList(btnBack, btn, btnDropdownList)
        }, 500);
      }, 500);
     currentBtn = btn;
    });
  });

  btnBack.addEventListener('mouseleave', function() {
    resetBtnList(btnBack);
    resetBtnBackPosition(btnBack);
    currentBtn = null;
  });

  btnContainer.addEventListener('mouseleave', function() {
    if (!currentBtn) {
      resetBtnBackPosition(btnBack);
    }
  });
});

// Get all the buttons with the class .BTN-001
const buttons = document.querySelectorAll('.BTN-001');

// Function to add or remove the index prefix class based on viewport width
function updateButtons() {
  updateAboutButton();
  updateButtonPrefixes();
  updateHasPrefix(buttons);
}

function updateButtonPrefixes() {
  if (window.innerWidth > 1100) {
    buttons.forEach((button) => {
      button.setAttribute('has-prefix', 'true');
    });
  } else {
    buttons.forEach((button) => {
      button.setAttribute('has-prefix', 'false');
    });
  }
}

function updateHasPrefix(elements) {
  elements.forEach((button, index) => {
    const hasPrefix = button.getAttribute('has-prefix') === 'true';
    const prefix = (index + 1).toString().padStart(2, '0') + ' // ';
    const buttonText = button.textContent.replace(/^\d+\s\/\/\s/, '');

    if (hasPrefix) {
      button.innerHTML = prefix + buttonText;
    } else {
      button.innerHTML = buttonText;
    }
  });
}

function updateAboutButton() {
  const prefixMatch = aboutBtn.innerHTML.match(/^\d+\s\/\/\s/);
  const prefixExists = !!prefixMatch;
  const prefix = prefixExists ? prefixMatch[0] : '';

  if (window.innerWidth < 850) {
    aboutBtn.textContent = prefix + 'About';
  } else {
    aboutBtn.textContent = prefix + 'About me';
  }
}



// Call the function on page load and on window resize
window.addEventListener('load', updateButtons);
window.addEventListener('resize', updateButtons);

const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", function() {
  const hudEmail = document.getElementById("HUD-EMAIL");
  // hudEmail.style.display = "none";
  hudEmail.style.opacity = 0;
  hudEmail.parentNode.style.zIndex = -1;
});