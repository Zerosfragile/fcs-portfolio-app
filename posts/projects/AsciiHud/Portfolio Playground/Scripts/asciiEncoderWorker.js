// Run-Length Encoding (RLE) function
function encodeRLE(input) {
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

// Function to decode the ASCII art
function decodeRLE(input) {
  return new Promise((resolve, reject) => {
    let output = "";
    let count = "";

    for (let i = 0; i < input.length; i++) {
      if (/\d/.test(input[i])) {
        count += input[i];
      } else if (input[i] === "!") {
        if (count === "") {
          reject("Invalid input");
          return;
        }
        const numChars = parseInt(count, 10);
        i++; // Move to the next character (the number or delimiter to be decoded)
        output += input[i].repeat(numChars);
        count = "";
      } else {
        if (count === "") {
          // If there's no count, it's a non-encoded character
          output += input[i];
        } else {
          // If there's a count, it's an RLE-encoded character
          const numChars = parseInt(count, 10);
          output += input[i].repeat(numChars);
          count = "";
        }
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