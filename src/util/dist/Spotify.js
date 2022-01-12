"use strict";
exports.__esModule = true;
var clientId = 'c853cc6f62524ba59d0a5a3c6f1f1742';
var redirectUrl = 'http://localhost:3000?a=';
var accessToken = '';
var Spotify = {
    getAccessToken: function () {
        if (accessToken) {
            return accessToken;
        }
        // searchTerm && window.localStorage.setItem('search', searchTerm);
        var accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        var expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            var expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(function () { return (accessToken = ''); }, expiresIn * 1000);
            window.history.pushState('Access Token', '', '/');
            return accessToken;
        }
        else {
            console.log(22222);
            var accessUrl = "https://accounts.spotify.com/authorize?client_id=" + clientId + "&response_type=token&scope=playlist-modify-public&redirect_uri=" + redirectUrl;
            window.location.href = accessUrl;
        }
    },
    search: function (searchTerm) {
        var accessToken = Spotify.getAccessToken();
        console.log(accessToken);
        // localStorage.getItem('search');
        return fetch("https://api.spotify.com/v1/search?type=track&q=" + searchTerm, {
            headers: { Authorization: "Bearer " + accessToken }
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (!data.tracks) {
                return [];
            }
            console.log(data);
            return data.tracks.items.map(function (track) { return ({
                // console.log(track.preview_url)
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                preview: track.preview_url
            }); });
        });
    },
    savePlaylist: function (name, uris) {
        if (!name || !uris.length) {
            return;
        }
        var accessToken = Spotify.getAccessToken();
        console.log(accessToken);
        var headers = { Authorization: "Bearer " + accessToken };
        var userId;
        return fetch('https://api.spotify.com/v1/me', { headers: headers })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            userId = data.id;
            return fetch("https://api.spotify.com/v1/users/" + userId + "/playlists", {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: name })
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                var playlistID = data.id;
                console.log(playlistID);
                return fetch("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistID + "/tracks", {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: uris })
                });
            });
        });
    }
};
exports["default"] = Spotify;
