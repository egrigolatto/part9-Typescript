import { Favorite } from "@mui/icons-material";
import { HealthCheckEntry as HealthCheckEntryType } from "../../types";

interface Props {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry = ({ entry }: Props) => {
  const getHeartColor = (rating: number) => {
    switch (rating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "grey";
    }
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
      <p>
        <strong>{entry.date}</strong> - {entry.description}
      </p>
      <p>Specialist: {entry.specialist}</p>
      <Favorite style={{ color: getHeartColor(entry.healthCheckRating) }} />
    </div>
  );
};

export default HealthCheckEntry;
