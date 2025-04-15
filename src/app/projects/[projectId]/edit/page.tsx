"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProjectForm from "@/app/projects/components/Form";
import { IProject } from "@/types/Project";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProjects } from "@/store/slices/projectsSlice";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import { AppDispatch } from "@/store";

export default function EditProjectPage() {
  const router = useRouter();
  const { projectId } = useParams() as { projectId: string };
  const [loading, setLoading] = useState<Boolean>(true);
  const [project, setProject] = useState<IProject | null>(null);
  const projects = useSelector(selectAllProjects);
  const dispatch = useDispatch<AppDispatch>();

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

  const handleSubmit = async (values: IProject) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const err = await res.json();
        dispatch(showSnackbar({ message: err?.error || "Server error", severity: "error" }))
        return;
      }
      router.push("/projects");
    } catch (error) {
      console.error("Fetch error:", error);
      dispatch(showSnackbar({ message: error as string, severity: "error" }))
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  if (project) return <ProjectForm initialValues={project} onSubmit={handleSubmit} isEdit={true} />;
}
