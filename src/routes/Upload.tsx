import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CreationDialog } from "@/Components";

export default function Upload() {
  const theme = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [creationDialogOpen, setCreationDialogOpen] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle file upload and description submission
    console.log(file, description);
  };

  const onStartNowClick = () => {
    setCreationDialogOpen(true);
  };

  const onCreationDialogClose = () => {
    setCreationDialogOpen(false);
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        maxWidth: 400,
        margin: "0 auto",
        mt: 5,
      }}
    >
      <Typography
        variant="h5"
        sx={{ mb: 2, color: theme.palette.text.secondary }}
      >
        Upload Your Song
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" color="secondary" component="label">
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <TextField
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={description}
          onChange={handleDescriptionChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: theme.palette.background.default, // Input background
              color: theme.palette.text.primary, // Text color
            },
            "& .MuiInputLabel-root": {
              color: theme.palette.text.secondary, // Label color
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.text.secondary, // Border color
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: theme.palette.primary.main, // Focused border color
              },
          }}
        />
        <Box justifyContent="center" alignItems="center" display="Flex">
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={onStartNowClick}
          >
            Start Now
          </Button>
        </Box>
      </Stack>
      <CreationDialog
        open={creationDialogOpen}
        onClose={onCreationDialogClose}
        maxWidth="md"
        fullWidth
      />
    </Box>
  );
}
