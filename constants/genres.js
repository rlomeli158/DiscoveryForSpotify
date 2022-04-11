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

export const arrayOfGenres = [
  { displayName: "Acoustic", spotifyName: "acoustic" },
  { displayName: "Afrobeat", spotifyName: "afrobeat" },
  { displayName: "Alt Rock", spotifyName: "alt-rock" },
  { displayName: "Alternative", spotifyName: "alternative" },
  { displayName: "Ambient", spotifyName: "ambient" },
  { displayName: "Anime", spotifyName: "anime" },
  { displayName: "Black Metal", spotifyName: "black-metal" },
  { displayName: "Bluegrass", spotifyName: "bluegrass" },
  { displayName: "Blues", spotifyName: "blues" },
  { displayName: "Bossanova", spotifyName: "bossanova" },
  { displayName: "Brazil", spotifyName: "brazil" },
  { displayName: "Breakbeat", spotifyName: "breakbeat" },
  { displayName: "British", spotifyName: "british" },
  { displayName: "Cantopop", spotifyName: "cantopop" },
  { displayName: "Chicago House", spotifyName: "chicago-house" },
  { displayName: "Children", spotifyName: "children" },
  { displayName: "Chill", spotifyName: "chill" },
  { displayName: "Classical", spotifyName: "classical" },
  { displayName: "Club", spotifyName: "club" },
  { displayName: "Comedy", spotifyName: "comedy" },
  { displayName: "Country", spotifyName: "country" },
  { displayName: "Dance", spotifyName: "dance" },
  { displayName: "Dancehall", spotifyName: "dancehall" },
  { displayName: "Death Metal", spotifyName: "death-metal" },
  { displayName: "Deep House", spotifyName: "deep-house" },
  { displayName: "Detroit Techno", spotifyName: "detroit-techno" },
  { displayName: "Disco", spotifyName: "disco" },
  { displayName: "Disney", spotifyName: "disney" },
  { displayName: "Drum And Bass", spotifyName: "drum-and-bass" },
  { displayName: "Dub", spotifyName: "dub" },
  { displayName: "Dubstep", spotifyName: "dubstep" },
  { displayName: "Edm", spotifyName: "edm" },
  { displayName: "Electro", spotifyName: "electro" },
  { displayName: "Electronic", spotifyName: "electronic" },
  { displayName: "Emo", spotifyName: "emo" },
  { displayName: "Folk", spotifyName: "folk" },
  { displayName: "Forro", spotifyName: "forro" },
  { displayName: "French", spotifyName: "french" },
  { displayName: "Funk", spotifyName: "funk" },
  { displayName: "Garage", spotifyName: "garage" },
  { displayName: "German", spotifyName: "german" },
  { displayName: "Gospel", spotifyName: "gospel" },
  { displayName: "Goth", spotifyName: "goth" },
  { displayName: "Grindcore", spotifyName: "grindcore" },
  { displayName: "Groove", spotifyName: "groove" },
  { displayName: "Grunge", spotifyName: "grunge" },
  { displayName: "Guitar", spotifyName: "guitar" },
  { displayName: "Happy", spotifyName: "happy" },
  { displayName: "Hard Rock", spotifyName: "hard-rock" },
  { displayName: "Hardcore", spotifyName: "hardcore" },
  { displayName: "Hardstyle", spotifyName: "hardstyle" },
  { displayName: "Heavy Metal", spotifyName: "heavy-metal" },
  { displayName: "Hip Hop", spotifyName: "hip-hop" },
  { displayName: "Holidays", spotifyName: "holidays" },
  { displayName: "Honky Tonk", spotifyName: "honky-tonk" },
  { displayName: "House", spotifyName: "house" },
  { displayName: "Idm", spotifyName: "idm" },
  { displayName: "Indian", spotifyName: "indian" },
  { displayName: "Indie", spotifyName: "indie" },
  { displayName: "Indie Pop", spotifyName: "indie-pop" },
  { displayName: "Industrial", spotifyName: "industrial" },
  { displayName: "Iranian", spotifyName: "iranian" },
  { displayName: "J Dance", spotifyName: "j-dance" },
  { displayName: "J Idol", spotifyName: "j-idol" },
  { displayName: "J Pop", spotifyName: "j-pop" },
  { displayName: "J Rock", spotifyName: "j-rock" },
  { displayName: "Jazz", spotifyName: "jazz" },
  { displayName: "K Pop", spotifyName: "k-pop" },
  { displayName: "Kids", spotifyName: "kids" },
  { displayName: "Latin", spotifyName: "latin" },
  { displayName: "Latino", spotifyName: "latino" },
  { displayName: "Malay", spotifyName: "malay" },
  { displayName: "Mandopop", spotifyName: "mandopop" },
  { displayName: "Metal", spotifyName: "metal" },
  { displayName: "Metal Misc", spotifyName: "metal-misc" },
  { displayName: "Metalcore", spotifyName: "metalcore" },
  { displayName: "Minimal Techno", spotifyName: "minimal-techno" },
  { displayName: "Movies", spotifyName: "movies" },
  { displayName: "Mpb", spotifyName: "mpb" },
  { displayName: "New Age", spotifyName: "new-age" },
  { displayName: "New Release", spotifyName: "new-release" },
  { displayName: "Opera", spotifyName: "opera" },
  { displayName: "Pagode", spotifyName: "pagode" },
  { displayName: "Party", spotifyName: "party" },
  { displayName: "Philippines Opm", spotifyName: "philippines-opm" },
  { displayName: "Piano", spotifyName: "piano" },
  { displayName: "Pop", spotifyName: "pop" },
  { displayName: "Pop Film", spotifyName: "pop-film" },
  { displayName: "Post Dubstep", spotifyName: "post-dubstep" },
  { displayName: "Power Pop", spotifyName: "power-pop" },
  { displayName: "Progressive House", spotifyName: "progressive-house" },
  { displayName: "Psych Rock", spotifyName: "psych-rock" },
  { displayName: "Punk", spotifyName: "punk" },
  { displayName: "Punk Rock", spotifyName: "punk-rock" },
  { displayName: "R&B", spotifyName: "r-n-b" },
  { displayName: "Rainy Day", spotifyName: "rainy-day" },
  { displayName: "Reggae", spotifyName: "reggae" },
  { displayName: "Reggaeton", spotifyName: "reggaeton" },
  { displayName: "Road Trip", spotifyName: "road-trip" },
  { displayName: "Rock", spotifyName: "rock" },
  { displayName: "Rock & Roll", spotifyName: "rock-n-roll" },
  { displayName: "Rockabilly", spotifyName: "rockabilly" },
  { displayName: "Romance", spotifyName: "romance" },
  { displayName: "Sad", spotifyName: "sad" },
  { displayName: "Salsa", spotifyName: "salsa" },
  { displayName: "Samba", spotifyName: "samba" },
  { displayName: "Sertanejo", spotifyName: "sertanejo" },
  { displayName: "Show Tunes", spotifyName: "show-tunes" },
  { displayName: "Singer Songwriter", spotifyName: "singer-songwriter" },
  { displayName: "Ska", spotifyName: "ska" },
  { displayName: "Sleep", spotifyName: "sleep" },
  { displayName: "Songwriter", spotifyName: "songwriter" },
  { displayName: "Soul", spotifyName: "soul" },
  { displayName: "Soundtracks", spotifyName: "soundtracks" },
  { displayName: "Spanish", spotifyName: "spanish" },
  { displayName: "Study", spotifyName: "study" },
  { displayName: "Summer", spotifyName: "summer" },
  { displayName: "Swedish", spotifyName: "swedish" },
  { displayName: "Synth Pop", spotifyName: "synth-pop" },
  { displayName: "Tango", spotifyName: "tango" },
  { displayName: "Techno", spotifyName: "techno" },
  { displayName: "Trance", spotifyName: "trance" },
  { displayName: "Trip Hop", spotifyName: "trip-hop" },
  { displayName: "Turkish", spotifyName: "turkish" },
  { displayName: "Work Out", spotifyName: "work-out" },
  { displayName: "World Music", spotifyName: "world-music" },
];

export const genreObj = {
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
