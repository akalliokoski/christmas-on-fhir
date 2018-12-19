import axios from "axios";
import { FHIR_BASE, RESOURCE_TYPE } from "../constants";

async function searchResource(url) {
  const response = await axios.get(url).catch(err => {
    console.log(`Failed to find resource ${url}`);
    return null;
  });

  if (!response) {
    return null;
  }

  const entry = response.data.entry || [];
  return entry.length === 1 ? entry[0].resource : null;
}

async function searchPatient(patientIdentifier) {
  const url = `${FHIR_BASE}/${
    RESOURCE_TYPE.Patient
  }?identifier=${patientIdentifier}`;
  return searchResource(url);
}

async function searchAppointment(patientId) {
  const url = `${FHIR_BASE}/${RESOURCE_TYPE.Appointment}?patient=${patientId}`;
  return searchResource(url);
}

export async function getAppointment(patientIdentifier) {
  const patient = await searchPatient(patientIdentifier);
  if (!patient) {
    return null;
  }

  return await searchAppointment(patient.id);
}

export async function getReference(reference) {
  const url = `${FHIR_BASE}/${reference}`;
  const response = await axios.get(url).catch(err => {
    console.log(`Failed to get reference ${url}`);
    return null;
  });

  return response ? response.data : null;
}

export async function getParticipant(appointment) {
  if (!appointment) {
    return [];
  }

  const { participant = [] } = appointment;
  return Promise.all(participant.map(p => getReference(p.actor.reference)));
}
