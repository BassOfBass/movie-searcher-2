
/**
 * @callback StateSelector
 * @param {TMDBStore.RootState} state
 */

/**
 * @type {StateSelector}
 * @returns {TMDBStore.Configuration}
 */
export function selectConfiguration(state) {
  return state.tmdbConfig;
}

/**
 * @type {TMDBStore.StateSelector}
 */
export function selectAllConfigs(state) {
  return Object.values(selectConfiguration(state)).map((section) => section.config);
}

/**
 * @type {TMDBStore.StateSelector}
 */
export function selectAllConfigStatuses(state) {

}