# 2048 Todo List

- ~~Create grid ui~~ :white_check_mark:
- ~~Initialise grid with two randomly placed values, both 2~~ :white_check_mark:

- Pressing an arrow key makes all tiles go in the specified direction until an obstacle is hit
  - End tiles move first (e.g. when up arrow key is pressed, the end tile is the top tile)
  - Turn ends when every tile hits an obstacle
- A tile moving into a tile with the same value merges into that tile and doubles the value
- If no tiles move on a term, no turn passes
- Create New Game button ui
- Clicking the New Game button immediately reinitialises the grid
- If the player creates 2048, a modal pops up with a victory message and the option to start a new game
- If the player can not make any more moves and 2048 is not created, a modal pops up with a game over message and the option to start a new game
- Create Score bar ui
- Whenever a player merges two tiles, the score increases proportional to the value of the merged tile (e.g. score += 64 when two 32 tiles merge)
- Create High score bar ui
- Whenever the player's score exceeds the current high score, set the high score value to the same as the score value
- When the tiles move, animate them to show them moving (is this possible using htmx and server-side rendering?)
