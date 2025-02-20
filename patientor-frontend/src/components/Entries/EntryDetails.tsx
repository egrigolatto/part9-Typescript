import { Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntr";

export interface IEntryDetailsProps {
  entry: Entry;
}

export function EntryDetails ({entry}: IEntryDetailsProps) {
 switch (entry.type) {
   case "HealthCheck":
     return <HealthCheckEntry entry={entry} />;
   case "Hospital":
     return <HospitalEntry entry={entry} />;
   case "OccupationalHealthcare":
     return <OccupationalHealthcareEntry entry={entry} />;
   default:
     return assertNever(entry);
 }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};