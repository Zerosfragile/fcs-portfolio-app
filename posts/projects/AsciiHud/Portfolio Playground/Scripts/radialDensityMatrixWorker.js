onmessage = function(event) {
  const { frame, x, y } = event.data;
  const matrix = new Array(y);
  const centerX = x / 2;
  const centerY = y / 2;
  const scalingFactor = 2;
  const maxValue = 20;

  for (let j = 0; j < y; j++) {
    matrix[j] = new Array(x);
    for (let i = 0; i < x; i++) {
      const xCoord = (i - centerX) * scalingFactor;
      const yCoord = (j - centerY) * scalingFactor;
      const amplitude = Math.cos(frame * Math.sqrt(xCoord * xCoord + yCoord * yCoord));
      const Value = Math.max(0, Math.min(maxValue, maxValue * (amplitude + 1) / 2));
      matrix[j][i] = Value;
    }
  }

  postMessage(matrix);
};