-- CreateEnum
CREATE TYPE "USER_TYPE" AS ENUM ('PARENT', 'NANNY', 'ADMIN', 'SUPERUSER');

-- CreateEnum
CREATE TYPE "NANNY_TYPE" AS ENUM ('SITTER', 'NANNY');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "cellphone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "type" "USER_TYPE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "inactive" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
