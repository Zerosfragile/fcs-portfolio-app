onmessage = function(event) {
  const { frame, matrix, x1, y1, speed, damping } = event.data;
  const x = matrix[0].length;
  const y = matrix.length;
  const center = {x: Math.floor( x / 2), y: Math.floor( y / 2)};
  const result = new Array(y).fill(0).map(() => new Array(x).fill(0));

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      // Calculate the distance and angle of each point from the center
      const dx = j - center.x;
      const dy = i - center.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      // Apply the whirlpool transformation with damping
      const whirlpoolDistance = distance + frame * Math.sin(distance / 10 - frame / 7);
      const whirlpoolAngle = angle + frame / speed * whirlpoolDistance / (1 + damping * Math.abs(whirlpoolDistance));
      const whirlpoolX = Math.round(center.x + whirlpoolDistance * Math.cos(whirlpoolAngle));
      const whirlpoolY = Math.round(center.y + whirlpoolDistance * Math.sin(whirlpoolAngle));
      if (whirlpoolX >= 0 && whirlpoolX < x && whirlpoolY >= 0 && whirlpoolY < y) {
        result[i][j] = matrix[whirlpoolY][whirlpoolX];
      }
    }
  }
  
  postMessage(result);
};