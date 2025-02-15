import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'jotai';
import { userStatusAtom } from '../components/userStatusAtom';
import { JankenStatusAtom } from '../components/JankenStatusAtom';
import { pcHandAtom } from '../components/pcHandAtom';
import { judgementAtom } from '../components/judgementAtom';
import JankenStartButton from '../components/JankenStartButton';

const initialUserStatus = {
  totalWinCount: 0,
  medal: 10,
};

const initialJankenStatus = {
  winCount: 0,
  isGuChokiPaAble: false,
  isStartAble: true,
  isGaming: false,
};

const initialPcHand = {
  pcHand: 'waiting',
};

const initialJudgement = {
  judgement: '',
};

describe('JankenStartButton Component', () => {

  // beforeEach(() => {
  //   render(
  //     <Provider initialValues={[
  //       [userStatusAtom, initialUserStatus],
  //       [JankenStatusAtom, initialJankenStatus],
  //       [pcHandAtom, initialPcHand],
  //       [judgementAtom, initialJudgement]
  //     ]}>
  //       <JankenStartButton />
  //     </Provider>
  //   );
  // });

  test('renders start button', () => {
    render(
      <Provider initialValues={[
        [userStatusAtom, {
          totalWinCount: 0,
          medal: 10,
        }],
        [JankenStatusAtom, {
          winCount: 0,
          isGuChokiPaAble: false,
          isStartAble: true,
          isGaming: false,
        }],
        [pcHandAtom, {
          pcHand: 'waiting',
        }],
        [judgementAtom, {
          judgement: '',
        }]
      ]}>
        <JankenStartButton />
      </Provider>
    );
    const startButton = screen.getByText(/START/i);
    expect(startButton).toBeInTheDocument();
  });

  test('start button is enabled when medals are present', () => {
    render(
      <Provider initialValues={[
        [userStatusAtom, {
          totalWinCount: 0,
          medal: 10,
        }],
        [JankenStatusAtom, {
          winCount: 0,
          isGuChokiPaAble: true,
          isStartAble: true,
          isGaming: false,
        }],
        [pcHandAtom, {
          pcHand: 'waiting',
        }],
        [judgementAtom, {
          judgement: '',
        }]
      ]}>
        <JankenStartButton />
      </Provider>
    );
    const startButton = screen.getByText(/START/i);
    expect(startButton).not.toBeDisabled();
  });


  test('clicking start button starts the game and decreases medal count', () => {
    render(
      <Provider initialValues={[
        [userStatusAtom, initialUserStatus],
        [JankenStatusAtom, initialJankenStatus],
        [pcHandAtom, initialPcHand],
        [judgementAtom, initialJudgement]
      ]}>
        <JankenStartButton />
      </Provider>
    );
    const startButton = screen.getByText(/START/i);
    fireEvent.click(startButton);

    const updatedMedalCount = screen.getByText(/メダル数: 9/i);
    expect(updatedMedalCount).toBeInTheDocument();
    expect(startButton).toBeDisabled();
  });

  test('clicking start button sets pcHand to waiting', () => {
    render(
      <Provider initialValues={[
        [userStatusAtom, initialUserStatus],
        [JankenStatusAtom, initialJankenStatus],
        [pcHandAtom, initialPcHand],
        [judgementAtom, initialJudgement]
      ]}>
        <JankenStartButton />
      </Provider>
    );
    const startButton = screen.getByText(/START/i);
    fireEvent.click(startButton);

    const pcHand = screen.getByAltText(/じゃん...けん.../i);
    expect(pcHand).toBeInTheDocument();
  });

  test('clicking start button clears judgement', () => {
    render(
      <Provider initialValues={[
        [userStatusAtom, initialUserStatus],
        [JankenStatusAtom, initialJankenStatus],
        [pcHandAtom, initialPcHand],
        [judgementAtom, initialJudgement]
      ]}>
        <JankenStartButton />
      </Provider>
    );
    const startButton = screen.getByText(/START/i);
    fireEvent.click(startButton);

    const judgement = screen.queryByText(/かち|まけ|あいこ/i);
    expect(judgement).not.toBeInTheDocument();
  });

  test('start button is disabled when no medals are present', () => {
    render(
      <Provider initialValues={[
        [userStatusAtom, { ...initialUserStatus, medal: 0 }],
        [JankenStatusAtom, initialJankenStatus],
        [pcHandAtom, initialPcHand],
        [judgementAtom, initialJudgement]
      ]}>
        <JankenStartButton />
      </Provider>
    );
    const startButton = screen.getByText(/START/i);
    expect(startButton).toBeDisabled();
  });


});