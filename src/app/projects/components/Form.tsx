"use client";

import { Button, TextField, Box, Stack, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IProject } from "@/types/Project";

interface ProjFormProps {
  initialValues: IProject;
  onSubmit: (values: IProject) => void;
  isEdit?: boolean;
}

const ProjectSchema = Yup.object().shape({
  projectId: Yup.string().required("Project ID is required"),
  projectName: Yup.string().required("Project Name is required"),
  description: Yup.string(),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
  projectManager: Yup.string().required("Project Manager is required"),
});

export default function ProjForm({ initialValues, onSubmit, isEdit = false }: ProjFormProps) {
  return (
    <Box py={2} px={3} maxWidth={500}>
      <Typography marginBottom={4} variant="h6" gutterBottom>{isEdit ? 'Update' : 'Create New'} Project</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={ProjectSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            <Stack spacing={3}>
              <Field
                size="small"
                as={TextField}
                name="projectId"
                label="Project ID"
                fullWidth
                disabled={isEdit}
                error={touched.projectId && !!errors.projectId}
                helperText={touched.projectId && errors.projectId}
              />
              <Field
                size="small"
                as={TextField}
                name="projectName"
                label="Project Name"
                fullWidth
                error={touched.projectName && !!errors.projectName}
                helperText={touched.projectName && errors.projectName}
              />
              <Field
                size="small"
                as={TextField}
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={4}
              />
              <Field
                size="small"
                as={TextField}
                name="startDate"
                type="date"
                label="Start Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
              />
              <Field
                size="small"
                as={TextField}
                name="endDate"
                type="date"
                label="End Date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
              />
              <Field
                size="small"
                as={TextField}
                name="projectManager"
                label="Project Manager"
                fullWidth
                error={touched.projectManager && !!errors.projectManager}
                helperText={touched.projectManager && errors.projectManager}
              />
              <Button type="submit" sx={{ alignSelf: 'flex-start', px:'50px', width: 'auto' }} variant="contained" color="primary">
                {isEdit ? "Update" : "Create"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
