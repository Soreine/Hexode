define({ "api": [
  {
    "name": "ConnectGame",
    "type": "get",
    "url": "/games/authenticate?gameId=:gameId&password=:password",
    "title": "Retrieve a valid game token",
    "group": "Game",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gameId",
            "description": "<p>The game id</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "password",
            "description": "<p>The game password</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "200",
            "description": "<p>Returns an access token for that game</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Game token:",
          "content": "HTTP/1.1 200 OK\n{\n    \"token\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized: a wrong token is given</p> "
          },
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "403",
            "description": "<p>Wrong credentials: the given password is wrong</p> "
          },
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found: the given game does not exist</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4xx\n{\n    \"error\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "./api.js.coffee",
    "groupTitle": "Game",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Requested-With",
            "description": "<p>XMLHttpRequest</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid user token</p> "
          }
        ]
      }
    }
  },
  {
    "name": "CreateGame",
    "type": "post",
    "url": "/games",
    "title": "Create a new game",
    "group": "Game",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "size": "2..20",
            "optional": false,
            "field": "name",
            "description": "<p>The game name</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "size": "..50",
            "optional": true,
            "field": "password",
            "description": "<p>The game password</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "201",
            "description": "<p>The created game</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Game:",
          "content": "HTTP/1.1 20x OK\n{\n    \"id\": <String>,\n    \"name\": <String>,\n    \"currentPlayerId\": <String>,\n    \"currentRound\": <Number>,\n    \"createdAt\": <Date>,\n    \"board\": {\n        \"tiles\": [{\n            \"id\": <Number>,\n            \"owner\": <String>,\n            \"units\": <Number>\n        }]\n    },\n    \"players\": [{\n        \"id\": <String>,\n        \"units\": <Number>\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request: invalid parameters have been passed</p> "
          },
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized: a wrong token is given</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4xx\n{\n    \"error\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "./api.js.coffee",
    "groupTitle": "Game",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Requested-With",
            "description": "<p>XMLHttpRequest</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid user token</p> "
          }
        ]
      }
    }
  },
  {
    "name": "DeleteGame",
    "type": "delete",
    "url": "/games/:gameId",
    "title": "",
    "group": "Game",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gameId",
            "description": "<p>The game id</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "200",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Delete response:",
          "content": "HTTP/1.1 200 OK\nnull",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized: a wrong token is given</p> "
          },
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found: the game does not exist</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4xx\n{\n    \"error\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "./api.js.coffee",
    "groupTitle": "Game",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Requested-With",
            "description": "<p>XMLHttpRequest</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid game token</p> "
          }
        ]
      }
    }
  },
  {
    "name": "GetGame",
    "type": "get",
    "url": "/games/:gameId",
    "title": "Retrieve a specific game",
    "group": "Game",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gameId",
            "description": "<p>The game id</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "200",
            "description": "<p>The requested game</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Game:",
          "content": "HTTP/1.1 20x OK\n{\n    \"id\": <String>,\n    \"name\": <String>,\n    \"currentPlayerId\": <String>,\n    \"currentRound\": <Number>,\n    \"createdAt\": <Date>,\n    \"board\": {\n        \"tiles\": [{\n            \"id\": <Number>,\n            \"owner\": <String>,\n            \"units\": <Number>\n        }]\n    },\n    \"players\": [{\n        \"id\": <String>,\n        \"units\": <Number>\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized: a wrong token is given</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4xx\n{\n    \"error\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "./api.js.coffee",
    "groupTitle": "Game",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Requested-With",
            "description": "<p>XMLHttpRequest</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid user token</p> "
          }
        ]
      }
    }
  },
  {
    "name": "GetGames",
    "type": "get",
    "url": "/games",
    "title": "Retrieve all ongoing games",
    "group": "Game",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "200",
            "description": "<p>All available games</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Games:",
          "content": "HTTP/1.1 200 OK\n{\n    [{\n        \"id\": <String>,\n        \"name\": <String>,\n        \"currentPlayerId\": <String>,\n        \"currentRound\": <Number>,\n        \"createdAt\": <Date>,\n        \"board\": {\n            \"tiles\": [{\n                \"id\": <Number>,\n                \"owner\": <String>,\n                \"units\": <Number>\n            }]\n        },\n        \"players\": [{\n            \"id\": <String>,\n            \"units\": <Number>\n        }]\n    }]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized: a wrong token is given</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4xx\n{\n    \"error\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "./api.js.coffee",
    "groupTitle": "Game",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Requested-With",
            "description": "<p>XMLHttpRequest</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid user token</p> "
          }
        ]
      }
    }
  },
  {
    "name": "InvadeTile",
    "type": "put",
    "url": "/games/:gameId/invade",
    "title": "Invade an available tile",
    "group": "Game",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gameId",
            "description": "<p>The game id</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "tileId",
            "description": "<p>The tile id</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "units",
            "description": "<p>The number of units</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "200",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "No content:",
          "content": "HTTP/1.1 200 OK\nnull",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request: the tile is invalid or the amount of units is invalid</p> "
          },
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized: a wrong token is given</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4xx\n{\n    \"error\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "./api.js.coffee",
    "groupTitle": "Game",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Requested-With",
            "description": "<p>XMLHttpRequest</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid game token</p> "
          }
        ]
      }
    }
  },
  {
    "name": "JoinGame",
    "type": "put",
    "url": "/games/:gameId/join",
    "title": "Join a game",
    "group": "Game",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gameId",
            "description": "<p>The game id</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "userId",
            "description": "<p>The user id</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "200",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "No content:",
          "content": "HTTP/1.1 200 OK\nnull",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized: a wrong token is given</p> "
          },
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden: the game is already full</p> "
          },
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "404",
            "description": "<p>Not Found: the game or the user does not exist</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4xx\n{\n    \"error\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "./api.js.coffee",
    "groupTitle": "Game",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Requested-With",
            "description": "<p>XMLHttpRequest</p> "
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>A valid game token</p> "
          }
        ]
      }
    }
  },
  {
    "name": "AuthenticateUser",
    "type": "get",
    "url": "/users/authenticate?username=:username&password=:password",
    "title": "Retrieve a valid user token",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>The user username</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>The user password</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "200",
            "description": "<p>Returns an access token for that user</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "User token:",
          "content": "HTTP/1.1 200 OK\n{\n    \"token\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "403",
            "description": "<p>Wrong credentials</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4xx\n{\n    \"error\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "./api.js.coffee",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Requested-With",
            "description": "<p>XMLHttpRequest</p> "
          }
        ]
      }
    }
  },
  {
    "name": "RegisterUser",
    "type": "post",
    "url": "/users",
    "title": "Register a user",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "size": "3..20",
            "optional": false,
            "field": "username",
            "description": "<p>The user username</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "size": "4..50",
            "optional": false,
            "field": "password",
            "description": "<p>The user password</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "201",
            "description": "<p>The newly created user</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "User:",
          "content": "HTTP/1.1 201 Created\n{\n    \"id\": <String>,\n    \"username\": <String>,\n    \"createdAt\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "<p>json</p> ",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request: invalid parameters have been passed</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 4xx\n{\n    \"error\": <String>\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "./api.js.coffee",
    "groupTitle": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "X-Requested-With",
            "description": "<p>XMLHttpRequest</p> "
          }
        ]
      }
    }
  }
] });