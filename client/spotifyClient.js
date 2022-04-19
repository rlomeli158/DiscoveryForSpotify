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

export const callGetUsersTop = async (type, token) => {
  const spotifyUrl = "https://api.spotify.com/v1/me/top/";

  try {
    let spotifyResponse = await fetch(spotifyUrl + type, {
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
