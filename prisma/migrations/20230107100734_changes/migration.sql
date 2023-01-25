/*
  Warnings:

  - The values [RIOT] on the enum `User_loginType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `createdAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastLogin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `status` ENUM('AWAITING_CONFIRMATION', 'CONFIRMED', 'CANCELED') NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `lastLogin` DATETIME(3) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    MODIFY `loginType` ENUM('GOOGLE', 'STEAM', 'TRADITIONAL', 'DISCORD') NOT NULL;
