import { useParams } from "react-router-dom";
import { Patient, Gender, EntryTypes, EntryWithoutId, Diagnosis } from "../types";
import { Male, Female, Transgender } from "@mui/icons-material";
import { EntryDetails } from "./Entries/EntryDetails";
import { Button, SelectChangeEvent, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import AddEntryModal from "./AddEntryModal";
import patientService from "../services/patients";
import axios from "axios";

interface Props {
  patients: Patient[];
  diagnoses: Diagnosis[];
}

interface TypeOption {
  value: EntryTypes;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(EntryTypes).map((v) => ({
  value: v,
  label: v.toString(),
}));

const PatientDetails = ({ patients, diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients.find((p) => p.id === id);
  const [patientData, setPatientData] = useState<Patient | null>(
    patient || null
  );
  

  const [entryType, setEntryType] = useState<EntryTypes | "">("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryTypes).find(
        (g) => g.toString() === value
      );
      if (type) {
        setEntryType(type);
      }
    }
  };

  

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const newEntry = await patientService.addEntry(id!, values);
     if (patientData) {
       setPatientData({
         ...patientData,
         entries: [...patientData.entries, newEntry],
       });
     }
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) return <p>Patient not found</p>;

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Male style={{ color: "blue" }} />;
      case Gender.Female:
        return <Female style={{ color: "pink" }} />;
      default:
        return <Transgender style={{ color: "purple" }} />;
    }
  };

  return (
    <div>
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      <p>
        <strong>ssh:</strong> {patient.ssn}
      </p>
      <p>
        <strong>Occupation:</strong> {patient.occupation}
      </p>

      <br />

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        entryType={entryType as EntryTypes}
        diagnoses={diagnoses}
      />

      <Select
        value={entryType}
        onChange={handleTypeChange}
        displayEmpty
        sx={{ marginRight: 2 }}
      >
        <MenuItem value="" disabled>
          Entry Type
        </MenuItem>
        {typeOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <Button
        variant="contained"
        disabled={!entryType}
        onClick={() => openModal()}
      >
        Add Entry
      </Button>

      {patientData && patientData.entries.length > 0 && (
        <div>
          <h3>Entries</h3>
          {patientData.entries.map((entry, index) => (
            <EntryDetails key={index} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
