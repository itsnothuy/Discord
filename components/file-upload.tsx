"use client";

import { FileIcon, X } from "lucide-react";
import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const [fileType, setFileType] = useState<string | undefined>();

    const handleUploadComplete = (res: { url: string; type?: string }[]) => {
        const uploadedFileUrl = res?.[0]?.url;
        const uploadedFileType = res?.[0]?.type || ""; // Get the MIME type if available

        // Set the URL and file type in state
        onChange(uploadedFileUrl);
        setFileType(uploadedFileType);

        console.log("File URL:", uploadedFileUrl);
        console.log("File Type:", uploadedFileType);

        alert("Upload Completed");
    };

    // Render PDF link with icon if the file is a PDF
    if (value && fileType === "application/pdf") {
        return (
            <div className="relative flex items-center p-3 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-8 w-8 fill-indigo-200 stroke-indigo-500" />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 text-sm text-indigo-500 dark:text-indigo-400 hover:underline break-all"
                >
                    {value}
                </a>
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    // Default UploadDropzone if no file is uploaded yet
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
                console.log(error);
                alert(`ERROR! ${error.message}`);
            }}
        />
    );
};
