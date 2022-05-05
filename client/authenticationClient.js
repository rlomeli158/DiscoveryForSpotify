import * as SecureStore from "expo-secure-store";
import { setToken } from "../redux/features/token";
import * as Crypto from "expo-crypto";
import * as Random from "expo-random";
import { makeRedirectUri, startAsync } from "expo-auth-session";

const redirectUrl = makeRedirectUri({
  scheme: "myapp",
  preferLocalhost: false,
  isTripleSlashed: true,
});

const clientId = "4f0fe728346848b691b85459ebeadb89";
export function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Create the verifier and the challenge to check against it
export const createVerifierChallenge = () => {
  return new Promise(async (resolve, reject) => {
    const randomBytes = await Random.getRandomBytesAsync(32);
    const verifier = base64URLEncode(Buffer.from(randomBytes));

    const challengeBase64 = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      verifier,
      { encoding: Crypto.CryptoEncoding.BASE64 }
    );
    const challenge = challengeBase64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    resolve([verifier, challenge]);
  });
};

// Get authorization code and have the user sign into spotify
export const getAuthorizationCode = async () => {
  // Get PKCE verifier and challenge to send. This will help me not store a client secret.
  const pkceArr = await createVerifierChallenge();
  const currentVerifier = pkceArr[0];
  const currentChallenge = pkceArr[1];

  let result;
  try {
    const scopesArr = [
      "user-read-private",
      "user-read-email",
      "playlist-modify-public",
      "playlist-read-private",
      "playlist-modify-private",
      "playlist-read-collaborative",
      "user-read-recently-played",
      "user-top-read",
      "user-library-read",
      "user-library-modify",
    ];
    const scopes = scopesArr.join(" ");
    const requestUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}${
      scopes ? "&scope=" + encodeURIComponent(scopes) : ""
    }&redirect_uri=${encodeURIComponent(
      redirectUrl
    )}&code_challenge=${currentChallenge}&code_challenge_method=S256`;

    result = await startAsync({
      authUrl: requestUrl,
    });
  } catch (err) {
    console.error(err);
  }
  if (result.type !== "cancel") {
    return [result.params.code, currentVerifier];
  } else {
    return false;
  }
};

export const getTokens = async (setTokenReceived, dispatch) => {
  const existingToken = await SecureStore.getItemAsync("ACCESS_TOKEN");
  const existingExpiration = await SecureStore.getItemAsync("EXPIRATION_TIME");

  if (existingToken) {
    if (new Date().getTime() > existingExpiration) {
      await refreshTokens(setTokenReceived, dispatch);
    } else {
      console.log("Found a valid token!");
      console.log(
        (existingExpiration - new Date().getTime()) / 1000 / 60,
        "minutes left"
      );
      dispatch(setToken(existingToken));
      setTokenReceived(true);
    }
  } else {
    try {
      const resultsArr = await getAuthorizationCode();
      if (!resultsArr) {
        return null;
      }
      const authorizationCode = resultsArr[0];
      const verifier = resultsArr[1];

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${redirectUrl}&client_id=${clientId}&code_verifier=${verifier}`,
      });
      const responseJson = await response.json();

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;

      storeTokens(accessToken, refreshToken, expirationTime);
      console.log("Stored new tokens.");
      dispatch(setToken(accessToken));
      setTokenReceived(true);
    } catch (err) {
      console.error(err);
    }
  }
};

export const storeTokens = (accessToken, refreshToken, expirationTime) => {
  if (Platform.OS !== "web") {
    // Securely store the auth on your device
    SecureStore.setItemAsync("ACCESS_TOKEN", accessToken);
    SecureStore.setItemAsync("REFRESH_TOKEN", refreshToken);
    SecureStore.setItemAsync("EXPIRATION_TIME", expirationTime.toString());
  }
};

export const refreshTokens = async (setTokenReceived, dispatch) => {
  try {
    const clientId = "4f0fe728346848b691b85459ebeadb89";
    const refreshToken = await SecureStore.getItemAsync("REFRESH_TOKEN");
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${clientId}`,
    });
    const responseJson = await response.json();
    console.log("Refreshed token:", responseJson);
    if (responseJson.error) {
      await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;

      storeTokens(newAccessToken, newRefreshToken, expirationTime);
      console.log("Securely stored new tokens after refresh.");
      dispatch(setToken(newAccessToken));
      setTokenReceived(true);
    }
  } catch (err) {
    console.error(err);
  }
};

export const checkIfExpired = async () => {
  const existingToken = await SecureStore.getItemAsync("ACCESS_TOKEN");
  const existingExpiration = await SecureStore.getItemAsync("EXPIRATION_TIME");

  if (existingToken) {
    if (new Date().getTime() > existingExpiration) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};
