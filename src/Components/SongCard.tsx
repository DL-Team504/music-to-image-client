import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Download from "@mui/icons-material/DownloadForOfflineOutlined";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { saveAs } from "file-saver";

type SongCardProps = {
  imgSrc: string;
  title: string;
  creationDate: string;
  tags?: string[];
};

export default function SongCard(props: SongCardProps) {
  const { imgSrc, title, creationDate, tags } = props;

  function handleDownload() {
    saveAs(imgSrc, title);
  }

  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardHeader
        title={title}
        subheader={creationDate}
        avatar={
          <Avatar
            src="https://lh3.googleusercontent.com/KAhhnrQQ78MtBWThKhF-3jBjBzAApasY2527JOSSGaCyDQlaJp6FbTCN6enMhnJny97o09kdef9weA=w2880-h1200-p-l90-rj"
            aria-label="recipe"
          />
        }
        action={
          <IconButton
            onClick={handleDownload}
            aria-label="bookmark Bahamas Islands"
          >
            <Download />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        image={`${imgSrc}?auto=format&fit=crop&w=286`}
        height={194}
        loading="lazy"
      />
      {tags && (
        <CardContent>
          <Grid container spacing={1}>
            {tags.slice(4).map((tag) => (
              <Grid>
                <Chip variant="outlined" label={tag} />
              </Grid>
            ))}
            {tags.length > 4 && (
              <Grid>
                <Chip variant="outlined" label="..." />
              </Grid>
            )}
          </Grid>
        </CardContent>
      )}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
