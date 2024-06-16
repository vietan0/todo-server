import { Project, Task } from '@prisma/client';

export default function latestFirst(a: Project | Task, b: Project | Task) {
  return new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1;
}
