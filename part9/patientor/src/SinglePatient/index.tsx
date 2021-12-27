import React, { useEffect } from 'react';
import axios from 'axios';
import { Entry, Patient } from '../types';
import { useParams } from 'react-router';
import { useStateValue } from '../state/';
import {HospitalEntryComponent, OccupationalHealthcareComponent, HealthCheckEntryComponent} from '../components/HospitalEntryComponent';

const SinglePatient = () => {

  const { id } = useParams<{id: string}>();

  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatientData = async () => {
        try {
            const { data: patient } = await axios.get<Patient>(`http://localhost:3001/api/patients/${id}`);
            dispatch({ type: 'SET_PATIENT_VIEW', payload: patient });
        } catch (e) {
            console.error(e);
        }
    };
    if (state.patient.id !== id) {
        void fetchPatientData();
    }
  }, [state.patient.id]);

  
  if (!state.patient) {
    return (
      <h1>loading...</h1>
      );
    }
    
  const patientEntries = state.patient.entries ? state.patient.entries : [];

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
  };

  const EntryDetails = (entry: Entry) => {
      switch (entry.type) {
          case 'Hospital':
              return <HospitalEntryComponent props={entry} />;
          case 'OccupationalHealthcare':
              return <OccupationalHealthcareComponent props={entry} />;
          case 'HealthCheck':
              return <HealthCheckEntryComponent props={entry} />;
          default:
              return assertNever(entry);
      }
  };


  return (
    <div>
      <h1>{state.patient.name}</h1>
        <p>
            {state.patient.ssn} <br />
            {state.patient.occupation}
        </p>
        <div>
          <h2>Entries</h2>
          
          {patientEntries.map(e => EntryDetails(e))}
          
          
        </div>

    </div>
  );

};

export default SinglePatient;