import { arrayOfGenres } from "../constants/genres";

export const callSearchApi = async (searchQuery, token) => {
  let spotifyResponse = await fetch(
    `https://api.spotify.com/v1/search?q=${searchQuery}&type=track,artist`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let responseJson = await spotifyResponse.json();

  let sortedArray = responseJson.tracks.items.concat(arrayOfGenres);

  sortedArray = sortedArray.concat(responseJson.artists.items);

  const newArray = sortedArray.filter((result) => {
    const compareName = searchQuery.toLowerCase();
    if (result.displayName) {
      return result.displayName.toLowerCase().startsWith(compareName);
    } else {
      return result.name.toLowerCase().startsWith(compareName);
    }
  });

  return newArray;
};

export const callGetRecommendationsApi = async (
  selectedItems,
  limit,
  token
) => {
  let spotifyUrl = `https://api.spotify.com/v1/recommendations?&limit=${limit}&`;
  let encodedArtistIds = "";
  let encodedTrackIds = "";
  let encodedGenres = "";

  selectedItems.forEach((item) => {
    if (item.type === "artist") {
      encodedArtistIds += item.id + ",";
    } else if (item.type === "track") {
      encodedTrackIds += item.id + ",";
    } else {
      encodedGenres += item.spotifyName + ",";
    }
  });

  encodedArtistIds = encodedArtistIds.slice(0, -1);
  encodedTrackIds = encodedTrackIds.slice(0, -1);
  encodedGenres = encodedGenres.slice(0, -1);

  const decodedArray = [];

  if (encodedArtistIds) {
    decodedArray.push("seed_artists=" + encodeURIComponent(encodedArtistIds));
  }
  if (encodedTrackIds) {
    decodedArray.push("seed_tracks=" + encodeURIComponent(encodedTrackIds));
  }
  if (encodedGenres) {
    decodedArray.push("seed_genres=" + encodeURIComponent(encodedGenres));
  }

  const encodedString = decodedArray.join("&");

  try {
    let spotifyResponse = await fetch(spotifyUrl + encodedString, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let responseJson = await spotifyResponse.json();
    let recommendedTracks = responseJson.tracks;
    return recommendedTracks;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const callGetUsersTop = async (type, term = "short_term", token) => {
  const spotifyUrl = "https://api.spotify.com/v1/me/top/";

  try {
    let spotifyResponse = await fetch(
      spotifyUrl + type + `?time_range=${term}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    let responseJson = await spotifyResponse.json();
    let recommendedTracks = responseJson.items;
    return recommendedTracks;
  } catch (err) {
    console.log(err);
  }
};

export const callRecentlyPlayed = async (token) => {
  let spotifyUrl = "https://api.spotify.com/v1/me/player/recently-played";

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let responseJson = await spotifyResponse.json();

    let recommendedTracks = responseJson.items;
    return recommendedTracks;
  } catch (err) {
    console.log(err);
  }
};

export const callGetPlaylists = async (token) => {
  let spotifyUrl = "https://api.spotify.com/v1/me/playlists";

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let responseJson = await spotifyResponse.json();

    let playlists = responseJson.items;
    return playlists;
  } catch (err) {
    console.log(err);
  }
};

export const callGetPlaylistInfo = async (itemId, token) => {
  let spotifyUrl = `https://api.spotify.com/v1/playlists/${itemId}`;

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let playlistInfo = await spotifyResponse.json();

    return playlistInfo;
  } catch (err) {
    console.log(err);
  }
};

export const callGetInfo = async (type, id, token) => {
  let spotifyUrl = "";
  if (type == "artist") {
    spotifyUrl = `https://api.spotify.com/v1/artists/${id}`;
  } else if (type == "track") {
    spotifyUrl = `https://api.spotify.com/v1/tracks/${id}`;
  }

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let info = await spotifyResponse.json();

    return info;
  } catch (err) {
    console.log(err);
  }
};

export const callGetArtistTopTracks = async (id, token) => {
  let market = "";
  let spotifyUrl = `https://api.spotify.com/v1/artists/${id}/top-tracks`;

  try {
    let spotifyResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let profileInformation = await spotifyResponse.json();
    market = profileInformation.country;
  } catch (err) {
    console.log(err);
  }

  spotifyUrl = spotifyUrl + `?market=${market}`;

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let topTracksResponse = await spotifyResponse.json();
    const topTracks = topTracksResponse.tracks;

    return topTracks;
  } catch (err) {
    console.log(err);
  }
};

export const callGetArtistAlbums = async (id, token) => {
  let spotifyUrl = `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&limit=40`;

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let albumsResponse = await spotifyResponse.json();

    const albums = albumsResponse.items;

    let seenAlbumTitles = [];
    const filteredAlbums = albums.filter((album) => {
      if (!seenAlbumTitles.includes(album.name)) {
        seenAlbumTitles.push(album.name);
        return true;
      } else {
        return false;
      }
    });

    return filteredAlbums;
  } catch (err) {
    console.log(err);
  }
};

export const callGetRelatedArtists = async (id, token) => {
  let spotifyUrl = `https://api.spotify.com/v1/artists/${id}/related-artists`;

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let relatedResponse = await spotifyResponse.json();

    const relatedArtists = relatedResponse.artists;

    return relatedArtists;
  } catch (err) {
    console.log(err);
  }
};

export const callGetTrackFeatures = async (id, token) => {
  let spotifyUrl = `https://api.spotify.com/v1/audio-features/${id}`;

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let trackFeatures = await spotifyResponse.json();

    return trackFeatures;
  } catch (err) {
    console.log(err);
  }
};

