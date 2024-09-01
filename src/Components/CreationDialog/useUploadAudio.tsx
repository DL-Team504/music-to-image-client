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

  const { data, mutate, isPending, isSuccess } = useMutation<
    string,
    AxiosError,
    FileArgs
  >({
    mutationFn: async ({ audio, imageStyle, focusArea }) => {
      return axios
        .post(
          "http://lunarbeats.cs.colman.ac.il:8888/generate-image/file",
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
        )
        .then((response) => response.data);
    },
    onMutate: () => {
      setProgress(0);
    },
  });

  return {
    generatedImageUrl: data,
    uploadAudio: mutate,
    isLoading: isPending,
    isSuccess,
    progress,
  };
}
