# 2048

In this kata we are going to be building the puzzle game 2048. 2048 is a single-player sliding tile puzzle game. The goal is to slide numbered tiles on a grid to create the number 2048. Online example: https://2048game.com/

## Components

The components of the game are as follows:

- A 4x4 puzzle grid
- Tiles with values on them. These values can be as low as 2, has no maximum, and increase in powers of 2: 2, 4, 8, 16, 32, 64...

## Rules

The game starts with a grid, and two tiles, each with the value 2, each intialised on a random square of the grid. When a player presses an arrow key:

- All tiles in the grid moves in the direction of the arrow key until stopped by an obstacle.
- An obstacle is either the grid boundary or another tile that has a different value to the moving tile.
- If a tile A moves into tile B with the same value, these tiles both merge into tile B with the value doubled.
- If no tiles move on a turn, nothing happens.
- When all tiles have finished moving, a new tile with value 2 is generated on a random empty square in the grid.
- The tiles that move first should get priority in a merge e.g. when moving right: 0,2,2,2 -> 0,0,2,4

A player wins if they create a tile with value 2048.
A player loses if all grid square are filled with tiles and no more movements can be made.

## Extensions

### Add a scoring system

- A player's score should increment whenever two tiles merge
- There should be a high-score that tracks the player's best score across the session
- Whenever a player's score is greater than the high-score, the high-score should update accordingly when the game ends.

### UI

Make it look fancy!!!