export const callSaveTrack = async (id, token) => {
  let spotifyUrl = `https://api.spotify.com/v1/me/tracks?ids=${id}`;

  try {
    await fetch(spotifyUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (err) {
    console.log(err);
  }
};

export const callDeleteTrack = async (id, token) => {
  let spotifyUrl = `https://api.spotify.com/v1/me/tracks?ids=${id}`;

  try {
    await fetch(spotifyUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (err) {
    console.log(err);
  }
};

export const callCheckTrackSaveStatus = async (id, token) => {
  let spotifyUrl = `https://api.spotify.com/v1/me/tracks/contains?ids=${id}`;

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let statusResult = await spotifyResponse.json();

    return statusResult[0];
  } catch (err) {
    console.log(err);
  }
};

export const callGetAlbumInfo = async (id, token) => {
  let spotifyUrl = `https://api.spotify.com/v1/albums/${id}`;

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let albumInfo = await spotifyResponse.json();

    return albumInfo;
  } catch (err) {
    console.log(err);
  }
};

export const callGetMultipleTracksFeatures = async (trackIds, token) => {
  const encodedTrackIds = encodeURIComponent(trackIds);
  let spotifyUrl = `https://api.spotify.com/v1/audio-features?ids=${encodedTrackIds}`;

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let audioFeatures = await spotifyResponse.json();

    let acousticness = 0;
    let danceability = 0;
    let energy = 0;
    let valence = 0;
    audioFeatures.audio_features.forEach((audio) => {
      acousticness += audio.acousticness;
      danceability += audio.danceability;
      energy += audio.energy;
      valence += audio.valence;
    });

    const numOfTracks = audioFeatures.audio_features.length;
    acousticness = acousticness / numOfTracks;
    danceability = danceability / numOfTracks;
    energy = energy / numOfTracks;
    valence = valence / numOfTracks;

    const cleanedAudioFeatures = {
      acousticness: acousticness,
      danceability: danceability,
      energy: energy,
      valence: valence,
    };

    return cleanedAudioFeatures;
  } catch (err) {
    console.log(err);
  }
};

export const callGetCurrentUser = async (token) => {
  let spotifyUrl = "https://api.spotify.com/v1/me";
  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let currentUserInfo = await spotifyResponse.json();

    return currentUserInfo;
  } catch (err) {
    console.log(err);
  }
};

export const callGetUserInfo = async (userId, token) => {
  let spotifyUrl = `https://api.spotify.com/v1/users/${userId}`;

  try {
    let spotifyResponse = await fetch(spotifyUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let currentUserInfo = await spotifyResponse.json();

    return currentUserInfo;
  } catch (err) {
    console.log(err);
  }
};
