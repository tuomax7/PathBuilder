export interface WayPoint {
  pathID: number;
  name: string;
}

export type NewWayPointEntry = Omit<WayPoint, "pathID">;

// Tee uusi reaktiot-tyyppi?

export interface PathBase {
  ID: number;
  name: string;
  exhausting: number;
  nature: number;
  fun: number;
}

export interface Path {
  ID: number;
  name: string;
  exhausting: number;
  nature: number;
  fun: number;
  distance: number;
  duration: number;
  waypoints: WayPoint[];
}

export type NewPathEntry = Omit<Path, "ID">;
