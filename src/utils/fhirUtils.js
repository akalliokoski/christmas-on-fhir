import { FHIR_BASE, RESOURCE_TYPE } from "../constants";

export function getResourceUrl(resourceType, id) {
  return `${FHIR_BASE}/${resourceType}/${id}`;
}

export function findParticipant(resourceType, appointment) {
  const { participant } = appointment;
  return participant.find(p => p.actor.reference.includes(resourceType));
}

export function getParticipantDisplay(participant) {
  return participant.actor.display;
}

export function getParticipantUrl(participant) {
  const reference = participant.actor.reference;
  return `${FHIR_BASE}/${reference}`;
}

export function getPatientSearchUrl(name) {
  return `${FHIR_BASE}/${RESOURCE_TYPE.Patient}?name=${name}`;
}
