import axios, { AxiosError } from "axios";
import { auth } from ".";
import { Album } from "../model/Album";
import { AlbumsSearchResponse } from "../model/Search";


export class MusicSearch {

  constructor() { }

  async getAlbumById(id: string) {
    const res = await axios.get<Album>(`https://api.spotify.com/v1/albums/${id}`)
    return res.data
  }

  searchAlbums(query: string) {
    return axios.get<AlbumsSearchResponse>(
      'https://api.spotify.com/v1/search', {
      params: {
        type: 'album', q: query
      },
    })
      .then(res => res.data.albums.items)

  }

}