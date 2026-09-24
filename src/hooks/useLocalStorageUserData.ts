import { useLocalStorage } from 'usehooks-ts';
import { UserData } from '../types/UserData';
import { userDataLocalStorageKey } from '../utils/user-data.utils';

/**
 * Read typed UserData from localStorage (kept for compatibility; cannot move to H5P's resume feature).
 */
export const useLocalStorageUserData = (): [
  UserData,
  (updatedUserData: UserData) => void,
] => {
  const [localStorageUserData, setLocalStorageUserData] =
    useLocalStorage<UserData>(userDataLocalStorageKey, {});

  return [localStorageUserData, setLocalStorageUserData];
};
