import { NewPatientEntry, Gender, Entry, EntryWithoutId , Diagnose, HealthCheckEntry, SickLeave} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error("Incorrect or missing string");
  }

  return str;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

const isEntryTypeValid = (type: unknown): type is Entry["type"] => {
  return (
    type === "HealthCheck" ||
    type === "Hospital" ||
    type === "OccupationalHealthcare"
  );
};

const parseDiagnosisCodes = (codes: unknown): Diagnose["code"][] => {
  if (!codes) {
    return [];
  }

  if (
    !Array.isArray(codes) ||
    !codes.every((code) => typeof code === "string")
  ) {
    throw new Error(`Incorrect or missing diagnosisCodes: ${codes}`);
  }

  return codes as Diagnose["code"][];
};
const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object" || !("startDate" in object) || !("endDate" in object)) {
    return {} as SickLeave;
  }
  return {
    startDate: object.startDate,
    endDate: object.endDate
  } as SickLeave;
};

const parseHealthCheckRating = (
  param: unknown
): HealthCheckEntry["healthCheckRating"] => {
  if (!isHealthCheckRating(param)) {
    throw new Error(`Incorrect or missing healthCheckRating: ${param}`);
  }
  return param;
};




const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newEntry;
  }

  throw new Error("Incorrect data: a field missing");
};

const parseEntryType = (type: unknown): Entry["type"] => {
  if (!isEntryTypeValid(type)) {
    throw new Error("Tipo de entrada inválido");
  }
  return type;
};

const isHealthCheckRating = (
  param: unknown
): param is HealthCheckEntry["healthCheckRating"] => {
  return typeof param === "number" && param >= 0 && param <= 3;
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!("type" in object) || !isString(object.type)) {
    throw new Error("Missing or incorrect type");
  }

  const type = object.type;

  if (type === "HealthCheck") {
    if (
      !(
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "healthCheckRating" in object
      )
    ) {
      throw new Error("Missing fields for HealthCheck entry");
    }

    const newEntry: EntryWithoutId = {
      type: "HealthCheck",
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    }

    return newEntry;
  }

  if (type === "Hospital") {
    if (
      !(
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "discharge" in object
      )
    ) {
      throw new Error("Missing fields for Hospital entry");
    }

    if (
      !object.discharge ||
      typeof object.discharge !== "object" ||
      !("date" in object.discharge && "criteria" in object.discharge)
    ) {
      throw new Error("Invalid or missing discharge data");
    }

    const newEntry: EntryWithoutId = {
      type: "Hospital",
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      diagnosisCodes:
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : [],
      discharge: {
        date: parseDate(object.discharge.date),
        criteria: parseString(object.discharge.criteria),
      },
    };
    return newEntry;
  }

  if (type === "OccupationalHealthcare") {
    if (
      !(
        "date" in object &&
        "specialist" in object &&
        "description" in object &&
        "employerName" in object 
      )
    ) {
      throw new Error("Missing fields for OccupationalHealthcare entry");
    }

    const newEntry: EntryWithoutId = {
      type: "OccupationalHealthcare",
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      employerName: parseString(object.employerName),
      diagnosisCodes:
        "diagnosisCodes" in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : [],
      sickLeave: "sickLeave" in object ? parseSickLeave(object.sickLeave): undefined
    };

    return newEntry;
  }


  throw new Error("Incorrect data: a field missing");

  
}


export default { toNewPatientEntry , parseEntryType, toNewEntry};
