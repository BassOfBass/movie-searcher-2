export const reducerName = "tmdb-configuration";
export const thunks = {
  api: reducerName + "/fetchAPI",
  countries: reducerName + "/fetchCountries",
  jobs: reducerName + "/fetchJobs",
  languages: reducerName + "/fetchLanguages",
  primTranslations: reducerName + "/fetchPrimaryTranslations",
  timezones: reducerName + "/fetchTimezones"
}