import { adjective, dessert } from './roomnames';
import { Player } from '../store/types';

// Room name
export const generateRoomName = (): string => {
  return adjective[getRandomInt(0, adjective.length)] + '-' + dessert[getRandomInt(0, dessert.length)];
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor((max - min) * Math.random()) + min;
};

// Reducer Utils
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const copyPlayerMapWithUpdate = (
  players: Map<number, Player>,
  keyToUpdate: number,
  valueToUpdate: Player,
): Map<number, Player> => {
  const newPlayers = new Map<number, Player>();
  players.forEach((player, id) => {
    newPlayers.set(id, player);
  });
  newPlayers.set(keyToUpdate, valueToUpdate);
  return newPlayers;
};
