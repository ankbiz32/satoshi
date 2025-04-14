"use client";

import { useEffect, useState } from "react";
import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { fetchProjects, selectAllProjects } from "@/store/slices/projectsSlice";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import { IProject } from "@/types/Project";
import { AppDispatch } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useToggleFavorite } from "@/hooks/useToggleFavourite";

export default function ProjectListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const projects: IProject[] = useSelector(selectAllProjects);

  const [openDialog, setOpenDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const toggleFav = useToggleFavorite();

  useEffect(() => {
    dispatch(fetchProjects()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleDeleteClick = (projectId: string) => {
    setProjectToDelete(projectId);
    setOpenDialog(true);
  };

  const cancelDelete = () => {
    setProjectToDelete(null);
    setOpenDialog(false);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/projects?projectId=${projectToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");

      dispatch(showSnackbar({ message: "Deleted!", severity: "success" }));
      dispatch(fetchProjects());
    } catch (error) {
      console.error("Delete error:", error);
      dispatch(showSnackbar({ message: error as string, severity: "error" }));
    } finally {
      setProjectToDelete(null);
      setOpenDialog(false);
    }
  };

  return (
    <main className="p-8">
      <Typography variant="h4" gutterBottom>Project List</Typography>
      <Button variant="contained" color="primary" component={Link} href="/projects/new">Create Project</Button>

      {loading ? <Typography>Loading projects...</Typography> : (
        <TableContainer component={Paper} className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Favourite</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Project Manager</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.projectId}>
                  <TableCell>
                    <IconButton onClick={() => toggleFav(project)}>
                      {project.isFavourite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Link href={`/projects/${project.projectId}`} className="text-blue-500">
                      {project.projectId}
                    </Link>
                  </TableCell>
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.startDate}</TableCell>
                  <TableCell>{project.endDate}</TableCell>
                  <TableCell>{project.projectManager}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<EditIcon />}
                      component={Link}
                      href={`/projects/${project.projectId}/edit`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(project.projectId)}
                      sx={{ ml: 2 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm your request</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this project?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

