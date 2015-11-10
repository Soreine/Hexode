Concept
===========

## Users

A user will refer to the first ressource of the application. A user account is basically a way
to give player a way to persist their identity. In order to keep it simple for the MVP, a user
will be the association of a nickname and a password. 

## Lobby

Once a user has specified a name, he's able to see a lobby with currently available games. A
game is defined by an id - possibly a name - and also a password if required. Any user in that
position could create a new game, set a password and wait for another player. A unique url
should also be available to allow the opponent to quickly join the game. 
If more than two players tried to connect to a game instance, the first two are accepted while
the other are refused and redirected to the lobby. 
If a player leave the game before the end, he should be able to reconnect and continue the
game. However, the game isn't persisted. Meaning that the game exists only during its ongoing
lifecycle and is deleted / unacessible once finished.

## Game

Rules are simple. Two players are trying to take control of a randomly generated map, divived
in hexagonal zones. 
To do so, each player plays turn by turn a same amount of turns.
Both players start with a given amount of entities, say 50. The number of total turns is
determined by advance and known of both players. At each turn, a player may choose to place a
given number of entity on a free zone (meaning that no other entity is already occupying the
zone). A minimum of 1 entity and a maximum of 6 entities could be placed. 

Once the player has made a move, the game will evolve accordingly to three rules, in that order:

- The selected zone is now belonging to the player which did the move. This should be clearly
  identified by a color, a marker or whatever

- Each adjacent zone controlled by the opponent and for which, the amount of entity is
  strictly lower than the played zone's amount of entity is converted to the player which did
  the move, including the entities that are on the zone

- The played zone may also transfer one entity to each adjacent zone that was controlled by the
  player before making the move (the newly converted zones are not concerned). This is done for
  each adjacent zone or until there is only one entity remaining on the current zone. The
  reinforcement will be made starting by the zone in the upper right corner and doing a
  clockwise turn around the zone. 

The game is over when all turns have been played, even if a player might still possess unplayed
entities. The score is computed depending on two things: 

- The number of controlled zones
- The total number of entity, placed on the map, and under control

The player with the highest score win the game.

Application
===========

## Features

### Authentication and account
- Ensure a user is authenticated 
- Create a new user
- Login a user

### Lobby

- Display a list of available game (with 0 or 1 player)
- Create a new game
- Delete a non-started game
- Automatically delete non-active abandonned games
- Join a game 

### Game

- Display a map generated randomly
- Select a amount of entity to play
- Play an amount of entity on a zone
- Compute the score and close the game once finished

Backend
=======

## Resources

### User

name       |  type   | comment
-----------|---------|--------
id         | String  | A user unique identifier in [a-Z0-9]
username   | String  | Also unique but with utf-8 characters
password   | String  | Encrypted user password
createdAt  | Date    | The date the user registered
updatedAt  | Date    | Updated each time the user connect to the game

### Game

name       |  type   | comment
-----------|---------|--------
id         | String  | A unique game identifier in [a-Z0-9]
name       | String  | The name of the game given by its creator
createdAt  | Date    | The date the game was created
token      | String  | Token generated from the game's password, game's createdAt and a secretKey
deleted    | Boolean | Games won't be deleted. This bool would rater be set.

## Routing

Any route except the login and subscription routes are under authentication protection. Meaning
that any access will be denied unless the user has successfully been authenticated.


### Serve Static Files

> `[GET] /`   
> Home

This endpoint serves the application lobby. The lobby client will be used to show all available
game and to propose player to create either create a new game or join an existing one. There
will possibly be a chatbox available as well.

> `[GET] /login`
> Login & Register

By this route, a user may attempt to login or to register into the application. Both options are
accessibles from this route. A non-authenticated trying to access another static route like the
lobby or the game client will be redirected to this route. 

> `[GET] /play/:token`  
> Game client

This will serve the game client to the interested player. The game client will connect to the
given game token. The token is generated from a secret key, the game password and the date of
creation of the game. In the lobby, player can try to join game by retrieving the related
token, if successful, they might be redirected to the corresponding client. 

### API endpoints

> `[POST] /users/session`  
> Authenticate a user

Check and authenticate a user using given credentials.

> `[DELETE] /users/session`
> Logout a user

Used to disconnect a user from the application.

> `[POST] /users`  
> Register the user  

Handle a user subscription. 

> `[GET] /games`  
> Retrieves all ongoing available games    

This will be called regularly by the lobby to fetch existing games.

> `[GET] /games/:password`
> Retrieve a game from a given password

Return an instance of a game is the password is correct. An error otherwise.
Remark: The password has to be encrypted with itself using an hmac256 algorithm.

