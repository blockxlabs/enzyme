export const HYDRATE_APP = 'HYDRATE_APP';

export function hydrateApp(data) {
  return {
    type: HYDRATE_APP,
    payload: data,
  };
}
