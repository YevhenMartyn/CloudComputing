import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../store";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Button,
} from "@mui/material";
import {
  deleteFile,
  downloadFile,
  fetchFiles,
  uploadFile,
} from "../../../../slices/fileSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const FilesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.file
  );

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  const handleDeleteButton = (path: string) => () => {
    dispatch(deleteFile(path));
  };

  const handleDownloadButton = (path: string) => () => {
    dispatch(downloadFile(path));
  };

  const handleUploadButton = (files: FileList) => {
    Array.from(files).forEach((file) => {
      dispatch(uploadFile({ file, path: "/" }));
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Files
      </Typography>
      <Typography>
        <strong>Upload new files:</strong>
        <Button component="label">
          <FileUploadIcon fontSize="large" />
          <input
            type="file"
            hidden
            multiple
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleUploadButton(e.target.files);
              }
            }}
          />
        </Button>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && data.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Size</strong>
                </TableCell>
                <TableCell>
                  <strong>Modifier Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Download</strong>
                </TableCell>
                <TableCell>
                  <strong>Delete</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.size}B</TableCell>
                  <TableCell>{item.modifier_contact_email}</TableCell>
                  <TableCell>
                    <Button onClick={handleDownloadButton(item.name)}>
                      <DownloadIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={handleDeleteButton(item.name)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && !error && data.length === 0 && (
        <Typography variant="body1" sx={{ mt: 3 }}>
          No files available.
        </Typography>
      )}
    </Container>
  );
};

export default FilesPage;
