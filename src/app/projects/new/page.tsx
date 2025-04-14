"use client";

import ProjectForm from "@/app/projects/components/Form";
import { useRouter } from "next/navigation";
import { IProject } from "@/types/Project";

const defaultValues: IProject = {
  projectId: "",
  projectName: "",
  description: "",
  startDate: "",
  endDate: "",
  projectManager: "",
  isFavourite: false,
};

export default function CreateProjectPage() {
  const router = useRouter();

  const handleSubmit = async (values: IProject) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      router.push("/projects");
    }
  };

  return <ProjectForm initialValues={defaultValues} onSubmit={handleSubmit} />;
}
