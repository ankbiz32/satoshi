"use client";

import ProjectForm from "@/app/projects/components/Form";
import { useRouter } from "next/navigation";
import { IProject } from "@/types/Project";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { showSnackbar } from "@/store/slices/snackbarSlice";

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
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: IProject) => {
    try {

      const res = await fetch("/api/projects", {
        method: "POST",
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

  return <ProjectForm initialValues={defaultValues} onSubmit={handleSubmit} />;
}
