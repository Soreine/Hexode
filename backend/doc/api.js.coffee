###
@apiDefine error
@apiErrorExample {json} Error-Response:
HTTP/1.1 4xx
{
    "error": <String>
}
###

###
@apiDefine userRes
@apiHeader {String} Authorization A valid user token
###

###
@apiDefine gameRes
@apiHeader {String} Authorization A valid game token
###

###
@apiDefine gameSuccess
@apiSuccessExample {json} Game:
HTTP/1.1 20x OK
{
    "id": <String>,
    "name": <String>,
    "board": {
        "tiles": [{
            "id": <Number>,
            "owner": <String>,
            "units": <Number>
        }]
    },
    "players": [{
        "id": <String>,
        "units": <Number>
    }],
    "currentRound": <Number>,
    "createdAt": <Date>
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
        "board": {
            "tiles": [{
                "owner": <String>,
                "units": <Number>
            }]
        },
        "players": [{
            "id": <String>,
            "units": <Number>
        }],
        "currentRound": <Number>,
        "createdAt": <Date>
    }]
}
###

###
@apiName AuthenticateUser
@api {get} /users/authenticate?username=:username&password=:password Retrieve a valid user token
@apiGroup User

@apiParam {String} username The user username
@apiParam {String} password The user password

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

###
@apiName GetGames
@api {get} /games Retrieve all ongoing games
@apiGroup Game
@apiUse userRes

@apiSuccess {json} 200 All available games
@apiUse gamesSuccess

@apiError {json} 401 Unauthorized: a wrong token is given
@apiUse error
@apiVersion 0.0.1
###

###
@apiName ConnectGame
@api {get} /games/authenticate?gameId=:gameId&password=:password Retrieve a valid game token
@apiGroup Game
@apiUse userRes

@apiParam {String} gameId The game id
@apiParam {String} [password] The game password

@apiSuccess {json} 200 Returns an access token for that game
@apiSuccessExample {json} Game token:
HTTP/1.1 200 OK
{
    "token": <String>
}

@apiError {json} 401 Unauthorized: a wrong token is given
@apiError {json} 403 Wrong credentials: the given password is wrong
@apiError {json} 404 Not Found: the given game does not exist
@apiUse error
@apiVersion 0.0.1
###

###
@apiName GetGame
@api {get} /games/:gameId Retrieve a specific game
@apiGroup Game
@apiUse userRes

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
@apiUse userRes

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
@api {delete} /games/:gameId
@apiGroup Game
@apiUse gameRes

@apiParam {String} gameId The game id

@apiSuccess {json} 200
@apiSuccessExample {json} Delete response:
HTTP/1.1 200 OK
null

@apiError {json} 401 Unauthorized: a wrong token is given
@apiError {json} 404 Not Found: the game does not exist
@apiUse error
@apiVersion 0.0.1
###

###
@apiName JoinGame
@api {put} /games/:gameId/join Join a game
@apiGroup Game
@apiUse gameRes

@apiParam {String} gameId The game id
@apiParam {String} userId The user id

@apiSuccess {json} 200
@apiSuccessExample {json} No content:
HTTP/1.1 200 OK
null

@apiError {json} 401 Unauthorized: a wrong token is given
@apiError {json} 403 Forbidden: the game is already full
@apiError {json} 404 Not Found: the game or the user does not exist
@apiUse error
@apiVersion 0.0.1
###

###
@apiName InvadeTile
@api {put} /games/:gameId/invade
@apiGroup Game
@apiUse gameRes

@apiParam {String} gameId The game id
@apiParam {String} userId The user id
@apiParam {Number} tileId The tile id
@apiParam {Number} units The number of units

@apiSuccess {json} 200
@apiSuccessExample {json} No content:
HTTP/1.1 200 OK
null

@apiError {json} 400 Bad Request: the tile is invalid or the amount of units is invalid
@apiError {json} 401 Unauthorized: a wrong token is given
@apiUse error
@apiVersion 0.0.1
###
