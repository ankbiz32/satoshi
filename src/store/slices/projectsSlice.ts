import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProject } from '@/types/Project';
import { RootState } from '..';


export const selectFavoriteProjects = (state: RootState) =>
    state.projects.all.filter((project) => project.isFavourite);

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, { rejectWithValue }): Promise<IProject[] | ReturnType<typeof rejectWithValue>> => {
        try {
            const res = await fetch('/api/projects');
            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData.error || errorData.message || "Unknown error");
            }
            return await res.json();
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('An unexpected error occurred');
        }
    }
);

const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        all: [] as IProject[],
        loading: false,
        error: null as string | null,
    },
    reducers: {
        setProjects(state, action: PayloadAction<IProject[]>) {
            state.all = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.all = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setProjects } = projectsSlice.actions;

export const selectAllProjects = (state: RootState) => state.projects.all;
export const selectFavouriteProjects = (state: RootState) =>
    state.projects.all.filter((project: IProject) => project.isFavourite);

export default projectsSlice.reducer;
