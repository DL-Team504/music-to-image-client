import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Download from "@mui/icons-material/DownloadForOfflineOutlined";
import CardMedia, { CardMediaProps } from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { saveAs } from "file-saver";
import { createElement as E, ImgHTMLAttributes } from "react";

type SongCardProps = {
  imgSrc: string;
  title: string;
  creationDate: string;
  tags?: string[];
};

const DEFAULT_AVATAR_IMG =
  "https://lh3.googleusercontent.com/KAhhnrQQ78MtBWThKhF-3jBjBzAApasY2527JOSSGaCyDQlaJp6FbTCN6enMhnJny97o09kdef9weA=w2880-h1200-p-l90-rj";

export default function SongCard(props: SongCardProps) {
  const { imgSrc, title, creationDate, tags = [] } = props;

  const cardMediaProps: CardMediaProps & ImgHTMLAttributes<HTMLImageElement> = {
    component: "img",
    image: `${imgSrc}?auto=format&fit=crop&w=286`,
    alt: `Image of ${title}`,
    height: 194,
    loading: "lazy",
  };
  cardMediaProps;
  function handleDownload() {
    saveAs(imgSrc, title);
  }

  return E(
    Card,
    { sx: { maxWidth: 345, height: "100%" } },
    E(CardHeader, {
      title: title,
      subheader: creationDate,
      avatar: E(Avatar, { src: DEFAULT_AVATAR_IMG, "aria-label": "recipe" }),
      action: E(
        IconButton,
        {
          onClick: handleDownload,
          "aria-label": "bookmark Bahamas Islands",
        },
        E(Download)
      ),
    }),
    E(CardMedia, cardMediaProps),
    tags.length > 0 &&
      E(
        CardContent,
        null,
        E(Grid, { container: true, spacing: 1 }),
        tags
          .slice(4)
          .map((tag) =>
            E(Grid, null, E(Chip, { variant: "outlined", label: tag }))
          ),
        tags.length > 4 &&
          E(Grid, null, E(Chip, { variant: "outlined", label: "..." }))
      ),
    E(
      CardActions,
      { disableSpacing: false },
      E(IconButton, { "aria-label": "add to favorites" }, E(FavoriteIcon)),
      E(IconButton, { "aria-label": "share" }, E(ShareIcon))
    )
  );
}
