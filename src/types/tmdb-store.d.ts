namespace TMDBStore {
  interface Statuse {
    
  }

  interface Section {
    status: "idle" | "loading" | "succeeded" | "failed"
    error: null | {}
  }

  export interface Configuration extends Section {
    api: ConfigItem
    countries: ConfigItem
    jobs: ConfigItem
    languages: ConfigItem
    primTranslations: ConfigItem
    timeZones: ConfigItem
  }

  interface ConfigItem extends Section {
    config: {}
  }
}