import express from "express";

import patientService from "../services/patientsService";

import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  const patients = patientService.getPatients();
  res.send(patients);
});

router.get("/:id", (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    res.send(patient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
  
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const { id } = req.params;
    const newEntry = utils.toNewEntry(req.body);
    const addedEntry = patientService.addEntry(id, newEntry)
    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
 })


export default router;