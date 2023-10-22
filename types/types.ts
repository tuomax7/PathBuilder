export interface WayPoint {
  pathID: number;
  name: string;
}

export type NewWayPointEntry = Omit<WayPoint, "pathID">;

export interface PathBase {
  pathID: number;
  name: string;
  likes: number;
}

export interface Path {
  pathID: number;
  name: string;
  likes: number;
  distance: number;
  duration: number;
  waypoints: WayPoint[];
}

export type NewPathEntry = Omit<Path, "pathID">;
