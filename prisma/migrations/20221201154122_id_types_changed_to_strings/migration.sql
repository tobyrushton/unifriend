/*
  Warnings:

  - The primary key for the `FriendRequests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Messages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Settings` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FriendRequests" DROP CONSTRAINT "FriendRequests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FriendRequests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FriendRequests_id_seq";

-- AlterTable
ALTER TABLE "Messages" DROP CONSTRAINT "Messages_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Messages_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Messages_id_seq";

-- AlterTable
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Settings_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Settings_id_seq";
