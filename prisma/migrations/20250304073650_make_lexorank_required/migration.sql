/*
  Warnings:

  - Made the column `lexorank` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lexorank` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "lexorank" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "lexorank" SET NOT NULL;
