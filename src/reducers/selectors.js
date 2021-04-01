
/**
 * @param { string[] } list
 * @param {string} mediaType
 * @returns {(state: TMDBStore.RootState) => {
 * id: string, name: string}[]} Selector
 */
export function selectGenres(list, mediaType = "movie") {
  return (state) => {
    /**
     * @type {TMDBEndpoints.Genres["genres"]}
     */
    let genreList;
    // create temp array of ids
    let tempList = [...list];
    let genres = [];

    // assign related genre list
    if (mediaType === "movie") {
      genreList = state.tmdbConfig.genres.list.movie;
    } else {
      genreList = state.tmdbConfig.genres.list.movie;
    }

    // iterate through genre list
    for (let item of genreList) {

      // break out of iteration when there is no ids
      if (tempList.length === 0) {
        break;
      }
      
      // iterate through temp list
      for (let [index, id] of tempList.entries()) {
        // if ids match
        if (item.id === Number(id)) {
          // add genre item to resulting genres
          genres.push(item);
          // remove said id out of temp and break iteration
          tempList.splice(index, 1);

          break;
        }

      }

    }
    

    return genres;
  }
}