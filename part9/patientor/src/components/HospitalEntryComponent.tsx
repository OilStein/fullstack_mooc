import React from 'react';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';



export const HospitalEntryComponent = ({ props }: { props: HospitalEntry }) => {
  return <div>
      <h2>{props.date}</h2>
      <div>
        Visit type: {props.type} <br />
        Description: {props.description} <br />
        Discharge date: {props.discharge.date} <br />
        Discharge criteria: {props.discharge.criteria} <br />
        {mapDiagnosesToComponent(props)}
      </div>
  </div>;
};


export const OccupationalHealthcareComponent = ({ props }: { props: OccupationalHealthcareEntry }) => {
  return (
      <div>
          <h2>{props.date} <strong>{props.employerName}</strong> </h2>
          <div>
            Visit type: {props.type} <br />
            Description: {props.description}
            {mapDiagnosesToComponent(props)}
          </div>
        
      </div>
  );
};

export const HealthCheckEntryComponent = ({ props }: { props: HealthCheckEntry }) => {
  let rateVisit;
  if (props.healthCheckRating === 0) {
    rateVisit = <Icon color='green' className='heart outline' />;
} else if (props.healthCheckRating <= 3) {
    rateVisit = <Icon color='yellow' className='heart outline' />;
} else {
    rateVisit = <Icon color='red' className='heart outline' />;
}
  return (
      <div>
          <h1>{props.date}</h1>
          <div>
            Visit type: {props.type} <br />
            Description: {props.description}
            {mapDiagnosesToComponent(props)}
            rate: {rateVisit}
          </div>
          
      </div>
  );
};


const mapDiagnosesToComponent = (props: Entry) => {
  return (
      <>
          <ul>
              {props.diagnosisCodes ? props.diagnosisCodes.map((c: string) => <li key={c}> {c} {findDiagnosisName(c)}</li>) : null}
          </ul>
      </>
  );
};

const findDiagnosisName = (code: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, dispatch] = useStateValue();
  const found = state.diagnoses.find(c => c.code === code);
  return found ? found.name : '';
};

export default {
  HospitalEntryComponent,
  OccupationalHealthcareComponent,
  HealthCheckEntryComponent
};