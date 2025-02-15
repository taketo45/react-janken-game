import { userStatusAtom } from '../components/userStatusAtom';
import { getDefaultStore } from 'jotai';

describe('userStatusAtom', () => {
  it('should update the state correctly', () => {
    const store = getDefaultStore();
    store.set(userStatusAtom, { totalWinCount: 5, medal: 10 });
    const updatedState = store.get(userStatusAtom);
    expect(updatedState).toEqual({
      totalWinCount: 5,
      medal: 10,
    });
  });
});