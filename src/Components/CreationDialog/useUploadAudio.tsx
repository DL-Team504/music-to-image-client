import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export interface FileArgs {
  audio: File;
  focusArea: [number, number];
  imageStyle?: string;
}

export default function useUploadAudio() {
  const [progress, setProgress] = useState<number | null>(0);

  const {
    data: generatedImageUrl,
    mutate: uploadAudio,
    mutateAsync: uploadAudioAsync,
    ...restUseMutation
  } = useMutation<string, AxiosError, FileArgs>({
    mutationFn: ({ audio, imageStyle, focusArea }) => {
      return axios.post(
        "DUMMY_URL",
        {
          start: focusArea[0],
          end: focusArea[1],
          image_style: imageStyle,
          upload_file: audio,
        },
        {
          onUploadProgress: (ev) => {
            if (ev.total !== undefined) {
              setProgress(Math.round((ev.loaded * 100) / ev.total));
            } else {
              setProgress(null);
            }
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onMutate: () => {
      setProgress(0);
    },
  });

  return {
    generatedImageUrl,
    uploadAudio,
    uploadAudioAsync,
    progress,
    ...restUseMutation,
  };
}
