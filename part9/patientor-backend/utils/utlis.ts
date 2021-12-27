import { BaseEntry, Entry, HealthCheckRating, NewPatient} from "../types";

enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown}

export const toNewPatient = (object: Fields):NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  }
  return newPatient
}

const isType = (param: string): param is 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
  return ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(param);
};

export const toNewEntry = (object:any): Entry => {

  const type = object.type

  if (!object || !isType(type)) {
    throw new Error('No object or invalid object type!');
  }

  const entry: BaseEntry = {
    id: parseString(object.id),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
  };

  switch (type) {
    case 'HealthCheck':
        return {
            ...entry,
            type: 'HealthCheck',
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
    case 'OccupationalHealthcare':
        return {
            ...entry,
            type: 'OccupationalHealthcare',
            employerName: parseString(object.employerName),
            sickLeave: {
                startDate: parseDate(object.sickLeave.startDate),
                endDate: parseDate(object.sickLeave.endDate)
            }
        };
    case 'Hospital':
        return {
            ...entry,
            type: 'Hospital',
            discharge: {
                date: parseDate(object.discharge.date),
                criteria: parseString(object.discharge.criteria)
            }
        };
    default:
        return assertNever(type);
  }
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name
}

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn')
  }
  return ssn
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing ssn')
  }
  return occupation
}


const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if( !gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender
}

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
      throw new Error('Incorrect or missing something ' + str);
  }
  return str;
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const isHealthRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthRating(rating)) {
      throw new Error('Incorrect or missing health check rating' + rating);
  }
  return rating;
};

export default {
  toNewPatient,
  toNewEntry
}