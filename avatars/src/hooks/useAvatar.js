export default function useAvatar({ canvasRef }) {
  const hexDims = {
    sideLength: 15,
    apothem: 13,
  };

  function buildHexagon(topLeftPoint) {
    return [
      topLeftPoint,
      { x: topLeftPoint.x + hexDims.sideLength, y: topLeftPoint.y },
      {
        x: topLeftPoint.x + 1.5 * hexDims.sideLength,
        y: topLeftPoint.y + hexDims.apothem,
      },
      {
        x: topLeftPoint.x + hexDims.sideLength,
        y: topLeftPoint.y + 2 * hexDims.apothem,
      },
      {
        x: topLeftPoint.x,
        y: topLeftPoint.y + 2 * hexDims.apothem,
      },
      {
        x: topLeftPoint.x - hexDims.sideLength / 2,
        y: topLeftPoint.y + hexDims.apothem,
      },
    ];
  }

  function getBoundaries(xCentre, yCentre) {
    const offset = 6;
    const boundaries = [
      {
        x: xCentre - hexDims.sideLength / 2,
        y: yCentre - hexDims.apothem - offset * 26,
      },
    ];

    let latestHex = boundaries[0];
    for (let i = 1; i <= offset; i++) {
      boundaries.push({
        x: boundaries[0].x + i * 1.5 * hexDims.sideLength,
        y: boundaries[0].y + i * hexDims.apothem,
      });
    }

    latestHex = boundaries[boundaries.length - 1];
    for (let i = 1; i <= offset; i++) {
      boundaries.push({
        x: latestHex.x,
        y: latestHex.y + 2 * i * hexDims.apothem,
      });
    }

    latestHex = boundaries[boundaries.length - 1];
    for (let i = 1; i <= offset; i++) {
      boundaries.push({
        x: latestHex.x - i * 1.5 * hexDims.sideLength,
        y: latestHex.y + i * hexDims.apothem,
      });
    }

    latestHex = boundaries[boundaries.length - 1];
    for (let i = 1; i <= offset; i++) {
      boundaries.push({
        x: latestHex.x - i * 1.5 * hexDims.sideLength,
        y: latestHex.y - i * hexDims.apothem,
      });
    }

    latestHex = boundaries[boundaries.length - 1];
    for (let i = 1; i <= offset; i++) {
      boundaries.push({
        x: latestHex.x,
        y: latestHex.y - 2 * i * hexDims.apothem,
      });
    }

    latestHex = boundaries[boundaries.length - 1];
    for (let i = 1; i <= offset - 1; i++) {
      boundaries.push({
        x: latestHex.x + i * 1.5 * hexDims.sideLength,
        y: latestHex.y - i * hexDims.apothem,
      });
    }

    return boundaries;
  }

  function drawHexagon(ctx, hexagon) {
    ctx.beginPath();
    ctx.moveTo(hexagon[0].x, hexagon[0].y);

    hexagon.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.lineTo(hexagon[0].x, hexagon[0].y);
    ctx.stroke();
  }

  function getSurroundingHexagons(hexagon) {
    return [
      hexagon.map((point) => ({
        x: point.x,
        y: point.y - 2 * hexDims.apothem,
      })),
      hexagon.map((point) => ({
        x: point.x + 1.5 * hexDims.sideLength,
        y: point.y - hexDims.apothem,
      })),
      hexagon.map((point) => ({
        x: point.x + 1.5 * hexDims.sideLength,
        y: point.y + hexDims.apothem,
      })),
      hexagon.map((point) => ({
        x: point.x,
        y: point.y + 2 * hexDims.apothem,
      })),
      hexagon.map((point) => ({
        x: point.x - 1.5 * hexDims.sideLength,
        y: point.y + hexDims.apothem,
      })),
      hexagon.map((point) => ({
        x: point.x - 1.5 * hexDims.sideLength,
        y: point.y - hexDims.apothem,
      })),
    ];
  }

  function generate() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const xCentre = canvas.width / 2;
    const yCentre = canvas.height / 2;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";

    const covered = getBoundaries(xCentre, yCentre);

    const centreHex = buildHexagon({
      x: xCentre - hexDims.sideLength / 2,
      y: yCentre - hexDims.apothem,
    });

    const surrounding = getSurroundingHexagons(centreHex);

    drawHexagon(ctx, centreHex);
    covered.push(centreHex[0]);

    const oneOrZero = Math.round(Math.random());
    surrounding.forEach((hex, index) => {
      if (index % 2 === oneOrZero) {
        drawHexagon(ctx, hex);
        covered.push(hex[0]);
      }
    });
  }

  return {
    generate,
  };
}
