import React, { useState, useEffect } from "react";
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

const SubjectFormField = ({ name, label, helpMessage }) => {
  const [taughtSubjects, setTaughtSubjects] = useState([]);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/subjects/");
        if (!res.ok) {
          throw res;
        }
        const data = await res.json();
        const subjectNames = data.map((subject, i) => {
          return subject.name;
        });
        setTaughtSubjects(subjectNames);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubjects();
  }, []);

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
              {taughtSubjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
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
