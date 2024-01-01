# Backend API

## Setting up the API

Set up a MySQL connection and place your credentials to **HOST**, **USER**, **PASSWORD** and **DATABASE** in the backend in a **.env** file for a production database. You can also set **HOST_DEV**, **USER_DEV**, **PASSWORD_DEV** and **DATABASE_DEV** to have a separate database connection for local development & testing.

To run the server: (`back` directory)

### `npm install`

### `npm start` to run production

### `npm run dev` to run in development mode

## API endpoints

`/api/waypoints/get`: GET all waypoints {ID, name, pathID}

`/api/paths/get`: GET all paths {ID, name, distance, duration, exhausting, nature, fun}

`/api/waypoints/insert`: POST a waypoint with body: {name, pathID}

`/api/paths/insert`: POST a path with body: {name, distance, duration, exhausting, nature, fun}

`/api/paths/:pathID/[fun/nature/exhausting]`: PUT to update the reaction count (fun, nature or exhausting) of path with **pathID**
