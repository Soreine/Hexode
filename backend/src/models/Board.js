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

/* eslint-disable */

/*
 * Creates a standard board for MVP
 * () -> Board
 */
exports.createStandard = function createStandard() {
    return "Trust me, I am a standard board"; // TODO
}

/*
 * Board -> String
 */
exports.serialize = function serialize(board) {
}

/*
 * String -> Board
 */
exports.deserialize = function serialize(board) {
}

/* eslint-enable */
