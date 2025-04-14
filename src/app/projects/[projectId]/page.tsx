'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IProject } from '@/types/Project';
import { Box, Button, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useToggleFavorite } from '@/hooks/useToggleFavourite';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { showSnackbar } from '@/store/slices/snackbarSlice';
import { selectAllProjects } from '@/store/slices/projectsSlice';

export default function ProjectDetailPage() {
    const { projectId } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState<Boolean>(true);
    const [project, setProject] = useState<IProject | null>(null);
    const toggleFav = useToggleFavorite();
    const dispatch = useDispatch<AppDispatch>();
    const projects = useSelector(selectAllProjects)

    useEffect(() => {
        if (!projects || projects.length === 0) return;
        fetchData();
    }, [projectId, projects]);

    const fetchData = async () => {
        try {
            const found = projects.find((p: IProject) => p.projectId === projectId);
            found ? setProject(found) : dispatch(showSnackbar({ message: 'No project found with this Id', severity: "error" }));

        } catch (error) {
            console.error("Fetch error:", error);
            dispatch(showSnackbar({ message: error as string, severity: "error" }))
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <>
            {project &&
                <Box p={8}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h4">{project.projectName}</Typography>
                        <IconButton onClick={() => toggleFav(project)}>
                            {project.isFavourite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                        </IconButton>
                    </Box>
                    <Typography variant="body1" mt={2}><strong>Project ID:</strong> {project.projectId}</Typography>
                    <Typography variant="body1" mt={1}><strong>Description:</strong> {project.description}</Typography>
                    <Typography variant="body1" mt={1}><strong>Start Date:</strong> {project.startDate}</Typography>
                    <Typography variant="body1" mt={1}><strong>End Date:</strong> {project.endDate}</Typography>
                    <Typography variant="body1" mt={1}><strong>Project Manager:</strong> {project.projectManager}</Typography>

                    <Box mt={4}>
                        <Button variant="contained" onClick={() => router.back()} className="mr-2">Back</Button>
                        <Button variant="outlined" sx={{ml: 2}} href={`/projects/${project.projectId}/edit`}>Edit</Button>
                    </Box>
                </Box>
            }
        </>
    );
}
