'use client';

import Link from 'next/link';
import { Box, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useEffect } from 'react';
import { fetchProjects, selectFavoriteProjects } from '@/store/slices/projectsSlice';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star'
export default function FavoritesSidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteProjects = useSelector(selectFavoriteProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <Box
      className="bg-gray-100 p-4 sm:h-screen sm:max-h-screen max-h-60 overflow-y-auto min-w-3xs"
    >
      <Typography variant="h6" gutterBottom>
        <StarIcon color="warning" /> Favorite Projects
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
