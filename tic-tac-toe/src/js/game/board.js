// ══════════════════════════════════════════════════
// BOARD.JS — Board inspection and utility functions
// ══════════════════════════════════════════════════

import { BOARD_SIZE } from '../constants.js';

export function createEmptyBoard() {
  return Array(BOARD_SIZE).fill(null);
}

export function getCellValue(board, index) {
  if (index < 0 || index >= BOARD_SIZE) return null;
  return board[index];
}

export function getEmptyCells(board) {
  return board.reduce((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
}

export function isCellEmpty(board, index) {
  return board[index] === null;
}

export function isBoardFull(board) {
  return board.every(cell => cell !== null);
}

export function cloneBoard(board) {
  return [...board];
}

export function applyMove(board, index, symbol) {
  const next = cloneBoard(board);
  next[index] = symbol;
  return next;
}

export function countSymbol(board, symbol) {
  return board.filter(cell => cell === symbol).length;
}

export function remainingMoves(board) {
  return board.filter(cell => cell === null).length;
}
