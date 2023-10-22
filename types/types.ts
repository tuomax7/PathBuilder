export interface WayPoint {
  pathID: number;
  name: string;
}

export type NewWayPointEntry = Omit<WayPoint, "pathID">;

// Tee uusi reaktiot-tyyppi?

export interface PathBase {
  pathID: number;
  name: string;
  likes: number;
  exhausting?: number;
  natural?: number;
  fun?: number;
}

export interface Path {
  pathID: number;
  name: string;
  likes: number;
  exhausting?: number;
  natural?: number;
  fun?: number;
  distance: number;
  duration: number;
  waypoints: WayPoint[];
}

export type NewPathEntry = Omit<Path, "pathID">;
