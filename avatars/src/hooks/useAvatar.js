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
    const offset = 5;
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

  function getSurroundingHexStarts(hexStart) {
    return [
      { x: hexStart.x, y: hexStart.y - 2 * hexDims.apothem },
      {
        x: hexStart.x + 1.5 * hexDims.sideLength,
        y: hexStart.y - hexDims.apothem,
      },
      {
        x: hexStart.x + 1.5 * hexDims.sideLength,
        y: hexStart.y + hexDims.apothem,
      },
      { x: hexStart.x, y: hexStart.y + 2 * hexDims.apothem },
      {
        x: hexStart.x - 1.5 * hexDims.sideLength,
        y: hexStart.y + hexDims.apothem,
      },
      {
        x: hexStart.x - 1.5 * hexDims.sideLength,
        y: hexStart.y - hexDims.apothem,
      },
    ];
  }

  function hexInCollection(hexStart, covered) {
    for (let i = 0; i < covered.length; i++) {
      if (covered[i].x === hexStart.x && covered[i].y === hexStart.y) {
        return true;
      }
    }

    return false;
  }

  function getValidSurroundingRoutePaths(routeTails, covered, boundaries) {
    return routeTails.map((routeTail) =>
      getSurroundingHexStarts(routeTail)
        // filter out covered hexes
        .filter(
          (firstLayerHexStart) => !hexInCollection(firstLayerHexStart, covered)
        )
        // filter out hexes adjacent to more than one other hex
        .filter(
          (firstLayerHexStart) =>
            getSurroundingHexStarts(firstLayerHexStart).filter(
              (secondLayerHexStart) =>
                hexInCollection(secondLayerHexStart, covered)
            ).length === 1
        )
        // filter out hexes adjacent to a boundary
        .filter(
          (firstLayerHexStart) =>
            !hexInCollection(firstLayerHexStart, boundaries)
        )
    );
  }

  function generateRoutes(routeTails, covered, boundaries, ctx) {
    const routes = routeTails.map((routeTail) => [routeTail]);
    let validSurroundingRoutePaths = getValidSurroundingRoutePaths(
      routeTails,
      covered,
      boundaries
    );

    while (
      validSurroundingRoutePaths.some((routePath) => routePath.length > 0)
    ) {
      validSurroundingRoutePaths.forEach((potentialNextPaths, index) => {
        const randomNextPathIndex = Math.floor(
          Math.random() * Math.floor(potentialNextPaths.length)
        );
        const selectedStart = potentialNextPaths[randomNextPathIndex];

        routes[index].push(selectedStart);
        covered.push(selectedStart);
        routeTails[index] = selectedStart;
      });

      routeTails.forEach((tail) => {
        drawHexagon(ctx, buildHexagon(tail));
      });
      validSurroundingRoutePaths = getValidSurroundingRoutePaths(
        routeTails,
        covered,
        boundaries
      );
    }

    return routes;
  }

  function generate() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const xCentre = canvas.width / 2;
    const yCentre = canvas.height / 2;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";

    const boundaries = getBoundaries(xCentre, yCentre);
    boundaries.forEach((boundary) => {
      drawHexagon(ctx, buildHexagon(boundary));
    });

    const centreHexStart = {
      x: xCentre - hexDims.sideLength / 2,
      y: yCentre - hexDims.apothem,
    };

    const surroundingHexStarts = getSurroundingHexStarts(centreHexStart);

    drawHexagon(ctx, buildHexagon(centreHexStart));
    const covered = [centreHexStart];

    const oneOrZero = Math.round(Math.random());

    const routeTails = [];
    for (let i = 0; i < surroundingHexStarts.length; i++) {
      if (i % 2 === oneOrZero) {
        covered.push(surroundingHexStarts[i]);
        routeTails.push(surroundingHexStarts[i]);
        drawHexagon(ctx, buildHexagon(surroundingHexStarts[i]));
      }
    }

    const routes = generateRoutes(routeTails, covered, boundaries, ctx);

    routes.forEach((route) => {
      route.forEach((hex) => {
        drawHexagon(ctx, buildHexagon(hex));
      });
    });
  }

  return {
    generate,
  };
}
