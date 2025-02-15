import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JankenGame from '../components/JankenGame';



describe("Test for Janken Components🤗", () => {

test('renders Tittle', () => {
  render(<JankenGame />);
  const linkElement = screen.getByText(/じゃんけん/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders 10YenCoinButton', () => {
  render(<JankenGame />);
  const linkElement = screen.getByText(/10円投入/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders 100YenCoinButton', () => {
  render(<JankenGame />);
  const linkElement = screen.getByText(/100円投入/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders MedalCount', () => {
  render(<JankenGame />);
  const linkElement = screen.getByText(/メダル数:/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Start Button', () => {
  render(<JankenGame />);
  const linkElement = screen.getByText(/START/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Gu Button', () => {
  render(<JankenGame />);
  const linkElement = screen.getByText(/✊/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Choki Button', () => {
  render(<JankenGame />);
  const linkElement = screen.getByText(/✌️/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Pa Button', () => {
  render(<JankenGame />);
  const linkElement = screen.getByText(/✋/i);
  expect(linkElement).toBeInTheDocument();
});

test('STARTボタン、✊️、✌️、✋ボタンが起動直後に押下できないことをチェック', () => {
  render(<JankenGame />);
  const startButton = screen.getByText(/START/i);
  const guButton = screen.getByText(/✊/i);
  const chokiButton = screen.getByText(/✌️/i);
  const paButton = screen.getByText(/✋/i);

  expect(startButton).toBeDisabled();
  expect(guButton).toBeDisabled();
  expect(chokiButton).toBeDisabled();
  expect(paButton).toBeDisabled();
});

test('increments medal count by 3 when 10YenCoinButton is clicked 3 times', () => {
  render(<JankenGame />);
  const tenYenButton = screen.getByText(/10円投入/i);
  const medalCountLabel = screen.getByText(/メダル数:/i);

  fireEvent.click(tenYenButton);
  fireEvent.click(tenYenButton);
  fireEvent.click(tenYenButton);

  expect(medalCountLabel).toHaveTextContent('メダル数: 3');
});


test('10円投入ボタンを1回クリックした時にメダル数ラベルが1に変化し、STARTボタンがグレーからグリーンに変化し、その上で、✊️ボタンが押下でき、かち、まけ、あいこのいずれかが表示されることをチェック', () => {
  render(<JankenGame />);
  const tenYenButton = screen.getByText(/10円投入/i);
  const startButton = screen.getByText(/START/i);
  const guButton = screen.getByText(/✊/i);

  fireEvent.click(tenYenButton);
  fireEvent.click(startButton);
  fireEvent.click(guButton);

  const judgment = screen.getByText(/かち|まけ|あいこ/i);
  expect(judgment).toBeInTheDocument();
});

test('10円投入ボタンを1回クリックした時にメダル数ラベルが1に変化し、STARTボタンがグレーからグリーンに変化し、その上で、✌️ボタンが押下でき、かち、まけ、あいこのいずれかが表示されることをチェック', () => {
  render(<JankenGame />);
  const tenYenButton = screen.getByText(/10円投入/i);
  const startButton = screen.getByText(/START/i);
  const chokiButton = screen.getByText(/✌️/i);

  fireEvent.click(tenYenButton);
  fireEvent.click(startButton);
  fireEvent.click(chokiButton);

  const judgment = screen.getByText(/かち|まけ|あいこ/i);
  expect(judgment).toBeInTheDocument();
});

test('10円投入ボタンを1回クリックした時にメダル数ラベルが1に変化し、STARTボタンがグレーからグリーンに変化し、その上で、✋ボタンが押下でき、かち、まけ、あいこのいずれかが表示されることをチェック', () => {
  render(<JankenGame />);
  const tenYenButton = screen.getByText(/10円投入/i);
  const startButton = screen.getByText(/START/i);
  const paButton = screen.getByText(/✋/i);

  fireEvent.click(tenYenButton);
  fireEvent.click(startButton);
  fireEvent.click(paButton);

  const judgment = screen.getByText(/かち|まけ|あいこ/i);
  expect(judgment).toBeInTheDocument();
});

test('10円投入ボタンを1回クリックした時にメダル数ラベルが1に変化し、STARTボタンクリック後、グレーからグリーンに変化することを確認、その差異、10円投入ボタンと100円投入ボタンがどちらも押下出来ないことを確認', () => {
  render(<JankenGame />);
  const tenYenButton = screen.getByText(/10円投入/i);
  const hundredYenButton = screen.getByText(/100円投入/i);
  const medalCountLabel = screen.getByText(/メダル数:/i);
  const startButton = screen.getByText(/START/i);

  fireEvent.click(tenYenButton);
  expect(startButton).not.toBeDisabled();

  fireEvent.click(startButton);
  expect(startButton).toBeDisabled();
  expect(tenYenButton).toBeDisabled();
  expect(hundredYenButton).toBeDisabled();
});


});