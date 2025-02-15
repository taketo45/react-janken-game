import { JankenStatusAtom } from '../components/JankenStatusAtom';
import { getDefaultStore } from 'jotai';

describe('JankenStatusAtom', () => {
  it('should have the correct initial state', () => {
    const store = getDefaultStore();
    const initialState = store.get(JankenStatusAtom);
    expect(initialState).toEqual({
      winCount: 0,
      isGuChokiPaAble: false,
      isStartAble: true,
      isGaming: false,
    });
  });
});