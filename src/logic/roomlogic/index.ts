import { adjective, dessert } from './roomnames';
import { Player } from '../../store/types';

// Player
// TODO fix this :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const getUnusedPlayerId = (players: any): null | number => {
  const usedIds = new Set([1, 2, 3, 4]);
  for (const playerId in players) {
    usedIds.delete(parseInt(playerId));
  }
  return !!usedIds.size ? usedIds.values().next().value : null;
};

// Room
export const generateRoomName = (): string => {
  return adjective[getRandomInt(0, adjective.length)] + '-' + dessert[getRandomInt(0, dessert.length)];
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor((max - min) * Math.random()) + min;
};

// Reducer Utils
export const copyPlayerMapWithAdd = (
  players: Map<number, Player>,
  newId: number,
  newPlayer: Player,
): Map<number, Player> => {
  const newPlayers = new Map<number, Player>();
  players.forEach((player, id) => {
    newPlayers.set(id, player);
  });
  newPlayers.set(newId, newPlayer);
  return newPlayers;
};
