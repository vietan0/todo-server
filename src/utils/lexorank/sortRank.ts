import { LexoRank } from 'lexorank';

export function sortRank(ranks: (string | null)[]) {
  const filtered = ranks.filter((r) => r !== null) as string[];

  return filtered.sort((a: string, b: string) =>
    LexoRank.parse(a).compareTo(LexoRank.parse(b)),
  );
}

/**
 * Generates a new rank by incrementing `count` times from the middle rank.
 *
 * @param count - The number of times to increment the rank. Default is 0.
 * @return The generated rank as a string.
 */
export function genNextByCount(count = 0) {
  let mid = LexoRank.middle();

  for (let i = 0; i < count; i++) {
    mid = mid.genNext();
  }

  return mid.toString();
}
