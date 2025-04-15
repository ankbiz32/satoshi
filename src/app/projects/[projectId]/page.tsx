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

    if (loading) return <Typography px={3} py={2}>Loading...</Typography>;

    return (
        <>
            {project &&
                <Box px={4} py={2} maxWidth={500}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6">{project.projectName}</Typography>
                        <IconButton onClick={() => toggleFav(project)}>
                            {project.isFavourite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                        </IconButton>
                    </Box>
                    <Typography variant="body1" className="sm:flex-row flex-col flex justify-content-center" gap={2} mt={3}>
                        <strong className='sm:text-right inline-block min-w-40'>Project ID:</strong>
                        <span> {project.projectId}</span>
                    </Typography>
                    <Typography variant="body1" className="sm:flex-row flex-col flex justify-content-center" gap={2} mt={3}>
                        <strong className='sm:text-right inline-block min-w-40'>Description:</strong>
                        <span>{project.description}</span>
                    </Typography>
                    <Typography variant="body1" className="sm:flex-row flex-col flex justify-content-center" gap={2} mt={3}>
                        <strong className='sm:text-right inline-block min-w-40'>Start Date:</strong>
                        <span>{project.startDate}</span>
                    </Typography>
                    <Typography variant="body1" className="sm:flex-row flex-col flex justify-content-center" gap={2} mt={3}>
                        <strong className='sm:text-right inline-block min-w-40'>End Date:</strong>
                        <span>{project.endDate}</span>
                    </Typography>
                    <Typography variant="body1" className="sm:flex-row flex-col flex justify-content-center" gap={2} mt={3}>
                        <strong className='sm:text-right inline-block min-w-40'>Project Manager:</strong>
                        <span>{project.projectManager}</span>
                    </Typography>

                    <Box mt={4}>
                        <Button variant="contained" onClick={() => router.back()} className="mr-2">Back</Button>
                        <Button variant="outlined" sx={{ ml: 2 }} href={`/projects/${project.projectId}/edit`}>Edit</Button>
                    </Box>
                </Box>
            }
        </>
    );
}
