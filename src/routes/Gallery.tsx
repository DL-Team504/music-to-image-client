import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SongCard } from "@/Components";

type GeneratedImage = {
  path: string;
  title: string;
  creation_date: string;
};

const fetchImages = async () => {
  const res = await axios.get<GeneratedImage[]>(
    "http://lunarbeats.cs.colman.ac.il:8888/gallery/images"
  );
  return res.data;
};

export default function Gallery() {
  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  return (
    <Box
      sx={{
        paddingX: 6,
        paddingTop: 2,
        marginTop: "5vh",
        overflowY: "hidden",
      }}
    >
      <Grid container spacing={2}>
        {images &&
          images.map((image, index) => (
            <Grid lg={3} md={4} sm={6} key={index}>
              <SongCard
                imgSrc={`http://lunarbeats.cs.colman.ac.il:8888/${image.path}`}
                title={image.title}
                creationDate={image.creation_date}
              />
            </Grid>
          ))}
        <Grid lg={3} md={4} sm={6}>
          <SongCard
            imgSrc="https://images.unsplash.com/photo-1712464857903-57e1393d471d"
            title="Waste It On Me"
            creationDate="September 14, 2016"
          />
        </Grid>
        <Grid lg={3} md={4} sm={6}>
          <SongCard
            imgSrc="https://images.unsplash.com/photo-1712346226699-e415ad57e22f"
            title="Hello"
            creationDate="September 14, 2016"
          />
        </Grid>
        <Grid lg={3} md={4} sm={6}>
          <SongCard
            imgSrc="https://images.unsplash.com/photo-1712609036335-ff1bb47e803a"
            title="Starfields"
            creationDate="September 14, 2016"
          />
        </Grid>
        <Grid lg={3} md={4} sm={6}>
          <SongCard
            imgSrc="https://images.unsplash.com/photo-1711968558634-a8aa796e6468"
            title="Only You"
            creationDate="September 14, 2016"
          />
        </Grid>
        <Grid lg={3} md={4} sm={6}>
          <SongCard
            imgSrc="https://images.unsplash.com/photo-1712107062961-4a758df77267"
            title="Dream On"
            creationDate="September 14, 2016"
          />
        </Grid>
        <Grid lg={3} md={4} sm={6}>
          <SongCard
            imgSrc="https://images.unsplash.com/photo-1627454820516-dc767bcb4d3e"
            title="Bugatti"
            creationDate="September 14, 2016"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
