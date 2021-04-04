namespace TMDBStore {
  interface RootState {
    configuration: ConfigurationSlice
  }

  interface ConfigurationSlice {
    auth: {
      requestToken: string
      accessToken: string
      accountID: string
    }
  }
}