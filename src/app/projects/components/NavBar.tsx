"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material/styles";

const navLinks = [
  { title: "Projects", path: "/projects" },
  { title: "Create", path: "/projects/new" },
];

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#c1666b',
  color: '#ffffff',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      <CustomAppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component={Link} href="/" sx={{ color: "white", textDecoration: "none" }}>
            Satoshi
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box display="flex" gap={2}>
              {navLinks.map((link) => (
                <Typography
                  key={link.title}
                  component={Link}
                  href={link.path}
                  sx={{ color: "white", textDecoration: "none" }}
                >
                  {link.title}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>
      </CustomAppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box width={200} role="presentation" onClick={toggleDrawer}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.title} disablePadding>
                <ListItemButton component={Link} href={link.path}>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
