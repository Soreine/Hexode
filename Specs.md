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

## Feature

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
token      | String  | Token generated from the game's password, game's createdAt and a secretKey
board      | String  | A serialized version of the board. The process is describe below
createdAt  | Date    | The date the game was created
deleted    | Boolean | Games won't be deleted. This bool would rater be set.

## Routing

Any route except the login and subscription routes are under authentication protection. Meaning
that any access will be denied unless the user has successfully been authenticated.

### Serve Static Files

> `Authorization`: none  
> `[GET] /`   
> Home

This endpoints serves the application client. The client is handling all further communication
with the application. In fact, any other endpoints will be JSON-formatted responses. The client
is shared in three main parts :

- The unrestricted part where a user may attempt to login or to register into the application.
- The lobby which shows available games and offer a user to either create a new game or join an
  existing one. 
- The game itself.

### API documentation

see [here](http://ktorzpersonal.github.io/Hexode)

## Registration / Login process

In order to access the content of the application as the lobby and the game client, users have
to register and authenticate themselves. The authentication is done using a username and a
repeated password. This will create an account unless the username is already taken by an
existing user. To log in, a user would have to use those defined credentials. For the MVP,
there is no password recovery feature, and no way to change neither the password nor the
username. The process is really simple and should be effortless. 

Then, in order to login a user, the client might hit a specific endpoint of the api in order to
retrieve an access token. That token should then be transmitted through the appropriate HTTP
header on each request. As the client is for the moment provided by the application server on a
special endpoint, the login "session" is terminated with that client (when the user close the
tab or the window on its browser). 

## Join a game

When a game is created it is stored inside a database. In order to perform operation on a game,
the client needs to require an access token for that game in the similar way of what it is
doing for the user authentication. The api will then need that token as an authorization.
Requesting a token does not have any impact on the game object though. 

## Play a game

Once a client is in possesson of a game token, it is able to send request that will change the
state of a game. Those action are parts of the API and can be reached as well through HTTP. 
Then, when making a change to a given game entity the server might also emit some event through
a socket bound a defined port. Events are split into channels and does not interfer - a channel
being nothing more than a game id. Several client might be listening on a channel and are then
able to update their states accordingly. Events are detailed in the next section.

## Game details

In order to keep it simple for the MVP, all games will firstly be shaped the same way. Meaning
that tiles belong to a predefined place accordingly to their id / position. The number of units
available units is fixed to 21 (1+2+3+4+5+6), the number of rounds to 12 as well as the number
of tiles. Players have to play all of their units in 6 rounds each (the player starting being
choosen randomly) in such a way that they cannot play twice the same amount of units in a same
game (they will have to play once 1 unit, once 2 units, etc...). 
The game can start only when two players have joined. If one player is disconnected, the game
will be paused until the player recovers its access. Once the game is over, no more action can
be performed on the game. 
