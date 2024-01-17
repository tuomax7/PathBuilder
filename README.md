# FindMyPath

[https://pathbuilder.herokuapp.com/](https://pathbuilder.herokuapp.com/)

An app for generating randomized routes for runs with Google Maps. Built using React, Node (with TypeScript) and MySQL. Tuomas Nummela 25.10.2023

## Instructions to run locally

### Setting up

Create a Google Maps API project at the Cloud Console and generate an API key to place in a React environmental variable called **REACT_APP_MAPS_API**.

[https://console.cloud.google.com/google/maps-apis/overview](https://console.cloud.google.com/google/maps-apis/overview)

Set up a MySQL connection and place your credentials to **HOST**, **USER**, **PASSWORD** and **DATABASE** in the backend in a **.env** file.

To run the client: (`front` directory)

### `npm install`

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view the client in your browser.

To run the server: (`back` directory)

### `npm install`

### `npm run dev`

This runs the app in the development mode.
Open [http://localhost:3001/api](http://localhost:3001/api) to access the server api.

API endpoints are described in `back/readme.MD`.

To run cypress E2E tests:

## `npm run dev` in `back`

## `npm start` in `front`

### `npm run test`
