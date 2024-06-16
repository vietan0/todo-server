import { Task } from '@prisma/client';
import { LexoRank } from 'lexorank';

import prisma from '../../prisma/client.js';
import latestFirst from './latestFirst.js';
import { genNextByCount, sortRank } from './sortRank.js';

export function genNewTaskRank(tasks: Task[], parentTaskId?: string | null) {
  // new task could be base task or subtask
  let surroundTasks: Task[] = [];

  if (parentTaskId) {
    surroundTasks = tasks.filter((t) => t.parentTaskId === parentTaskId); // siblings only
  } else {
    surroundTasks = tasks.filter((t) => t.parentTaskId === null); // base tasks only
  }

  const ranks = surroundTasks.map((t) => t.lexorank);
  const sortedRanks = sortRank(ranks);

  if (sortedRanks.length === 0) {
    return LexoRank.middle().toString();
  }

  const absMin = LexoRank.min();
  const minProject = LexoRank.parse(sortedRanks[0]);
  const newRank = absMin.between(minProject).toString();

  return newRank;
}

export async function fillNullTaskRanks() {
  const projects = await prisma.project.findMany({
    where: {
      tasks: { some: {} }, // only projects with at least 1 task
    },
    select: { tasks: true },
  });

  const groupedTasks = projects.map((p) => p.tasks);

  const sortedTasks = groupedTasks.map(async (tasksOfOneProject) => {
    /* 
      In each project,
      - group all base tasks together
      - group all subtasks of a same base task together
     */
    const baseTasks = tasksOfOneProject
      .filter((t) => t.parentTaskId === null)
      .sort(latestFirst);

    const subTasks = tasksOfOneProject.filter((t) => t.parentTaskId !== null);
    const groupedSubTasks = groupSubTasksByParent(subTasks);
    const newRankBaseTasks = baseTasks.map((_, i) => genNextByCount(i));

    await prisma.$transaction(
      newRankBaseTasks.map((lexorank, i) =>
        prisma.task.update({
          where: { id: baseTasks[i].id },
          data: { lexorank },
        }),
      ),
    );

    groupedSubTasks.forEach(async (subTasksOfOneBaseTask) => {
      const newRanks = subTasksOfOneBaseTask.map((_, i) => genNextByCount(i));

      await prisma.$transaction(
        newRanks.map((lexorank, i) =>
          prisma.task.update({
            where: { id: subTasksOfOneBaseTask[i].id },
            data: { lexorank },
          }),
        ),
      );
    });
  });

  return sortedTasks;
}

function groupSubTasksByParent(subTasks: Task[]): Task[][] {
  const parents: Task['parentTaskId'][] = [];

  subTasks.forEach((subTask) => {
    if (!parents.includes(subTask.parentTaskId)) {
      parents.push(subTask.parentTaskId);
    }
  });

  const result = parents.map((parentTaskId) => {
    return subTasks
      .filter((subTask) => subTask.parentTaskId === parentTaskId)
      .sort(latestFirst);
  });

  return result;
}
