import { FHIR_BASE, RESOURCE_TYPE } from "../constants";

export function findParticipant(resourceType, participant) {
  return participant.find(p => p.resourceType === resourceType);
}

function composeName(name) {
  const prefix = name.prefix ? name.prefix + " " : "";
  const given = name.given ? name.given.join(" ") : "";
  const family = name.family || "";
  const suffix = name.suffix ? " " + name.suffix : "";
  return `${prefix}${given}${family}${suffix};`;
}

export function getParticipantDisplay(resource) {
  const { name } = resource;
  if (!name || name.length === 0) {
    return "";
  }

  if (Array.isArray(name)) {
    const displayName = name.find(n => n.use === "official") || name[0];
    return displayName.text || composeName(name);
  }

  return name;
}

export function getParticipantUrlParts(resource) {
  return [FHIR_BASE, `${resource.resourceType}/${resource.id}`];
}

export function getPatientSearchUrlParts(name) {
  return [FHIR_BASE, `${RESOURCE_TYPE.Patient}?name=${name}`];
}

export function getAppointmentSearchUrlParts(patient) {
  return [FHIR_BASE, `${RESOURCE_TYPE.Appointment}?patient=${patient.id}`];
}
