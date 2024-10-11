import { test, expect } from "@playwright/test";

test.describe("2048 Game", () => {
  test("Play on!!", async ({ page }) => {
    await page.goto("https://2048game.com/");
    await page.waitForSelector(".tile");

    //Simulate key presses
    const pressKey = async (key: string) => {
      await page.keyboard.press(key);
      await page.waitForTimeout(200);
    };

    //Get the game grid
    const getGrid = async () => {
      const gridState = await page.evaluate(() => {
        const rows = document.querySelectorAll(".tile-container .tile");
        //Identify 4x4 grid
        let grid = Array(4)
          .fill(0)
          .map(() => Array(4).fill(0));

        rows.forEach((tile: any) => {
          const value = parseInt(tile.textContent);
          const position = tile.className.match(/position-(\d)-(\d)/);
          if (position) {
            const row = parseInt(position[1]) - 1;
            const col = parseInt(position[2]) - 1;
            grid[row][col] = value;
          }
        });

        return grid;
      });

      return gridState;
    };

    //Check for the game end
    const isGameOver = async () => {
      return page.isVisible("text=Game over!");
    };

    //Do a smart move
    const smartMove = async () => {
      const gridBeforeMove = await getGrid();

      //Priority: Down > Right > Left > Up
      const moves = ["ArrowDown", "ArrowRight", "ArrowLeft", "ArrowUp"];

      //Try moves and repsect the priority
      for (let move of moves) {
        await pressKey(move);
        const gridAfterMove = await getGrid();

        //Grid changed? It was a successful move ;)
        if (JSON.stringify(gridBeforeMove) !== JSON.stringify(gridAfterMove)) {
          break;
        }
      }
    };

    //Play the game with and stop on 'Game Over' or if limit is reached!
    for (let i = 0; i < 500; i++) {
      if (await isGameOver()) {
        console.log("Game Over detected! Ending game.");
        break;
      }

      await smartMove();
    }

    console.log("Smart game automation finished!");
  });
});
