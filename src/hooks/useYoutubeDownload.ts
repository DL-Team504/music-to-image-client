import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

type YoutubeDownloadResponse = {
  blob: Blob;
  filename: string;
};

export function useYoutubeDownload() {
  const [downloadedFile, setDownloadedFile] = useState<File | null>(null);

  const { mutate, isPending } = useMutation<
    YoutubeDownloadResponse,
    Error,
    string
  >({
    mutationFn: async (youtubeUrl: string) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/download-youtube-audio",
          { youtube_url: youtubeUrl },
          {
            responseType: "blob",
          }
        );

        const contentDisposition = response.headers["content-disposition"];
        const filename = contentDisposition
          ? contentDisposition.split("filename=")[1]
          : "downloaded-audio.mp3";
        return { blob: response.data, filename };
      } catch (error) {
        throw new Error("Failed to download the audio from YouTube.");
      }
    },
    onSuccess: ({ blob, filename }) => {
      const file = new File([blob], filename, { type: "audio/mpeg" });
      setDownloadedFile(file);
    },
    onError: (error) => {
      console.error("Failed to download audio from YouTube:", error);
      alert("Failed to download audio from YouTube. Please try again.");
    },
  });

  const downloadFromYoutube = (youtubeUrl: string) => {
    mutate(youtubeUrl);
  };

  return {
    isLoading: isPending,
    downloadedFile,
    downloadFromYoutube,
  };
}
