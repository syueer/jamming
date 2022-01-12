const clientId = 'c853cc6f62524ba59d0a5a3c6f1f1742';
const redirectUrl = 'http://localhost:3000?a=';

let accessToken: string = '';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // searchTerm && window.localStorage.setItem('search', searchTerm);
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];

      let expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', '', '/');
      return accessToken;
    } else {
      console.log(22222);
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;

      window.location.href = accessUrl;
    }
  },

  search(searchTerm: string) {
    const accessToken = Spotify.getAccessToken();
    console.log(accessToken);
    // localStorage.getItem('search');
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.tracks) {
          return [];
        }

        console.log(data);

        return data.tracks.items.map(
          (track: {
            id: number;
            name: string;
            artists: any;
            album: any;
            uri: string;
            preview_url: any;
          }) => ({
            // console.log(track.preview_url)
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            preview: track.preview_url,
          })
        );
      });
  },

  savePlaylist(name: string, uris: string[]) {
    if (!name || !uris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();

    console.log(accessToken);
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId: any;
    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then((response) => response.json())
      .then((data) => {
        userId = data.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name }),
        })
          .then((response) => response.json())
          .then((data) => {
            const playlistID = data.id;
            console.log(playlistID);
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: uris }),
              }
            );
          });
      });
  },
};

export default Spotify;
