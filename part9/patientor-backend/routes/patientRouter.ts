import express from 'express';
import patientService from '../services/patientService'
import {toNewPatient, toNewEntry} from '../utils/utlis';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsWOssn());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    const addedPatient = patientService.addPatient(newPatient)
    res.json(addedPatient)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  const patient = patientService.getPatient(id)
  if (patient) {
    res.send(patient)
  }
  else {
    res.sendStatus(404)
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id
    const payload = toNewEntry(req.body)
    const addEntry = patientService.addNewEntry(id, payload);
    res.send(addEntry);
  } catch (e) {
    
  }
})

export default router;