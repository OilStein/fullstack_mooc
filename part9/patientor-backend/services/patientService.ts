import patients from '../data/patients.json'

import { HiddenSSN, Patient, NewPatient } from '../types'

import {v1 as uuid} from 'uuid'

const getPatients = ():HiddenSSN[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const addPatient = (entry: NewPatient):Patient => {
    const newPatient = {
      id: uuid(),
      ...entry
    }
    patients.push(newPatient)
    return newPatient
}


export default {
  getPatients,
  addPatient
}