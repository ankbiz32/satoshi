import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store/slices/snackbarSlice";
import { IProject } from "@/types/Project";

export const useToggleFavorite = () => {
  const dispatch = useDispatch();

  const toggleFav = async (project: IProject, cb: () => void) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...project, isFavourite: !project.isFavourite }),
      });

      if (!res.ok) throw new Error("Failed to update project");

      dispatch(showSnackbar({ message: "Updated!", severity: "success" }));
      cb();
    } catch (error) {
      console.error("Update error:", error);
      dispatch(showSnackbar({ message: error as string, severity: "error" }));
    }
  };

  return toggleFav;
};
