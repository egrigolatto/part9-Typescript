import patients from "../../data/patients";

import { Patient, NonSensitivePatient, NewPatientEntry, Entry, EntryWithoutId } from "../types";

import { v1 as uuid } from "uuid";
const id = uuid();

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) throw new Error("Patient not found");
  return patient;
}

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

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const newEntry = {
    id,
    ...entry,
  };

  const patient = patients.find((p) => p.id === id);
  if (!patient) throw new Error("Patient not found");

  if (!patient.entries) {
    patient.entries = [];
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export default {    
  getPatients,
  getNonSensitivePatient,
  addPatient,
  getPatient,
  addEntry
};