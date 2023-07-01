// Function to decode the ASCII art
function decodeRLE(input) {
  let output = "";
    let count = "";

    for (let i = 0; i < input.length; i++) {
      if (/\d/.test(input[i])) {
        count += input[i];
      } else {
        const numChars = parseInt(count, 10);
        if (numChars > 0) {
          if (numChars > 10000) {
            reject("Input contains too many repetitions");
          } else {
            output += input[i].repeat(numChars);
          }
        }
        count = "";
      }
    }
  return output;
}
// let asciiArt = [
//     // "4 1<26-2 1P1l1e1a1s1e1 1r1e1s1i1z1e1 1y1o1u1r1 1a2p1l1i1c1a1t1i1o1n1 1w1i1n1d1o1w1 1t1o1 1s2e1 1t1h1i1s1 1o1n1 1j1u1s1t1 1o1n1e1 1l1i1n1e1!1 26-1>1"
//     '177 1,1w1',
//     '169 2,1g6@1'
// ]
let asciiArt = [
    "4 1<26-2 1P1l1e1a1s1e1 1r1e1s1i1z1e1 1y1o1u1r1 1a2p1l1i1c1a1t1i1o1n1 1w1i1n1d1o1w1 1t1o1 1s2e1 1t1h1i1s1 1o1n1 1j1u1s1t1 1o1n1e1 1l1i1n1e1!1 26-1>1",
    "177 1,1w1 ",
    "169 2,1g6@1 ",
    "4 ",
    "3a4s"
];

let decodedLines = asciiArt.map(line => decodeRLE(line));
const decodedArt = decodedLines.join("\n");

const element = document.getElementById("ASCII-000");
element.innerText = decodedArt;

