import patients from "../../data/patients";

import { Patient, NonSensitivePatient, NewPatientEntry } from "../types";

import { v1 as uuid } from "uuid";
const id = uuid();

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {    
  getPatients,
  getNonSensitivePatient,
  addPatient
};