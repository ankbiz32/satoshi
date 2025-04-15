'use client'
import { Typography } from "@mui/material";
import styled from '@emotion/styled';
import Link from "next/link";

const StyledLink = styled(Link)`
  background-color: #2196f3;
  color: white;
  padding: 12px 20px;
  border-radius: 2px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
  &:hover {
    background-color: #1976d2;
  }
`;

export default function Home() {
  return (
    <main className="p-8">
      <Typography variant="h6" gutterBottom >
        Hello Satoshi!
      </Typography>
      <StyledLink href="/projects">Let's get started</StyledLink>
    </main>
  );
}
