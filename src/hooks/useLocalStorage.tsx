import { useLocalStorage as useLocalStorageOrigin } from "usehooks-ts";

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  REDIRECT_TO: 'redirectTo',
  USER_NAME: 'name',
  USER_PHONE_NUMBER: 'phoneNumber',
}

type TKey = typeof LOCAL_STORAGE_KEYS[keyof typeof LOCAL_STORAGE_KEYS]

export default function useLocalStorage(key: TKey) {
  return useLocalStorageOrigin(key, '')
}