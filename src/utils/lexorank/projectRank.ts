import { Project } from '@prisma/client';
import { LexoRank } from 'lexorank';

import prisma from '../../prisma/client.js';
import latestFirst from './latestFirst.js';
import { genNextByCount, sortRank } from './sortRank.js';

export function genNewProjectRank(projects: Project[]) {
  const ranks = projects.map((p) => p.lexorank);
  const sortedRanks = sortRank(ranks);

  if (sortedRanks.length === 0) {
    return LexoRank.middle().toString();
  }

  const absMin = LexoRank.min();
  const minProject = LexoRank.parse(sortedRanks[0]);
  const newRank = absMin.between(minProject).toString();

  return newRank;
}

export async function fillNullProjectRanks() {
  const users = await prisma.user.findMany({
    where: {
      projects: { some: {} }, // only users with at least 1 project
    },
    select: { projects: true },
  });

  const groupedProjects = users.map((u) => u.projects);

  const sortedProjects = groupedProjects.map((projectsOfOneUser) =>
    projectsOfOneUser.sort(latestFirst),
  );

  // then generate lexorank based on that
  sortedProjects.forEach(async (projectsOfOneUser) => {
    const newRanks = projectsOfOneUser.map((_, i) => genNextByCount(i));

    await prisma.$transaction(
      newRanks.map((lexorank, i) =>
        prisma.project.update({
          where: { id: projectsOfOneUser[i].id },
          data: { lexorank },
        }),
      ),
    );
  });
}
