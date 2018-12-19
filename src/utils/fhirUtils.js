import { FHIR_BASE, RESOURCE_TYPE } from "../constants";

export function findParticipant(resourceType, appointment) {
  const { participant } = appointment;
  return participant.find(p => p.actor.reference.includes(resourceType));
}

export function getParticipantDisplay(participant) {
  return participant.actor.display;
}

export function getParticipantUrlParts(participant) {
  const reference = participant.actor.reference;
  return [FHIR_BASE, reference];
}

export function getPatientSearchUrlParts(name) {
  return [FHIR_BASE, `${RESOURCE_TYPE.Patient}?name=${name}`];
}

export function getAppointmentSearchUrlParts(patientParticipant) {
  const reference = patientParticipant.actor.reference;
  const [, patientId] = reference.split("/");
  return [FHIR_BASE, `${RESOURCE_TYPE.Appointment}?patient=${patientId}`];
}
