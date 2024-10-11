# 2048 Game Automation using Playwright

This project automates playing the [2048 game](https://2048game.com/) using Playwright's test runner. The automation simulates player moves and attempts to maximize the score while stopping when the "Game Over" screen is detected.

## Prerequisites

To run this project, you need to have:

1. [Node.js](https://nodejs.org/en/) (version 14 or later).
2. [Playwright Test](https://playwright.dev/docs/intro) installed.

## Run the game

To run the 2048 game with Playwright, use:

`npx playwright test`

The test will run automatically:

1. Navigate to the 2048 game website.
2. Perform smart moves based on a priority (Down > Right > Left > Up).
3. Stop if the "Game Over" screen is detected.

### Test Logic

The automation runs a loop that:

- Retrieves the current grid state after each move.
- Performs moves in a prioritized order (Down, Right, Left, Up).
- Checks if the game is over by detecting the "Game over!" message.
- Stops the automation once the game ends or after a predefined number of moves.

HAVE FUN!!!

NS K:)HN
