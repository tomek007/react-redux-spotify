import { Artist } from "./Artist";
import { ExternalUrls } from "./Search";


export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  popularity: number
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
