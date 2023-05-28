// ** MUI Imports
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";

const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    marginRight: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    width: 250,
  },
}));

const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(4),
  },
}));

const FileUploaderSingle = ({ fileUrl, file, setFile }) => {
  // ** Hook
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      setFile(Object.assign(acceptedFiles[0]));
    },
  });

  const handleLinkClick = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      {...getRootProps({ className: "dropzone" })}
      sx={{
        borderRadius: "10px",
        border: "dashed 2px lightgray",
        padding: 2,
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <input {...getInputProps()} />
      <Box
        sx={{
          display: "flex",
          flexDirection: ["column", "column", "row"],
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {!fileUrl ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: ["center", "center", "inherit"],
                height: 150,
              }}
            >
              <HeadingTypography variant="h5">
                Drop files here or click to upload.
              </HeadingTypography>
              <Typography color="textSecondary">
                Drop files here or click{" "}
                <Link href="/" onClick={handleLinkClick}>
                  browse
                </Link>{" "}
                thorough your machine
              </Typography>
            </Box>
          </>
        ) : null}
      </Box>
      {fileUrl ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            alt={file.name}
            src={fileUrl}
            style={{
              height: 150,
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default FileUploaderSingle;
