// We will probably use cube coordinates as explained here
// http://www.redblobgames.com/grids/hexagons/

/**
 * Board :: {
 *    currentRound: Number,
 *    totalRound: Number,
 *    currentPlayer: Number,
 *    numberOfPlayer: Number,
 *    tiles: [[[Tile]]] ? or [Tile],
 *    stocks: Depending on the rules,
 *            the stock of remaining units for each players
 * }
 */

/**
 * Tile :: {
 *    x: Number,
 *    y: Number,
 *    z: Number,
 *    units: Number,
 *    owner: Number
 * }
 */

/*
 * Creates a standard board for MVP
 * () -> Board
 */
export.createStandard = function createStandard() {
}

/*
 * Board -> String
 */
export.serialize = function serialize(board) {
}

/*
 * String -> Board
 */
export.deserialize = function serialize(board) {
}
