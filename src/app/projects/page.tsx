// src/app/projects/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { IProject } from "@/types/Project";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { showSnackbar } from "@/store/slices/snackbarSlice";


export default function ProjectListPage() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const fetchData = async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Fetch error:", error);
      dispatch(showSnackbar({message: error as string, severity:"error"}))
    }
  }

  const toggleFav = async (project: IProject) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, isFavourite: !project.isFavourite }),
      });
      if (!res.ok) throw new Error("Failed to update project");
      dispatch(showSnackbar({message: "Updated!", severity:"success"}))
      fetchData();
    } catch (error) {
      console.error("Update error:", error);
      dispatch(showSnackbar({message: error as string, severity:"error"}))
    }
  };

  useEffect(() => {
    fetchData().finally(() => setLoading(false));
  }, []);

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
                    <Link href={`/projects/${project.projectId}`}>{project.projectId}</Link>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </main>
  );
}
