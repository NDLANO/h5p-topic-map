import { useLocalStorage } from 'usehooks-ts';
import { UserData } from '../types/UserData';
import { userDataLocalStorageKey } from '../utils/user-data.utils';

/**
 * Read the stored data from local storage based on the current default storage key.
 * Return a UserData object with correct types and a function to update it.
 * Not a fan of using the localStorage, but it has been here from the start, and
 * the code needs to remain in order to stay compatible - we cannot simply move to
 * H5P's resume feature.
 */
export const useLocalStorageUserData = (): [
  UserData,
  (updatedUserData: UserData) => void,
] => {
  const [localStorageUserData, setLocalStorageUserData] =
    useLocalStorage<UserData>(userDataLocalStorageKey, {});

  return [localStorageUserData, setLocalStorageUserData];
};
