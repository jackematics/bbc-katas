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

  function getSurroundingHexStarts(hexStart) {
    return [
      { x: hexStart.x, y: hexStart.y - 2 * hexDims.apothem},
      { x: hexStart.x + 1.5 * hexDims.sideLength, y: hexStart.y - hexDims.apothem},
      { x: hexStart.x + 1.5 * hexDims.sideLength, y: hexStart.y + hexDims.apothem},
      { x: hexStart.x, y: hexStart.y + 2 * hexDims.apothem},
      { x: hexStart.x - 1.5 * hexDims.sideLength, y: hexStart.y + hexDims.apothem},
      { x: hexStart.x - 1.5 * hexDims.sideLength, y: hexStart.y - hexDims.apothem},
    ];
  }

  function hexInCollection(hexStart, covered) {
    for (let i = 0; i < covered.length; i++) {
      if (covered[i].x === hexStart.x && covered[i].y === hexStart.y) {
        return true
      }
    }

    return false
  }
  function onlyOneAdjacent(hexStart, covered) {

    const surrounding = getSurroundingHexStarts(hexStart).filter((surroundingStart) => hexInCollection(surroundingStart, covered))

    return surrounding.length === 1
  }

  function extendTailToBoundary(ctx, hexStart, covered) {
    const validSurroundingStarts = getSurroundingHexStarts(hexStart)
      .filter((surroundingStart) => !hexInCollection(surroundingStart, covered))
      .filter((surroundingStart) => onlyOneAdjacent(surroundingStart, covered))


    if (validSurroundingStarts.length === 0) {
      return
    }

    const randomIndex = Math.floor(Math.random() * Math.floor(validSurroundingStarts.length))
    const selectedStart = validSurroundingStarts[randomIndex]

    drawHexagon(ctx, buildHexagon(selectedStart))
    covered.push(selectedStart)

    extendTailToBoundary(ctx, selectedStart, covered)

  }

  function getValidSurroundingHexStarts(routeTails, covered, boundaries) {
    return routeTails.filter((routeTail) => {
      const surroundingUncoveredFirstLayer = getSurroundingHexStarts(routeTail)
        .filter((surroundingFirstLayerItem) => !hexInCollection(surroundingFirstLayerItem, covered))

      const someAdjacentToOneUncoveredHex = surroundingUncoveredFirstLayer
        .filter((surroundingFirstLayerItem) => 
          getSurroundingHexStarts(surroundingFirstLayerItem)
          .filter((surroundingSecondLayerItem) => hexInCollection(surroundingSecondLayerItem, covered))
          .length === 1
        )

      const adjacentToBoundary = surroundingUncoveredFirstLayer.some((hexStart) => boundaries.includes(hexStart))

      return someAdjacentToOneUncoveredHex || adjacentToBoundary
    })
  }

  function routesSaturated(routeTails, covered, boundaries) {
    return routeTails.filter((routeTail) => {
      const surroundingUncoveredFirstLayer = getSurroundingHexStarts(routeTail)
        .filter((surroundingFirstLayerItem) => !hexInCollection(surroundingFirstLayerItem, covered))

      const someAdjacentToOneUncoveredHex = surroundingUncoveredFirstLayer
        .filter((surroundingFirstLayerItem) => 
          getSurroundingHexStarts(surroundingFirstLayerItem)
          .filter((surroundingSecondLayerItem) => hexInCollection(surroundingSecondLayerItem, covered))
          .length === 1
        )

      const adjacentToBoundary = surroundingUncoveredFirstLayer.some((hexStart) => boundaries.includes(hexStart))

      return someAdjacentToOneUncoveredHex || adjacentToBoundary
    }).length === 0
  }

  function saturateRoutes(ctx, routeTails, covered, boundaries) {
    let validSurroundingHexStarts = getValidSurroundingHexStarts(routeTails, covered, boundaries)
    while (validSurroundingHexStarts.length > 0) {
      
    }
  }
  

  function generate() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const xCentre = canvas.width / 2;
    const yCentre = canvas.height / 2;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";

    const boundaries = getBoundaries(xCentre, yCentre);

    const centreHexStart ={
      x: xCentre - hexDims.sideLength / 2,
      y: yCentre - hexDims.apothem,
    };

    const surroundingHexStarts = getSurroundingHexStarts(centreHexStart);

    drawHexagon(ctx, buildHexagon(centreHexStart));
    const covered = [centreHexStart]

    const tails = []
    const oneOrZero = Math.round(Math.random());
    surroundingHexStarts.forEach((hexStart, index) => {
      if (index % 2 === oneOrZero) {
        drawHexagon(ctx, buildHexagon(hexStart));
        covered.push(hexStart);
        tails.push(hexStart)
      }
    });

    
    // extendTailToBoundary(ctx, tails[0], covered)
    // extendTailToBoundary(ctx, tails[1], covered)
    // extendTailToBoundary(ctx, tails[2], covered)


  }

  return {
    generate,
  };
}
