###
@apiDefine error
@apiErrorExample {json} Error-Response:
HTTP/1.1 4xx
{
    "error": <String>
}
###

###
@apiDefine userAuth
@apiHeader {String} Authorization A valid user token
###

###
@apiDefine json
@apiHeader {String} X-Requested-With XMLHttpRequest
###

###
@apiDefine gameSuccess
@apiSuccessExample {json} Game:
HTTP/1.1 20x OK
{
    "id": <String>,
    "name": <String>,
    "createdAt": <Date>,
    "deleted": <Boolean>,
    "players": [{
        "id": <String>,
        "username": <Number>
    }]
}
###

###
@apiDefine gamesSuccess
@apiSuccessExample {json} Games:
HTTP/1.1 200 OK
{
    [{
        "id": <String>,
        "name": <String>,
        "createdAt": <Date>,
        "deleted": <Boolean>,
        "players": [{
            "id": <String>,
            "username": <Number>
        }]
    }]
}
###

###
@apiDefine boardSuccess
@apiSuccessExample {json} Game:
HTTP/1.1 20x OK

Board object
###

###########################################
# User management
###########################################

###
@apiName AuthenticateUser
@api {get} /users/authenticate?username=:username Retrieve a valid user token
@apiGroup User

@apiUse json
@apiHeader {String} Authorization The encoded user password

@apiParam {String} username The user username

@apiSuccess {json} 200 Returns an access token for that user
@apiSuccessExample {json} User token:
HTTP/1.1 200 OK
{
    "token": <String>
}

@apiError {json} 403 Wrong credentials
@apiUse error
@apiVersion 0.0.1
###

###
@apiName RegisterUser
@api {post} /users Register a user
@apiGroup User

@apiUse json

@apiParam {String{3..20}} username The user username
@apiParam {String{4..50}} password The user password

@apiSuccess {json} 201 The newly created user
@apiSuccessExample {json} User:
HTTP/1.1 201 Created
{
    "id": <String>,
    "username": <String>,
    "createdAt": <String>
}

@apiError {json} 400 Bad Request: invalid parameters have been passed
@apiUse error
@apiVersion 0.0.1
###

###########################################
# Game management
###########################################

###
@apiName GetGames
@api {get} /games List all ongoing games
@apiGroup Game

@apiUse json
@apiUse userAuth

@apiSuccess {json} 200 All available games
@apiUse gamesSuccess

@apiError {json} 401 Unauthorized: a wrong token is given
@apiUse error
@apiVersion 0.0.1
###

###
@apiName GetGame
@api {get} /games/:gameId Retrieve a specific game
@apiGroup Game

@apiUse json
@apiUse userAuth

@apiParam {String} gameId The game id

@apiSuccess {json} 200 The requested game
@apiUse gameSuccess

@apiError {json} 401 Unauthorized: a wrong token is given
@apiUse error
@apiVersion 0.0.1
###

###
@apiName CreateGame
@api {post} /games Create a new game
@apiGroup Game

@apiUse json
@apiUse userAuth

@apiParam {String{2..20}} name The game name
@apiParam {String{..50}} [password] The game password

@apiSuccess {json} 201 The created game
@apiUse gameSuccess

@apiError {json} 400 Bad Request: invalid parameters have been passed
@apiError {json} 401 Unauthorized: a wrong token is given
@apiUse error
@apiVersion 0.0.1
###

###
@apiName DeleteGame
@api {delete} /games/:gameId Delete a game
@apiGroup Game

@apiUse json
@apiUse userAuth

@apiParam {String} gameId The game id

@apiSuccess {json} 204
@apiSuccessExample {json} No Content:
HTTP/1.1 204 No Content
null

@apiError {json} 401 Unauthorized: a wrong token is given
@apiError {json} 404 Not Found: the game does not exist
@apiUse error
@apiVersion 0.0.1
###

###
@apiName JoinGame
@api {patch} /games/:gameId/join Join a game
@apiGroup Game

@apiUse json
@apiUse userAuth

@apiParam {String} gameId The game id
@apiParam {String} userId The user id

@apiSuccess {json} 200
@apiUse gameSuccess

@apiError {json} 401 Unauthorized: a wrong token is given
@apiError {json} 403 Forbidden: the game is already full
@apiError {json} 404 Not Found: the game or the user does not exist
@apiUse error
@apiVersion 0.0.1
###

###########################################
# Playing a game
###########################################

###
@apiName InvadeTile
@api {patch} /games/:gameId/invade Invade an available tile
@apiGroup Play

@apiUse json
@apiUse userAuth

@apiParam {String} gameId The game id
@apiParam {String} userId The user id
@apiParam {Number} tileId The tile id
@apiParam {Number} units The number of units

@apiSuccess {json} 200 The new board's state
@apiUse boardSuccess

@apiError {json} 400 Bad Request: the move is invalid
@apiError {json} 401 Unauthorized: a wrong token is given
@apiUse error
@apiVersion 0.0.1
###

###
@apiName GetBoard
@api {get} /games/:gameId/board Get a game's board state
@apiGroup Play

@apiUse json
@apiUse userAuth

@apiParam {String} gameId The game id

@apiSuccess {json} 200 The game's board
@apiUse boardSuccess

@apiError {json} 401 Unauthorized: a wrong token is given
@apiUse error
@apiVersion 0.0.1
###
