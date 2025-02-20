import { LocalHospital } from "@mui/icons-material";
import { HospitalEntry as HospitalEntryType } from "../../types";

interface Props {
  entry: HospitalEntryType;
}

const HospitalEntry = ({ entry }: Props) => {
  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <p>
        <strong>{entry.date}</strong> - {entry.description}
      </p>
      <p>Specialist: {entry.specialist}</p>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}
      <p>
        <strong>Discharge:</strong> {entry.discharge.date} -{" "}
        {entry.discharge.criteria}
      </p>
      <LocalHospital style={{ color: "red" }} />
    </div>
  );
};

export default HospitalEntry;
