// Generated by https://quicktype.io

import { Album } from "./Album";
import { PagingObject } from "./PagingObject";

export interface AlbumsResponse {
  albums: Album[];
}

export interface AlbumsSearchResponse {
  albums: PagingObject<Album>
}

export interface ExternalUrls {
  spotify: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalIDS {
  upc: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}


