-- CreateEnum
CREATE TYPE "Department" AS ENUM ('IT', 'Marketing', 'Sales', 'HR');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending', 'Approved', 'Rejected');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('Days', 'Hours');

-- CreateEnum
CREATE TYPE "LeaveReason" AS ENUM ('Vacation', 'Sick', 'Quitting', 'Other');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "departement" "Department" NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeaveApplication" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" "Department" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',
    "leaveReason" "LeaveReason" NOT NULL,
    "comments" TEXT NOT NULL,
    "leaveType" "LeaveType" NOT NULL,
    "startDate" DATE,
    "endDate" DATE,
    "selectedDay" DATE,
    "startHour" TIME,
    "endHour" TIME,

    CONSTRAINT "LeaveApplication_pkey" PRIMARY KEY ("id")
);
