import { Artist } from "./Artist";
import { PagingObject } from "./PagingObject";
import { Track } from "./Track";
import { Copyright, ExternalIDS, ExternalUrls, Image } from "./Search";


export interface Album {
  id: string;
  name: string;
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  copyrights: Copyright[];
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  genres: any[];
  href: string;
  images: Image[];
  popularity: number;
  release_date: string;
  release_date_precision: string;
  tracks?: PagingObject<Track>;
  type: string;
  uri: string;
}
