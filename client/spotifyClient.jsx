import { arrayOfGenres } from "../constants/genres";

const token =
  "BQC-p_8HOPyv7l_7keN5lYpYnf0r7B6iM7vAJCrtg_hHXBUYcN4GNoq_KPHQ_b1fFsqTQDEiVHEzbFS2oqrzjDOq15FNsof92MRO7clAajZRZUFcmAN9vkVTL_O4tvJ2kir2DbXlhZpkDw";

export const callSearchApi = async (searchQuery) => {
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

export const callGetRecommendationsApi = async (selectedItems, limit) => {
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
