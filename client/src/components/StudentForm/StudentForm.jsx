import { Formik, Form } from "formik";
import { Box, Button } from "@mui/material";
import * as Yup from "yup";
import React from "react";

import FormField from "./FormField";
import SubjectFormField from "./SubjectFormField";
import DeleteModal from "../Notifications/DeleteModal";

const StudentForm = ({
  initialValues,
  handleSubmit,
  isExistingStudent,
  studentId,
}) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    age: Yup.number().required().min(0).max(100),
    subjects: Yup.array().of(Yup.string()).required().min(1),
    email: Yup.string().email().required(),
  });

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form>
            <Box
              sx={{
                position: "relative",
                top: "150px",
                display: "flex",
                flexDirection: "column",
              }}
              spacing={2}
            >
              <div>
                <FormField
                  name="firstName"
                  label="First Name"
                  helpMessage="Please enter first name"
                />
                <FormField
                  name="lastName"
                  label="Last Name"
                  helpMessage="Please enter last name"
                />
              </div>
              <div>
                <FormField
                  name="age"
                  label="Age"
                  helpMessage="Please enter age as a number"
                />
              </div>
              <div>
                <SubjectFormField
                  name="subjects"
                  label="Subjects"
                  helpMessage="Please select at least one subject"
                />
              </div>
              <div>
                <FormField
                  name="email"
                  label="Email"
                  helpMessage="Please enter a valid email address"
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  sx={{ mr: 1, mb: 1 }}
                  type="submit"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  {isExistingStudent ? "Update" : "Create"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={refreshPage}
                  disabled={isSubmitting || !dirty}
                >
                  Reset
                </Button>
              </div>
              {isExistingStudent ? (
                <div>
                  <DeleteModal
                    studentName={`${initialValues.firstName} ${initialValues.lastName}`}
                    studentId={studentId}
                    isSubmitting={isSubmitting}
                  />
                </div>
              ) : null}
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default StudentForm;
