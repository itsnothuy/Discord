import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId: userId }
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "128GB", maxFileCount: 1 }})
  .middleware(() => handleAuth())
  .onUploadComplete(() => {
    console.log("Server Image Upload Completed.");
  }),
  messageFile: f(["image", "pdf"])
  .middleware(() => handleAuth())
  .onUploadComplete(() => {
    console.log("Message File Upload Completed.");
  })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
