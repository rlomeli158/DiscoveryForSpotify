import { StyleSheet } from "react-native";
import SingleGenre from "./SingleGenre";
import { View } from "./Themed";

const GenreListings = ({ genreQuery, selectedItems, setSelectedItems }) => {
  return (
    <View style={styles.genreGrid}>
      {Object.entries(genreObj).map((genre) => {
        if (
          !genreQuery ||
          genre[1].displayName.toLowerCase().startsWith(genreQuery)
        ) {
          return (
            <SingleGenre
              key={genre[1].spotifyName}
              genreName={genre[1].displayName}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  genreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const getBetter = () => {
  const finalObj = {};
  genres.forEach((genre) => {
    let nameToDisplay;
    let genreNameArray = genre.split("-");
    let goodGenreNames = [];
    genreNameArray.forEach((genre) => {
      goodGenreNames.push(genre.charAt(0).toUpperCase() + genre.slice(1));
    });
    nameToDisplay = goodGenreNames.join(" ");
    if (nameToDisplay === "R N B") {
      nameToDisplay = "R&B";
    } else if (nameToDisplay === "Rock N Roll") {
      nameToDisplay = "Rock & Roll";
    }
    finalObj[genre] = {
      spotifyName: genre,
      displayName: nameToDisplay,
    };
  });
};
//const genres = [
//   "acoustic",
//   "afrobeat",
//   "alt-rock",
//   "alternative",
//   "ambient",
//   "anime",
//   "black-metal",
//   "bluegrass",
//   "blues",
//   "bossanova",
//   "brazil",
//   "breakbeat",
//   "british",
//   "cantopop",
//   "chicago-house",
//   "children",
//   "chill",
//   "classical",
//   "club",
//   "comedy",
//   "country",
//   "dance",
//   "dancehall",
//   "death-metal",
//   "deep-house",
//   "detroit-techno",
//   "disco",
//   "disney",
//   "drum-and-bass",
//   "dub",
//   "dubstep",
//   "edm",
//   "electro",
//   "electronic",
//   "emo",
//   "folk",
//   "forro",
//   "french",
//   "funk",
//   "garage",
//   "german",
//   "gospel",
//   "goth",
//   "grindcore",
//   "groove",
//   "grunge",
//   "guitar",
//   "happy",
//   "hard-rock",
//   "hardcore",
//   "hardstyle",
//   "heavy-metal",
//   "hip-hop",
//   "holidays",
//   "honky-tonk",
//   "house",
//   "idm",
//   "indian",
//   "indie",
//   "indie-pop",
//   "industrial",
//   "iranian",
//   "j-dance",
//   "j-idol",
//   "j-pop",
//   "j-rock",
//   "jazz",
//   "k-pop",
//   "kids",
//   "latin",
//   "latino",
//   "malay",
//   "mandopop",
//   "metal",
//   "metal-misc",
//   "metalcore",
//   "minimal-techno",
//   "movies",
//   "mpb",
//   "new-age",
//   "new-release",
//   "opera",
//   "pagode",
//   "party",
//   "philippines-opm",
//   "piano",
//   "pop",
//   "pop-film",
//   "post-dubstep",
//   "power-pop",
//   "progressive-house",
//   "psych-rock",
//   "punk",
//   "punk-rock",
//   "r-n-b",
//   "rainy-day",
//   "reggae",
//   "reggaeton",
//   "road-trip",
//   "rock",
//   "rock-n-roll",
//   "rockabilly",
//   "romance",
//   "sad",
//   "salsa",
//   "samba",
//   "sertanejo",
//   "show-tunes",
//   "singer-songwriter",
//   "ska",
//   "sleep",
//   "songwriter",
//   "soul",
//   "soundtracks",
//   "spanish",
//   "study",
//   "summer",
//   "swedish",
//   "synth-pop",
//   "tango",
//   "techno",
//   "trance",
//   "trip-hop",
//   "turkish",
//   "work-out",
//   "world-music",
//];

const genreObj = {
  acoustic: {
    displayName: "Acoustic",
    spotifyName: "acoustic",
  },
  afrobeat: {
    displayName: "Afrobeat",
    spotifyName: "afrobeat",
  },
  "alt-rock": {
    displayName: "Alt Rock",
    spotifyName: "alt-rock",
  },
  alternative: {
    displayName: "Alternative",
    spotifyName: "alternative",
  },
  ambient: {
    displayName: "Ambient",
    spotifyName: "ambient",
  },
  anime: {
    displayName: "Anime",
    spotifyName: "anime",
  },
  "black-metal": {
    displayName: "Black Metal",
    spotifyName: "black-metal",
  },
  bluegrass: {
    displayName: "Bluegrass",
    spotifyName: "bluegrass",
  },
  blues: {
    displayName: "Blues",
    spotifyName: "blues",
  },
  bossanova: {
    displayName: "Bossanova",
    spotifyName: "bossanova",
  },
  brazil: {
    displayName: "Brazil",
    spotifyName: "brazil",
  },
  breakbeat: {
    displayName: "Breakbeat",
    spotifyName: "breakbeat",
  },
  british: {
    displayName: "British",
    spotifyName: "british",
  },
  cantopop: {
    displayName: "Cantopop",
    spotifyName: "cantopop",
  },
  "chicago-house": {
    displayName: "Chicago House",
    spotifyName: "chicago-house",
  },
  children: {
    displayName: "Children",
    spotifyName: "children",
  },
  chill: {
    displayName: "Chill",
    spotifyName: "chill",
  },
  classical: {
    displayName: "Classical",
    spotifyName: "classical",
  },
  club: {
    displayName: "Club",
    spotifyName: "club",
  },
  comedy: {
    displayName: "Comedy",
    spotifyName: "comedy",
  },
  country: {
    displayName: "Country",
    spotifyName: "country",
  },
  dance: {
    displayName: "Dance",
    spotifyName: "dance",
  },
  dancehall: {
    displayName: "Dancehall",
    spotifyName: "dancehall",
  },
  "death-metal": {
    displayName: "Death Metal",
    spotifyName: "death-metal",
  },
  "deep-house": {
    displayName: "Deep House",
    spotifyName: "deep-house",
  },
  "detroit-techno": {
    displayName: "Detroit Techno",
    spotifyName: "detroit-techno",
  },
  disco: {
    displayName: "Disco",
    spotifyName: "disco",
  },
  disney: {
    displayName: "Disney",
    spotifyName: "disney",
  },
  "drum-and-bass": {
    displayName: "Drum And Bass",
    spotifyName: "drum-and-bass",
  },
  dub: {
    displayName: "Dub",
    spotifyName: "dub",
  },
  dubstep: {
    displayName: "Dubstep",
    spotifyName: "dubstep",
  },
  edm: {
    displayName: "Edm",
    spotifyName: "edm",
  },
  electro: {
    displayName: "Electro",
    spotifyName: "electro",
  },
  electronic: {
    displayName: "Electronic",
    spotifyName: "electronic",
  },
  emo: {
    displayName: "Emo",
    spotifyName: "emo",
  },
  folk: {
    displayName: "Folk",
    spotifyName: "folk",
  },
  forro: {
    displayName: "Forro",
    spotifyName: "forro",
  },
  french: {
    displayName: "French",
    spotifyName: "french",
  },
  funk: {
    displayName: "Funk",
    spotifyName: "funk",
  },
  garage: {
    displayName: "Garage",
    spotifyName: "garage",
  },
  german: {
    displayName: "German",
    spotifyName: "german",
  },
  gospel: {
    displayName: "Gospel",
    spotifyName: "gospel",
  },
  goth: {
    displayName: "Goth",
    spotifyName: "goth",
  },
  grindcore: {
    displayName: "Grindcore",
    spotifyName: "grindcore",
  },
  groove: {
    displayName: "Groove",
    spotifyName: "groove",
  },
  grunge: {
    displayName: "Grunge",
    spotifyName: "grunge",
  },
  guitar: {
    displayName: "Guitar",
    spotifyName: "guitar",
  },
  happy: {
    displayName: "Happy",
    spotifyName: "happy",
  },
  "hard-rock": {
    displayName: "Hard Rock",
    spotifyName: "hard-rock",
  },
  hardcore: {
    displayName: "Hardcore",
    spotifyName: "hardcore",
  },
  hardstyle: {
    displayName: "Hardstyle",
    spotifyName: "hardstyle",
  },
  "heavy-metal": {
    displayName: "Heavy Metal",
    spotifyName: "heavy-metal",
  },
  "hip-hop": {
    displayName: "Hip Hop",
    spotifyName: "hip-hop",
  },
  holidays: {
    displayName: "Holidays",
    spotifyName: "holidays",
  },
  "honky-tonk": {
    displayName: "Honky Tonk",
    spotifyName: "honky-tonk",
  },
  house: {
    displayName: "House",
    spotifyName: "house",
  },
  idm: {
    displayName: "Idm",
    spotifyName: "idm",
  },
  indian: {
    displayName: "Indian",
    spotifyName: "indian",
  },
  indie: {
    displayName: "Indie",
    spotifyName: "indie",
  },
  "indie-pop": {
    displayName: "Indie Pop",
    spotifyName: "indie-pop",
  },
  industrial: {
    displayName: "Industrial",
    spotifyName: "industrial",
  },
  iranian: {
    displayName: "Iranian",
    spotifyName: "iranian",
  },
  "j-dance": {
    displayName: "J Dance",
    spotifyName: "j-dance",
  },
  "j-idol": {
    displayName: "J Idol",
    spotifyName: "j-idol",
  },
  "j-pop": {
    displayName: "J Pop",
    spotifyName: "j-pop",
  },
  "j-rock": {
    displayName: "J Rock",
    spotifyName: "j-rock",
  },
  jazz: {
    displayName: "Jazz",
    spotifyName: "jazz",
  },
  "k-pop": {
    displayName: "K Pop",
    spotifyName: "k-pop",
  },
  kids: {
    displayName: "Kids",
    spotifyName: "kids",
  },
  latin: {
    displayName: "Latin",
    spotifyName: "latin",
  },
  latino: {
    displayName: "Latino",
    spotifyName: "latino",
  },
  malay: {
    displayName: "Malay",
    spotifyName: "malay",
  },
  mandopop: {
    displayName: "Mandopop",
    spotifyName: "mandopop",
  },
  metal: {
    displayName: "Metal",
    spotifyName: "metal",
  },
  "metal-misc": {
    displayName: "Metal Misc",
    spotifyName: "metal-misc",
  },
  metalcore: {
    displayName: "Metalcore",
    spotifyName: "metalcore",
  },
  "minimal-techno": {
    displayName: "Minimal Techno",
    spotifyName: "minimal-techno",
  },
  movies: {
    displayName: "Movies",
    spotifyName: "movies",
  },
  mpb: {
    displayName: "Mpb",
    spotifyName: "mpb",
  },
  "new-age": {
    displayName: "New Age",
    spotifyName: "new-age",
  },
  "new-release": {
    displayName: "New Release",
    spotifyName: "new-release",
  },
  opera: {
    displayName: "Opera",
    spotifyName: "opera",
  },
  pagode: {
    displayName: "Pagode",
    spotifyName: "pagode",
  },
  party: {
    displayName: "Party",
    spotifyName: "party",
  },
  "philippines-opm": {
    displayName: "Philippines Opm",
    spotifyName: "philippines-opm",
  },
  piano: {
    displayName: "Piano",
    spotifyName: "piano",
  },
  pop: {
    displayName: "Pop",
    spotifyName: "pop",
  },
  "pop-film": {
    displayName: "Pop Film",
    spotifyName: "pop-film",
  },
  "post-dubstep": {
    displayName: "Post Dubstep",
    spotifyName: "post-dubstep",
  },
  "power-pop": {
    displayName: "Power Pop",
    spotifyName: "power-pop",
  },
  "progressive-house": {
    displayName: "Progressive House",
    spotifyName: "progressive-house",
  },
  "psych-rock": {
    displayName: "Psych Rock",
    spotifyName: "psych-rock",
  },
  punk: {
    displayName: "Punk",
    spotifyName: "punk",
  },
  "punk-rock": {
    displayName: "Punk Rock",
    spotifyName: "punk-rock",
  },
  "r-n-b": {
    displayName: "R&B",
    spotifyName: "r-n-b",
  },
  "rainy-day": {
    displayName: "Rainy Day",
    spotifyName: "rainy-day",
  },
  reggae: {
    displayName: "Reggae",
    spotifyName: "reggae",
  },
  reggaeton: {
    displayName: "Reggaeton",
    spotifyName: "reggaeton",
  },
  "road-trip": {
    displayName: "Road Trip",
    spotifyName: "road-trip",
  },
  rock: {
    displayName: "Rock",
    spotifyName: "rock",
  },
  "rock-n-roll": {
    displayName: "Rock & Roll",
    spotifyName: "rock-n-roll",
  },
  rockabilly: {
    displayName: "Rockabilly",
    spotifyName: "rockabilly",
  },
  romance: {
    displayName: "Romance",
    spotifyName: "romance",
  },
  sad: {
    displayName: "Sad",
    spotifyName: "sad",
  },
  salsa: {
    displayName: "Salsa",
    spotifyName: "salsa",
  },
  samba: {
    displayName: "Samba",
    spotifyName: "samba",
  },
  sertanejo: {
    displayName: "Sertanejo",
    spotifyName: "sertanejo",
  },
  "show-tunes": {
    displayName: "Show Tunes",
    spotifyName: "show-tunes",
  },
  "singer-songwriter": {
    displayName: "Singer Songwriter",
    spotifyName: "singer-songwriter",
  },
  ska: {
    displayName: "Ska",
    spotifyName: "ska",
  },
  sleep: {
    displayName: "Sleep",
    spotifyName: "sleep",
  },
  songwriter: {
    displayName: "Songwriter",
    spotifyName: "songwriter",
  },
  soul: {
    displayName: "Soul",
    spotifyName: "soul",
  },
  soundtracks: {
    displayName: "Soundtracks",
    spotifyName: "soundtracks",
  },
  spanish: {
    displayName: "Spanish",
    spotifyName: "spanish",
  },
  study: {
    displayName: "Study",
    spotifyName: "study",
  },
  summer: {
    displayName: "Summer",
    spotifyName: "summer",
  },
  swedish: {
    displayName: "Swedish",
    spotifyName: "swedish",
  },
  "synth-pop": {
    displayName: "Synth Pop",
    spotifyName: "synth-pop",
  },
  tango: {
    displayName: "Tango",
    spotifyName: "tango",
  },
  techno: {
    displayName: "Techno",
    spotifyName: "techno",
  },
  trance: {
    displayName: "Trance",
    spotifyName: "trance",
  },
  "trip-hop": {
    displayName: "Trip Hop",
    spotifyName: "trip-hop",
  },
  turkish: {
    displayName: "Turkish",
    spotifyName: "turkish",
  },
  "work-out": {
    displayName: "Work Out",
    spotifyName: "work-out",
  },
  "world-music": {
    displayName: "World Music",
    spotifyName: "world-music",
  },
};

export default GenreListings;
