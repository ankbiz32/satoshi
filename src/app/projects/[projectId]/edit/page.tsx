"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProjectForm from "@/app/projects/components/Form";
import { IProject } from "@/types/Project";

export default function EditProjectPage() {
  const router = useRouter();
  const { projectId } = useParams() as { projectId: string };
  const [project, setProject] = useState<IProject | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then((data: IProject[]) => {
        console.log(data);
        console.log(projectId);
        
        const found = data.find(p => p.projectId === projectId);
        if (found) setProject(found);
      });
  }, [projectId]);

  const handleSubmit = async (values: IProject) => {
    const res = await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      router.push("/projects");
    }
  };

  if (!project) return <div>Loading...</div>;

  return <ProjectForm initialValues={project} onSubmit={handleSubmit} isEdit = {true} />;
}
