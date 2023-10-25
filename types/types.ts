export interface WayPoint {
  pathID: number;
  name: string;
}

export type NewWayPointEntry = Omit<WayPoint, "pathID">;

// Could be expanded later
type Reaction = number;

export interface PathBase {
  ID: number;
  name: string;
  exhausting: Reaction;
  nature: Reaction;
  fun: Reaction;
}

export interface Path {
  ID: number;
  name: string;
  exhausting: Reaction;
  nature: Reaction;
  fun: Reaction;
  distance: number;
  duration: number;
  waypoints: WayPoint[];
}

export type NewPathEntry = Omit<Path, "ID">;
