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
      // Simulate backend processing with a timeout
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(
            "https://images.unsplash.com/photo-1712464857903-57e1393d471d"
          );
        }, 2000); // Simulate a 2-second processing delay
      });

      // When backend is ready, replace the above code with the actual request:
      /*
      return axios.post(
        "BACKEND_URL",
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
      */
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
