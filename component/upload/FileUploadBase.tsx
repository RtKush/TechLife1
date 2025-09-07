"use client";

import { ImageKitAbortError, upload } from "@imagekit/next";
import { useEffect } from "react";

interface FileUploadProps {
  file: File;
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
}

const FileUploadBase: React.FC<FileUploadProps> = ({
  file,
  onSuccess,
  onProgress,
}) => {
  const getAuthParams = async () => {
    const res = await fetch("/api/imagekit-auth");
    const data = await res.json();
    return {
      ...data,
      expire: Number(data.expire),
    };
  };

  useEffect(() => {
    if (!file) return;

    const abortController = new AbortController();
    let isUploadDone = false;

    const handleUpload = async () => {
      try {
        const { signature, expire, token, publicKey } = await getAuthParams();

        const uploadResponse = await upload({
          file,
          fileName: file.name,
          expire,
          token,
          signature,
          publicKey,
          onProgress: (event) => {
            if (event.lengthComputable && onProgress) {
              const percent = (event.loaded / event.total) * 100;
              onProgress(Math.round(percent));
            }
          },
          abortSignal: abortController.signal,
        });

        isUploadDone = true;
        // console.log("✅ Upload successful", uploadResponse);
        onSuccess(uploadResponse);
      } catch (error) {
        if (error instanceof ImageKitAbortError) {
          console.error("Upload aborted", error.reason);
        } else {
          console.error("Upload error", error);
        }
      }
    };

    handleUpload();
  }, [file]);

  return null;
};

export default FileUploadBase;

