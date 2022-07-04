-- CreateTable
CREATE TABLE `Books` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `author` VARCHAR(150) NOT NULL,
    `publisher` VARCHAR(100) NOT NULL,
    `finished` BOOLEAN NOT NULL DEFAULT false,
    `reading` BOOLEAN NOT NULL DEFAULT false,
    `currentPage` INTEGER NOT NULL DEFAULT 0,
    `totalPage` INTEGER NOT NULL,
    `cover` VARCHAR(255) NULL,
    `description` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
