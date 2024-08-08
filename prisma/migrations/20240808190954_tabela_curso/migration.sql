/*
  Warnings:

  - You are about to drop the column `descricao` on the `Course` table. All the data in the column will be lost.
  - Added the required column `description` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `descricao`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
