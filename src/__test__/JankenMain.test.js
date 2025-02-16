import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'jotai';
import { userStatusAtom } from '../atoms/userStatusAtom';
import { JankenStatusAtom } from '../atoms/JankenStatusAtom';
import JankenMain from '../components/JankenMain';

const initialUserStatus = {
  totalWinCount: 0,
  medal: 3,
};

const initialJankenStatus = {
  winCount: 0,
  isGuChokiPaAble: false,
  isStartAble: true,
  isGaming: false,
};

describe('JankenMain Component', () => {
  beforeEach(() => {
    render(
      <Provider initialValues={[[userStatusAtom, initialUserStatus], [JankenStatusAtom, initialJankenStatus]]}>
        <JankenMain />
      </Provider>
    );
  });

  test('renders start button', () => {
    const startButton = screen.getByText(/START/i);
    expect(startButton).toBeInTheDocument();
  });

  test('renders hand buttons', () => {
    const guButton = screen.getByText(/✊/i);
    const chokiButton = screen.getByText(/✌️/i);
    const paButton = screen.getByText(/✋/i);
    expect(guButton).toBeInTheDocument();
    expect(chokiButton).toBeInTheDocument();
    expect(paButton).toBeInTheDocument();
  });

  test('start button is disabled when no medals', () => {
    const startButton = screen.getByText(/START/i);
    fireEvent.click(startButton);
    expect(startButton).toBeDisabled();
  });

  test('increments win count and medals on win', () => {
    const tenYenButton = screen.getByText(/10円投入/i);
    fireEvent.click(tenYenButton);
    const startButton = screen.getByText(/START/i);
    fireEvent.click(startButton);
    const guButton = screen.getByText(/✊/i);
    fireEvent.click(guButton);
    const judgment = screen.getByText(/かち|まけ|あいこ/i);
    expect(judgment).toBeInTheDocument();
  });
});