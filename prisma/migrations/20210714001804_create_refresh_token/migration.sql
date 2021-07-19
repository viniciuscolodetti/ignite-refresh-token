-- CreateTable
CREATE TABLE "refresh-token" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh-token_userId_unique" ON "refresh-token"("userId");

-- AddForeignKey
ALTER TABLE "refresh-token" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
