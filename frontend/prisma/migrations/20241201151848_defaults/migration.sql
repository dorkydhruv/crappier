-- AlterTable
ALTER TABLE "Action" ALTER COLUMN "metadata" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "Trigger" ALTER COLUMN "metadata" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profileImage" SET DEFAULT 'https://via.placeholder.com/150';
