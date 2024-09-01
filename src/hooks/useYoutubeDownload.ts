import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface YoutubeArgs {
  youtubeUrl: string;
  imageStyle?: string;
}

export default function useYoutubeDownload() {
  const { data, mutate, isPending, isSuccess } = useMutation<
    string,
    Error,
    YoutubeArgs
  >({
    mutationFn: async ({ youtubeUrl, imageStyle }) => {
      return axios
        .post(
          "http://lunarbeats.cs.colman.ac.il:8888/generate-image/yt",
          {
            youtube_url: youtubeUrl,
            start: 0,
            end: 60,
            image_style: imageStyle,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => response.data);
    },
    onError: (error) => {
      console.error("Failed to generate audio from YouTube:", error);
      alert("Failed to generate audio from YouTube. Please try again.");
    },
  });

  const downloadFromYoutube = (youtubeUrl: string, imageStyle?: string) => {
    mutate({ youtubeUrl, imageStyle });
  };

  return {
    generatedImageUrl: data,
    downloadFromYoutube,
    isLoading: isPending,
    isSuccess,
  };
}
