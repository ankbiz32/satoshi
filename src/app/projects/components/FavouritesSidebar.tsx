'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IProject } from '@/types/Project';
import { Box, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';

export default function FavoritesSidebar() {
    const [favoriteProjects, setFavoriteProjects] = useState<IProject[]>([]);

    useEffect(() => {
        fetch('/api/projects')
            .then((res) => res.json())
            .then((data: IProject[]) => {
                const favs = data.filter((project) => project.isFavourite);
                setFavoriteProjects(favs);
            });
    }, []);

    return (
        <Box width="250px" p={2} bgcolor="#f5f5f5" height="100vh">
            <Typography variant="h6" gutterBottom>
                Favorite Projects
            </Typography>
            <List>
                {favoriteProjects.map((project) => (

                    <ListItem key={project.projectId} disablePadding>
                        <ListItemButton component={Link} href={`/projects/${project.projectId}`}>
                            <ListItemText primary={project.projectName} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
