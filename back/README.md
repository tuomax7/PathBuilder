# Backend API

## Setting up the API

Set up a MySQL connection and place your credentials to **HOST**, **USER**, **PASSWORD** and **DATABASE** in the backend in a **.env** file.

To run the server: (`back` directory)

### `npm install`

### `npm run server`

## API endpoints

`/api/waypoints/get`: GET all waypoints {ID, name, pathID}

`/api/paths/get`: GET all paths {ID, name, distance, duration, exhausting, nature, fun}

`/api/waypoints/insert`: POST a waypoint with body: {name, pathID}

`/api/paths/insert`: POST a path with body: {name, distance, duration, exhausting, nature, fun}

`/api/paths/:pathID/[fun/nature/exhausting]`: PUT to update the reaction count (fun, nature or exhausting) of path with **pathID**
