import { Track } from "./Track";

export interface Playlist {
  id: string | number;
  name: string;
  public: boolean;
  description: string;
  tracks?: Track[]
}
