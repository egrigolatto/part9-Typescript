import { Work } from "@mui/icons-material";
import { OccupationalHealthCareEntry as OccupationalHealthcareEntryType } from "../../types";

interface Props {
  entry: OccupationalHealthcareEntryType;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <p>
        <strong>{entry.date}</strong> - {entry.description}
      </p>
      <p>Specialist: {entry.specialist}</p>
      <p>
        <strong>Employer:</strong> {entry.employerName}
      </p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}
      {entry.sickLeave && (
        <p>
          <strong>Sick leave:</strong> {entry.sickLeave.startDate} -{" "}
          {entry.sickLeave.endDate}
        </p>
      )}
      <Work style={{ color: "blue" }} />
    </div>
  );
};

export default OccupationalHealthcareEntry;
