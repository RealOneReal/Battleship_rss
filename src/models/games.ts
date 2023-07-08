import { Attack, AttackResult, Cell, Game, Ship, Ships } from "../types/events";

const games:Game[] = [];

export const getGame = (id) => {
    let game = games.find(game => game.id === id);
    if(game) {
        return game;
    } else {
        game = {id, playerShips: [], turn: '', battlefields: []};
        games.push(game);
    }
    return game;
};


export const getUserShips = (gameId: number, userId:string) => {
    const game = getGame(gameId);
    const userShips = game.playerShips.find(i => i.id === userId);
    return userShips;
};

export const addUserShips = (gameId:number, userId: string, data: Ships) => {
    const game = getGame(gameId);
    const ships = data.ships;
    
    const grid = createEmptyGrid();
    placeShips(grid,ships);
    game.playerShips.push({ ships, id: userId });
    game.battlefields.push({ userId, grid });
    console.log(grid);
    game.battlefields.push({ grid: [], userId})
};

export const isGameReady = (gameId:number) => {
    const game = getGame(gameId);
    return game.playerShips.length === 2;
};

export const useAttack = (attack: Attack) => {
    const game = getGame(attack.gameId);
    const enemyGrid = game.battlefields.find(battle => battle.userId !== attack.indexPlayer);
    const result = processAttack(enemyGrid.grid, attack);
    return result;
}

const createEmptyGrid = () => {
    const gridSize = 12;
    const grid:Cell[][] = [];
    for (let x = 0; x < gridSize; x++) {
        const row = [];
        for (let y = 0; y < gridSize; y++) {
          row.push({ x: x, y: y, ship: false, hit: false });
        }
        grid.push(row);
      }
    
      return grid;
};

function placeShips(grid: Cell[][], ships: Ship[]): void {
    ships.forEach((ship) => {
      const { position, direction, length } = ship;
      const { x, y } = position;
  
      if (direction) {
        for (let i = 0; i < length; i++) {
          const targetY = y + i;
          grid[x][targetY].ship = true;
        }
      } else {
        for (let i = 0; i < length; i++) {
          const targetX = x + i;
          grid[targetX][y].ship = true;
        }
      }
    });
  }

function processAttack(grid: Cell[][], coords: Attack): AttackResult {
    const { x, y } = coords;
    const cell = grid[x][y];

    if (!cell.ship) {
        return "miss";
    }

    cell.hit = true;

    let isKilled = true;

    for (const row of grid) {
        for (const cell of row) {
            if (cell.ship  && !cell.hit) {
                isKilled = false;
                break;
            }
        }
            if (!isKilled) {
                break;
        }
    }

    return isKilled ? "killed" : "shot";
}