> `[POST] /games`  
> Create a new game

This will create a new game and made it available for another user. 

> `[DELETE] /games/:id`
> Delete an existing game

Only the creator of a game is able to delete it. Once a game is over, it will automatically be
collected by the app. Also, a game that has been started for too long and isn't finished will
be deleted by the app (after 24h for instance).

## Registration / Login process

In order to access the content of the application as the lobby and the game client, users have
to register and authenticate themselves. The authentication is done using a username and a
repeated password. This will create an account unless the username is already taken by an
existing user. To log in, a user would have to use those defined credentials. For the MVP,
there is no password recovery feature, and no way to change neither the password nor the
username. The process is really simple and should be effortless. 

Also, by default (and because this is the only available behavior), credentials are stored in a
cookie and are automatically retrieved on each access to the website. A user can get rid of the
cookie by disconnecting from the application. Otherwise, the cookie will persist until
invalidation by the browser.

## Join a game

When a game is created it is stored inside a database. A player might supply a password during
the creation that will be used to generate a token for the game as:

`token = id|hmac256(hmac256(password, password)|createdAt, secretKey)`

When a user attempt to join the game, it will be ask the game password. The lobby client will
then attempt to retrieve the game token from the api. In case of success, the user might be
redirected to the accurate game client. Otherwise, an error is thrown to the user.

## Game client

The game client is completely handling a whole game. From the moment is hasn't start and it is
waiting for players to the moment it ends. The client is a static page with a pre-encoded token
inside that allows him to communicate with the server throught a socket. The token is used as a
channel for the server which will broadcast messages to each client connected through that
channel. Once two clients have been connected to a given channel, any other client shall be
rejected. 

### Game Interfaces

The state of each game isn't persisted in a database. Game boards are stored in
memory (within a closure defined by the socket listener). The game is composed of three
entities that implement the following interfaces:

**Board**
```
    /* Number -> Number -> Player -> Unit */
    invade(id, number, player)

    /* Tiles -> Unit */
    build(tiles)

    /* 
     * return each tile that has changed since the last flush
     * Unit -> Tiles
     */
    flush()
```

**Tile**
```
    /* Player -> Unit */
    setOwner(owner)

    /* Unit -> Player */
    owner()

    /* Number -> Unit */
    setPopulation(number)

    /* Unit -> Number */
    population()

    /* Tile -> Number -> Unit */
    attach(tile, corner)

    /* Unit -> Tile[] */
    neighbors()

    /* Unit -> Number */
    id()
```

**Player**
```
    /* String -> Unit */
    setName(name)

    /* Unit -> String */
    name()

    /* Number -> Unit */
    removeEntities(number)

    /* Number -> Unit */
    init(nbEntity)
```

### Game Sockets

Game clients are connected to the server via socket. Each game define a single channel of
communication. Each client may emit some events to make the game evolves. Those events are
listed below:

- `connect { }`
- `invade { id: Number, number: Number }`
- `rename { name: String }`

The server may also emit events towards one or both clients. Here they are:

- `tilechanged { id: Number, population: Number, owner: String }`
- `playerchanged { id: Number, name: String }`
- `newround { playerId: Number, round: Number }`
- `start { }`
- `gameover { scores: Number[] }`

Also, this is not mentionned above but when emitting event through the socket, clients should
provide their access token as well. This token is used to identify the game.

### Scenarios

Here are some scenarios of what could happen during a game lifecycle :

#### Server-side

- A `connect` event is received 
    - The server check if the given token is valid
    - The server check the number of currently connected client
    - On error, the connection is closed
    - Otherwise, the client is associated to either the first or the second player (depending
      of the order of arrival)

- A `rename` event is received
    - The server check if t<F5>he given token is valid
    - The player corresponding to the current client is renamed
    - The server broadcast a `playerchanged` event

- A `connect` event is received
    - The server check if the given token is valid
    - The server check the number of currently connected client
    - On error, the connection is closed
    - Otherwise, the client is associated to either the first or the second player (depending
      of the order of arrival)
    - As this is the second player connected, the server initialize the game and broadcast an
      event `start` followed by an event `newround`

- A `rename` event is received
    - The server check if the given token is valid
    - The player corresponding to the current client is renamed
    - The server broadcast a `playerchanged` event

- An `invade` event is received
    - The server check if the given token is valid
    - The server check if the player is the one that should play
    - The server try to remove the amount of entities from the player
    - The server try to invade the board accordingly
    - The server flush the board
    - If any of these actions is errored, the initial state is recovered and a `newround` is
      emitted to start again the current round
    - Otherwise, a `tilechanged` event is emitted for each tile return by the flush
    - 





