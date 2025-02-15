import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider,useAtom } from 'jotai';
import { userStatusAtom } from '../components/userStatusAtom';
import GameHeader from '../components/GameHeader';

const initialState = {
  totalWinCount: 5,
  medal: 10,
};


describe('GameHeader Component', () => {
  beforeEach(() => {
    render(
      <Provider initialValues={[[userStatusAtom, initialState]]}>
        <GameHeader title="じゃんけん" />
      </Provider>
    );
  });


  test('renders title', () => {
    const linkElement = screen.getByText(/じゃんけん/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders user status', () => {

    const statusWinElement = screen.getByText(/勝ち数: 0/i);
    const statusMedalElement = screen.getByText(/メダル数： 0/i);
    expect(statusWinElement).toBeInTheDocument();
    expect(statusMedalElement).toBeInTheDocument();
  });
});