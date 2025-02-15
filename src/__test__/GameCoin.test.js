import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'jotai';
import { userStatusAtom } from '../components/userStatusAtom';
import { JankenStatusAtom } from '../components/JankenStatusAtom';
import GameCoin from '../components/GameCoin';

const initialUserStatus = {
  totalWinCount: 0,
  medal: 0,
};

const initialJankenStatus = {
  winCount: 0,
  isGuChokiPaAble: false,
  isStartAble: true,
  isGaming: false,
};

describe('GameCoin Component', () => {
  beforeEach(() => {
    render(
      <Provider initialValues={[[userStatusAtom, initialUserStatus], [JankenStatusAtom, initialJankenStatus]]}>
        <GameCoin />
      </Provider>
    );
  });

  test('renders medal count', () => {
    const medalCountElement = screen.getByText(/メダル数: 0/i);
    expect(medalCountElement).toBeInTheDocument();
  });

  test('increments medal count by 1 when 10YenCoinButton is clicked', () => {
    const tenYenButton = screen.getByText(/10円投入/i);
    fireEvent.click(tenYenButton);
    const medalCountElement = screen.getByText(/メダル数: 1/i);
    expect(medalCountElement).toBeInTheDocument();
  });

  test('increments medal count by 10 when 100YenCoinButton is clicked', () => {
    const hundredYenButton = screen.getByText(/100円投入/i);
    fireEvent.click(hundredYenButton);
    const medalCountElement = screen.getByText(/メダル数: 10/i);
    expect(medalCountElement).toBeInTheDocument();
  });
});