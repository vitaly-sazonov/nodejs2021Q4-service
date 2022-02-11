# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm ci
```

## Run Docker

Install docker and docker-compose using the instruction https://docs.docker.com/get-docker/

Run command:

```
docker-compose up
```

### Testing with docker

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test:auth
```

# REST service `Artellery` test results

| Metrics                                 | Express | Fastify |
| --------------------------------------- | ------- | ------- |
| vusers.created_by_name.Test CRUD /users | 3000    | 3000    |
| http.requests                           | 6950    | 6737    |
| http.codes.401                          | 3000    | 3000    |
| http.responses                          | 4027    | 3803    |
| http.codes.200                          | 767     | 585     |
| http.codes.201                          | 106     | 88      |
| vusers.failed                           | 2923    | 2935    |
| http.codes.500                          | 77      | 65      |
| http.codes.204                          | 77      | 65      |
| vusers.completed                        | 77      | 65      |

# REST service docs

## Endpoints:

- `User` (`/users` route)

  - `GET /users` - get all users
  - `GET /users/:userId` - get the user by id (ex. “/users/123”)
  - `POST /users` - create user
  - `PUT /users/:userId` - update user
  - `DELETE /users/:userId` - delete user

- `Board` (`/boards` route)

  - `GET /boards` - get all boards
  - `GET /boards/:boardId` - get the board by id
  - `POST /boards` - create board
  - `PUT /boards/:boardId` - update board
  - `DELETE /boards/:boardId` - delete board

* `Task` (`boards/:boardId/tasks` route)

  - `GET /boards/:boardId/tasks` - get all tasks
  - `GET /boards/:boardId/tasks/:taskId` - get the task by id
  - `POST /boards/:boardId/tasks` - create task
  - `PUT /boards/:boardId/tasks/:taskId` - update task
  - `DELETE /boards/:boardId/tasks/:taskId` - delete task

* `Column` (`boards/:boardId/tasks` route)

  - `GET /columns` - get all columns
  - `GET /columns/:columnsId` - get the column by id
  - `POST /columns/:columnsId` - create column
  - `PUT /columns/:columnsId` - update column
  - `DELETE /columns/:columnsId` - delete column

* `File` (`boards/:boardId/tasks` route)
  - `GET file/:filename/` - download file
  - `POST file/` - upload file `multipart/form-data`
