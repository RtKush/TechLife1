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

/**
 * 🧠 Upload Architecture Summary
 *
 * - FileUploadBase handles upload logic using ImageKit's SDK.
 * - Wrapper components like ImageUpload/VideoUpload validate the file and handle UI.
 * - We pass `onSuccess` and `onProgress` as callback props to handle response and state in parent.
 *
 * - File type is checked using MIME type (file.type.startsWith("image/"))
 * - fs module isn't used because we upload directly from browser, not server.
 *
 * 🔁 Example:
 * <FileUploadBase
 *    file={file}
 *    onSuccess={(res) => { console.log(res) }}
 *    onProgress={(percent) => { console.log(percent + "%") }}
 * />
 */

// **********************************************
/*

//  file structre for uploading file at imagekit

1. FileUploadBase.tsx -> handle Logic for uploading files (video and image)

2. ImageUpload.tsx -> UI+ validation for image

3. VideoUpload.tsx -> UI+ validation for image

all 3 files are kept in uploads directory
*/
// **********************************************
