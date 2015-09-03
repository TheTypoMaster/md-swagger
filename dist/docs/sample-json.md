# Demo markdown for md swagger

## JSON from a file or url (swagger-url)

```swagger-url
/md-swagger/dist/docs/swagger.json
```


## Empedded JSON (swagger-json)

```swagger-json
{
    "swagger": "2.0",
    "host": "status.vdmstest.com",
    "basePath": "/api/v1",
    "tags": [
        {
            "name": "status",
            "description": "status for each pop"
        },
		{
            "name": "statussummary",
            "description": "status summary"
        },
		{
            "name": "users",
            "description": "admin users"
        }
    ],
    "schemes": [
        "http"
    ],
    "paths": {
		 "/users": {
            "get": {
                "tags": [
                    "users"
                ],
                "summary": "Get Users",
                "description": "Get Network Status Admin Users",
				"operationId":"getUsers",
                "produces": [
                    "application/json"
                ],
                "parameters": [],
                "responses": {
                    "default": {
                        "description": "successful operation"
                    },
					"401":{
						"description": "unauthorized"
					}
                }
            }
        },
        "/status": {
            "get": {
                "tags": [
                    "status"
                ],
                "summary": "Get Status",
                "description": "Get Network Status For POPS",
				"operationId":"getStatus",
                "produces": [
                    "application/json"
                ],
                "parameters": [

                ],
                "responses": {
                    "default": {
                        "description": "successful operation"
                    },
					"401":{
						"description": "unauthorized"
					}
                }
            }
        },
		"/status/summary":{
			"get":{
				"tags": [
                    "status"
                ],
				"summary":"Get Status Summary",
				"description": "Get Network Status summary for POPS",
				"operationId":"getStatusSummary",
				"parameters": [
					{
						"name": "Category",
						"in": "query",
						"description": "categories to filter by",
						"type": "string"
					},
					{
						"name": "Service",
						"in": "query",
						"description": "categories to filter by",
						"type": "string"
					}
                ]
			}
		}
    },
    "securityDefinitions": {
        "api_key": {
            "type": "apiKey",
            "name": "api_key",
            "in": "header"
        }
    },
    "definitions": {
        "User": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int64"
                },
                "username": {
                    "type": "string"
                },
                "firstName": {
                    "type": "string"
                },
                "lastName": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "phone": {
                    "type": "string"
                },
                "userStatus": {
                    "type": "integer",
                    "format": "int32",
                    "description": "User Status"
                }
            },
            "xml": {
                "name": "User"
            }
        },
        "ApiResponse": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "integer",
                    "format": "int32"
                },
                "type": {
                    "type": "string"
                },
                "message": {
                    "type": "string"
                }
            }
        }
    }
}
```


MD Swagger UI Version | Release Date | Swagger Spec compatibility | Notes
------------------ | ------------ | -------------------------- | -----
1.5.0              | 2015-08-05   | 1.1, 1.2, 2.0              | [master](https://github.com/IRVUI/md-swagger)
