export const reducerName = "tmdb-list";

export const thunkActions = {};

export const endpoints = {
  getList(id){
    return `4/list/${id}`
  },
}