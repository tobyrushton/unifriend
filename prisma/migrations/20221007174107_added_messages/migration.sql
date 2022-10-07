-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "seen" BOOLEAN NOT NULL DEFAULT false,
    "senderID" TEXT NOT NULL,
    "recipientID" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Messages_id_key" ON "Messages"("id");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_recipientID_fkey" FOREIGN KEY ("recipientID") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
