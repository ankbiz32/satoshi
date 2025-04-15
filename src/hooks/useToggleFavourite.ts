import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import { IProject } from "@/types/Project";
import { fetchProjects } from "@/store/slices/projectsSlice";
import { AppDispatch } from "@/store";

export const useToggleFavorite = () => {
  const dispatch = useDispatch<AppDispatch>();

  const toggleFav = async (project: IProject) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, isFavourite: !project.isFavourite }),
      });

      if (!res.ok) throw new Error("Failed to update project");

      dispatch(showSnackbar({ message: "Updated!", severity: "success" }));
      dispatch(fetchProjects()).unwrap()
      .catch((error) =>
        dispatch(showSnackbar({ message: error || "Unknown Error", severity: "error" })))
    } catch (error) {
      console.error("Update error:", error);
      dispatch(showSnackbar({ message: error as string, severity: "error" }));
    }
  };

  return toggleFav;
};
