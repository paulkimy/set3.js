/**
 * Set 3
 *
 * This assignment will develop your ability to manipulate data.
 * You should be ready for JS tutorials on more advanced topics after this.
 *
 * Please refer to the `module4/sample-data/set3-sample-data.js` file for examples of:
 * - the `socialGraph` parameter for `relationshipStatus`
 * - the `board` parameter for `ticTacToe`
 * - the `routeMap` parameter for `eta`
 */

/**
 * Relationship status
 *
 * Let's pretend that you are building a new app with social media functionality.
 * Users can have relationships with other users.
 *
 * The two guidelines for describing relationships are:
 * 1. Any user can follow any other user.
 * 2. If two users follow each other, they are considered friends.
 *
 * This function describes the relationship that two users have with each other.
 *
 * Please see the sample data for examples of `socialGraph`.
 *
 * @param {string} fromMember The subject member
 * @param {string} toMember The object member
 * @param {object} socialGraph The relationship data
 * @returns {string} "follower" if fromMember follows toMember;
 * "followed by" if fromMember is followed by toMember;
 * "friends" if fromMember and toMember follow each other;
 * "no relationship" otherwise.
 */
function relationshipStatus(fromMember, toMember, socialGraph) {
    const fromFollows = socialGraph[fromMember]?.following || [];
    const toFollows = socialGraph[toMember]?.following || [];

    const followsEachOther = fromFollows.includes(toMember) && toFollows.includes(fromMember);

    if (followsEachOther) {
        return 'friends';
    } else if (fromFollows.includes(toMember)) {
        return 'follower';
    } else if (toFollows.includes(fromMember)) {
        return 'followed by';
    } else {
        return 'no relationship';
    }
}

/**
 * Tic tac toe
 *
 * Tic Tac Toe is a common paper-and-pencil game.
 * Players must attempt to draw a line of their symbol across a grid.
 * The player that does this first is considered the winner.
 *
 * This function evaluates a Tic Tac Toe game board and returns the winner.
 *
 * Please see the sample data for examples of `board`.
 *
 * @param {Array} board The representation of the Tic Tac Toe board as a square array of arrays. The size of the array will range between 3x3 to 6x6.
 * The board will never have more than 1 winner.
 * There will only ever be 2 unique symbols at the same time.
 * @returns {string} the symbol of the winner, or "NO WINNER" if there is no winner.
 */
function ticTacToe(board) {
    const size = board.length;

    for (let row = 0; row < size; row++) {
        if (new Set(board[row]).size === 1 && board[row][0] !== '') {
            return board[row][0]; 
        }
    }

    for (let col = 0; col < size; col++) {
        const column = [];
        for (let row = 0; row < size; row++) {
            column.push(board[row][col]);
        }
        if (new Set(column).size === 1 && column[0] !== '') {
            return column[0]; 
        }
    }
  
    const mainDiagonal = [];
    const antiDiagonal = [];
    for (let i = 0; i < size; i++) {
        mainDiagonal.push(board[i][i]);
        antiDiagonal.push(board[i][size - 1 - i]);
    }
    if (new Set(mainDiagonal).size === 1 && mainDiagonal[0] !== '') {
        return mainDiagonal[0]; 
    }
    if (new Set(antiDiagonal).size === 1 && antiDiagonal[0] !== '') {
        return antiDiagonal[0]; 
    }

    return "NO WINNER"; 
}

/**
 * ETA
 *
 * A shuttle van service is tasked to travel one way along a predefined circular route.
 * The route is divided into several legs between stops.
 * The route is fully connected to itself.
 *
 * This function returns how long it will take the shuttle to arrive at a stop after leaving anothe rstop.
 *
 * Please see the sample data for examples of `routeMap`.
 *
 * @param {string} firstStop the stop that the shuttle will leave
 * @param {string} secondStop the stop that the shuttle will arrive at
 * @param {object} routeMap the data describing the routes
 * @returns {Number} the time that it will take the shuttle to travel from firstStop to secondStop
 */
function eta(firstStop, secondStop, routeMap) {
    let totalTime = 0;
    let currentStop = firstStop;

    const stops = Object.keys(routeMap);

    while (true) {
        let foundRoute = false;

        for (const route of stops) {
            const [from, to] = route.split(',');

            if (from === currentStop) {
                totalTime += routeMap[route].travel_time_mins; 
                currentStop = to; 
                foundRoute = true; 

                if (to === secondStop) {
                    return totalTime; 
                }
            }
        }

        if (!foundRoute) {
            break;
        }
        if (currentStop === firstStop) {
            break;
        }
    }
    return totalTime;
}