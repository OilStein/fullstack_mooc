
export interface Diagnose {
  code: string
  name: string
  latin?: string
}

export interface Entry {

}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: string
  occupation: string
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">

export type HiddenSSN = Omit<Patient, "ssn" | "entries">

export type NewPatient = Omit<Patient, "id" | "entries">
