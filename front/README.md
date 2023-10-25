# Frontend client

## Setting up the client

Create a Google Maps API project at the Cloud Console and generate an API key to place in a React environmental variable called **REACT_APP_MAPS_API**.

[https://console.cloud.google.com/google/maps-apis/overview](https://console.cloud.google.com/google/maps-apis/overview)

To run the client: (`front` directory)

### `npm install`

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view the client in your browser.

## Component structure

### src/waypoints.json

A JSON list of possible waypoint names. Initially contains places in Espoo, but can be modified to provide routes elsewhere.

### src/App.js

Contains the App root component and style theming.

### src/components

Contains the React components used, divided into map-components, path-components, and general ui-element-components.

### src/services

Services used to communicate with backend (Axios) and with the GoogleMaps API to visualize routes.

### src/utils

Extracted functions to generate a path with provided waypoints and a start and some unit converters and a map URL generator.
