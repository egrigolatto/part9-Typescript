import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button, Select, MenuItem, InputLabel, SelectChangeEvent, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

import {
  EntryTypes,
  EntryWithoutId,
  HealthCheckEntry,
  OccupationalHealthCareEntry,
  HospitalEntry,
  Diagnosis,
  HealthCheckRating,
} from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  entryType: EntryTypes;
  diagnoses: Diagnosis[];
}

const StyledTextField = styled(TextField)({
  margin: "10px 0 0 0", 
});

const healthCheckRatingOptions = Object.entries(HealthCheckRating)
  .filter(([_key, value]) => typeof value === "number")
  .map(([key, value]) => ({
    value: value as number,
    label: `${value} - ${key}`,
  }));

const AddEntryForm = ({ onCancel, onSubmit, entryType, diagnoses }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating);
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<string>) => {
    const selectedCode = event.target.value;
    if (!diagnosisCodes.includes(selectedCode)) {
      setDiagnosisCodes([...diagnosisCodes, selectedCode]);
    }
  };

  const removeDiagnosisCode = (code: string) => {
    setDiagnosisCodes(diagnosisCodes.filter((c) => c !== code));
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    let newEntry: EntryWithoutId;

    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          diagnosisCodes,
          healthCheckRating: Number(healthCheckRating),
        } as HealthCheckEntry;
        break;

      case "OccupationalHealthcare":
        newEntry = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          diagnosisCodes,
          employerName,
          ...(sickLeaveStart && sickLeaveEnd
            ? {
                sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
              }
            : {}),
        } as OccupationalHealthCareEntry;
        break;

      case "Hospital":
        newEntry = {
          type: "Hospital",
          description,
          date,
          specialist,
          diagnosisCodes,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        } as HospitalEntry;
        break;

      default:
        throw new Error("Invalid entry type");
    }

    onSubmit(newEntry);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <StyledTextField
          label="Date"
          fullWidth
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <StyledTextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {/* Diagnoses Selection */}
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select fullWidth value="" onChange={handleDiagnosisChange} displayEmpty>
          <MenuItem value="" disabled>
            Select a diagnosis
          </MenuItem>
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} - {d.name}
            </MenuItem>
          ))}
        </Select>

        <div style={{ marginTop: "10px" }}>
          {diagnosisCodes.map((code) => (
            <Chip
              key={code}
              label={code}
              onDelete={() => removeDiagnosisCode(code)}
              style={{ marginRight: "5px", marginBottom: "5px" }}
            />
          ))}
        </div>

        {/* HealthCheck */}
        {entryType === "HealthCheck" && (
          <>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating.toString()}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        {/* OccupationalHealthcare */}
        {entryType === "OccupationalHealthcare" && (
          <>
            <StyledTextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <StyledTextField
              label="Sick Leave Start"
              fullWidth
              type="date"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <StyledTextField
              label="Sick Leave End"
              fullWidth
              type="date"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}

        {/* Hospital */}
        {entryType === "Hospital" && (
          <>
            <StyledTextField
              label="Discharge Date"
              fullWidth
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <StyledTextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item>
            <Button color="secondary" variant="contained" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
