import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";

const FormField = ({ name, label, helpMessage }) => {
  return (
    <>
      <Field name={name}>
        {({ field, form, meta }) => (
          <TextField
            {...field}
            label={label}
            sx={{ mb: 1, mr: 1 }}
            error={meta.error && meta.touched}
            helperText={meta.error && meta.touched && helpMessage}
          />
        )}
      </Field>
    </>
  );
};

export default FormField;
