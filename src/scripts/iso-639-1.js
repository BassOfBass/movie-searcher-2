// TODO: merge ISO-639-1 and ISO-3166-1 somehow
import ISO6391 from "iso-639-1";

const languageCodes = ISO6391.getAllCodes();

export const iso6391Languages = ISO6391.getLanguages(languageCodes);