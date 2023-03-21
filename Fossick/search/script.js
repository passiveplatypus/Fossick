// Load the Spotify Web Playback SDK script
window.onSpotifyWebPlaybackSDKReady = () => {};

const spotifyApiKey = "YOUR_SPOTIFY_API_KEY_HERE";

// Initialize the Spotify Web Playback SDK
const player = new Spotify.Player({
  name: "Fossick Player",
  getOAuthToken: (cb) => {
    // Fetch access token from Spotify API
    fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `${spotifyApiKey}`
        )}`,
      },
      body: "grant_type=client_credentials",
    })
      .then((response) => response.json())
      .then((data) => {
        // Pass access token to Spotify SDK
        cb(data.access_token);
      });
  },
});

// Add event listeners for player state changes
player.addListener("player_state_changed", (state) => {
  console.log(state);
});

player.addListener("ready", ({ device_id }) => {
  console.log("Ready with Device ID", device_id);
});

player.addListener("not_ready", ({ device_id }) => {
  console.log("Device ID has gone offline", device_id);
});

// Connect to the Spotify Web Playback SDK
player.connect();
