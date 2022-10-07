-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friendID_fkey" FOREIGN KEY ("friendID") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FriendRequests" ADD CONSTRAINT "FriendRequests_friendID_fkey" FOREIGN KEY ("friendID") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
