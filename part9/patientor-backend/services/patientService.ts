import patients from '../data/patients'

import { HiddenSSN, Patient, NewPatient } from '../types'

import data from '../data/patients'

import {v1 as uuid} from 'uuid'

const getPatientsWOssn = (): HiddenSSN[]  => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const getPatients = ():Array<Patient> => {
  return data
}

const getPatient = (id: string):Patient | undefined => {
  const patient =  data.find(p => p.id === id)
  return patient
}

const addPatient = (entry: NewPatient):Patient => {
    const newPatient = {
      id: uuid(),
      ...entry,
      entries: []
    }
    patients.push(newPatient)
    return newPatient
}


export default {
  getPatientsWOssn,
  getPatients,
  addPatient,
  getPatient
}