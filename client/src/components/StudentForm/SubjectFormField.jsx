import React, { useState, useEffect, useContext } from "react";
import { Field } from "formik";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Box,
  FormHelperText,
} from "@mui/material";

import { ServiceContext } from "../../context/ServiceProvider";

const SubjectFormField = ({ name, label, helpMessage }) => {
  const {
    apiCalls: { fetchSubjects },
    subjects,
  } = useContext(ServiceContext);
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const [touched, setTouched] = useState(false);

  return (
    <>
      <Field name={name}>
        {({ field, form, meta }) => (
          <FormControl
            sx={{ mb: 1, minWidth: 250, maxWidth: 350 }}
            error={meta.error && touched}
          >
            <InputLabel id="subjects-label">{label}</InputLabel>
            <Select
              labelId="subjects-label"
              id="subjects"
              multiple
              value={field.value}
              onChange={(e) => {
                form.setFieldValue("subjects", e.target.value);
              }}
              onClose={() => setTouched(true)}
              input={
                <OutlinedInput id="select-multiple-chip" label="Subjects" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {subjects &&
                subjects.map((subject, i) => (
                  <MenuItem key={`subject-${i}`} value={subject.name}>
                    {subject.name}
                  </MenuItem>
                ))}
            </Select>
            {meta.error && touched ? (
              <FormHelperText>{helpMessage}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      </Field>
    </>
  );
};
export default SubjectFormField;
