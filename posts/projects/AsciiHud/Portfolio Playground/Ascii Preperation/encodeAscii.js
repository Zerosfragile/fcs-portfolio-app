
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

function encodeRLEV2(input) {
  return new Promise((resolve, reject) => {
    let output = "";
    let count = 1;
    let currentString = input[0];

    for (let i = 1; i < input.length; i++) {
      if (input[i] === currentString) {
        count++;
      } else {
        // If the current string is a number or a delimiter, prepend the delimiter
        if (/\d|!/.test(currentString)) {
          output += `${count}!${currentString}`;
        } else {
          output += `${count}${currentString}`;
        }

        count = 1;
        currentString = input[i];
      }
    }

    // Add the last string
    if (/\d|!/.test(currentString)) {
      output += `${count}!${currentString}`;
    } else {
      output += `${count}${currentString}`;
    }

    resolve(output);
  });
}

async function processAsciiArt() {
  // Get all pre tags on the page
  const preTags = document.querySelectorAll('pre');

  // Initialize the result object
  const encodedAsciiArtResults = {};

  // Loop through the pre tags
  for (const preTag of preTags) {
    // Get the ASCII art and name attribute from the pre tag
    const asciiArt = preTag.textContent;
    const name = preTag.getAttribute('name');

    // Run the encodeRLE function on the ASCII art
    const encodedAsciiArt = await encodeRLEV2(asciiArt);

    // Save the output in the object with the key being the name attribute without '.txt'
    const key = name.replace('.txt', '').trim();
    encodedAsciiArtResults[key] = encodedAsciiArt.split('\n');
  }

  // Log the object
  console.log(encodedAsciiArtResults);
}

processAsciiArt();