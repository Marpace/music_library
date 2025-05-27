const library = {
  tracks: { 
    t01: { 
      id: "t01",
      name: "Code Monkey",
      artist: "Jonathan Coulton",
      album: "Thing a Week Three" 
    },
    t02: { 
      id: "t02",
      name: "Model View Controller",
      artist: "James Dempsey",
      album: "WWDC 2003"
    },
    t03: { 
      id: "t03",
      name: "Four Thirty-Three",
      artist: "John Cage",
      album: "Woodstock 1952"
    }
  },
  playlists: { 
    p01: { 
      id: "p01",
      name: "Coding Music",
      tracks: ["t01", "t02"]
    },
    p02: { id: "p02",
      name: "Other Playlist",
      tracks: ["t03"]
    }
  },
  printPlaylists: function() {
    const playlists = this["playlists"]
    for(let key in playlists) {
      console.log(`${key}: ${playlists[key].name} - ${playlists[key].tracks.length} tracks`)
    }
  },
  printTracks: function() {
    const tracks = this["tracks"];
    for(let key in tracks) {
      console.log(`${key}: ${tracks[key].name} by ${tracks[key].artist} (${tracks[key].album})`)
    }
  },
  printPlaylist: function(playlistId) {
    const playlists = this["playlists"];
    const tracks = this["tracks"];

    for(let key in playlists) {
      if(playlists[key].id === playlistId) {
        console.log(`${key}: ${playlists[key].name} - ${playlists[key].tracks.length} tracks`)
        playlists[key].tracks.forEach(track => {
          console.log(`${track}: ${tracks[track].name} by ${tracks[track].artist} (${tracks[track].album})`)
        })
      }
    }
  },
  addTrackToPlaylist: function(trackId, playlistId) {
    const playlists = this["playlists"];
    const tracks = this["tracks"]; 
    let trackToAdd; 

    for(let key in tracks) {
      if(tracks[key].id === trackId) trackToAdd = key;
    }

    for(let key in playlists) {
      if(playlists[key].id === playlistId) playlists[key].tracks.push(trackToAdd);
    }

    return this;
  },
  addTrack: function(name, artist, album) {
    const newTrack = {
      id: generateUid(),
      name: name,
      artist, artist,
      album: album
    }
    const numberOfTracks = Object.keys(this.tracks).length;
    const trackNumber = numberOfTracks < 10 ? `t0${numberOfTracks + 1}` : numberOfTracks + 1; 
    this.tracks[trackNumber] = newTrack;
    return this; 
  },
  addPlaylist: function(name) {
    const newPlaylist = {
      id: generateUid(),
      name: name
    }
    const numberOfPlaylists = Object.keys(this.playlists).length;
    const playlistNumber = numberOfPlaylists < 10 ? `t0${numberOfPlaylists + 1}` : numberOfPlaylists + 1; 
    this.playlists[playlistNumber] = newPlaylist;
    return this; 
  },
  printSearchResults: function(query) {
    const results = [];
    const tracks = this.tracks;
    for(let key in tracks){
      if(tracks[key].name.includes(query) || 
        tracks[key].artist.includes(query) || 
        tracks[key].album.includes(query)) {
          results.push(tracks[key])
        }
    }
    console.log(results);
  }
};

/////////////////////////////
// FUNCTIONS TO IMPLEMENT:
/////////////////////////////

// prints a list of all playlists, in the form:
// // p01: Coding Music - 2 tracks
// // p02: Other Playlist - 1 tracks
// const printPlaylists = function() {
//   const playlists = library["playlists"]
//   for(let key in playlists) {
//     console.log(`${key}: ${playlists[key].name} - ${playlists[key].tracks.length} tracks`)
//   }
// };


// // prints a list of all tracks, using the following format:
// // t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// // t02: Model View Controller by James Dempsey (WWDC 2003)
// // t03: Four Thirty-Three by John Cage (Woodstock 1952)
// const printTracks = function() {
//   const tracks = library["tracks"];
//   for(let key in tracks) {
//     console.log(`${key}: ${tracks[key].name} by ${tracks[key].artist} (${tracks[key].album})`)
//   }
// };


// prints a list of tracks for a given playlist, using the following format:
// p01: Coding Music - 2 tracks
// t01: Code Monkey by Jonathan Coulton (Thing a Week Three)
// t02: Model View Controller by James Dempsey (WWDC 2003)
//  


// adds an existing track to an existing playlist
// const addTrackToPlaylist = function(trackId, playlistId) {
//   const playlists = library["playlists"];
//   const tracks = library["tracks"]; 
//   let trackToAdd; 

//   for(let key in tracks) {
//     if(tracks[key].id === trackId) trackToAdd = key;
//   }

//   for(let key in playlists) {
//     if(playlists[key].id === playlistId) playlists[key].tracks.push(trackToAdd);
//   }

//   const updatedLibrary = {...library}

//   return updatedLibrary;
// };


// generates a unique id
// (already implemented: use this for addTrack and addPlaylist)
const generateUid = function() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};


// // adds a track to the library
// const addTrack = function(name, artist, album) {
//   let updatedLibrary = {};
//   const newTrack = {
//     id: generateUid(),
//     name: name,
//     artist, artist,
//     album: album
//   }
//   const numberOfTracks = Object.keys(library.tracks).length;
//   const trackNumber = numberOfTracks < 10 ? `t0${numberOfTracks + 1}` : numberOfTracks + 1; 
//   library.tracks[trackNumber] = newTrack;
//   updatedLibrary = {...library}; 
//   return updatedLibrary; 

// };


// // adds a playlist to the library
// const addPlaylist = function(name) {
//   let updatedLibrary = {};
//   const newPlaylist = {
//     id: generateUid(),
//     name: name
//   }
//   const numberOfPlaylists = Object.keys(library.playlists).length;
//   const playlistNumber = numberOfPlaylists < 10 ? `t0${numberOfPlaylists + 1}` : numberOfPlaylists + 1; 
//   library.playlists[playlistNumber] = newPlaylist;
//   updatedLibrary = {...library}; 
//   return updatedLibrary; 
// };


// STRETCH:
// given a query string string, prints a list of tracks
// where the name, artist or album contains the query string (case insensitive)
// tip: use "string".search("tri")
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/search
// const printSearchResults = function(query) {
//   const results = [];
//   const tracks = library.tracks;
//   for(let key in tracks){
//     if(tracks[key].name.includes(query) || 
//       tracks[key].artist.includes(query) || 
//       tracks[key].album.includes(query)) {
//         results.push(tracks[key])
//       }
//   }
//   console.log(results);
// };

library.printPlaylists();

library.printTracks();

library.printPlaylist("p01");

library.addTrackToPlaylist("t03", "p01")

library.addTrack("In The End", "Linking Park", "In The End");

library.addPlaylist("Roadtrip");

library.printSearchResults("ee");