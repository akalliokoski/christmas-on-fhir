import { FHIR_BASE, RESOURCE_TYPE } from "../constants";
import equal from "fast-deep-equal";
import AppointmentTemplate from "../assets/fhir-templates/Appointment";
import PatientTemplate from "../assets/fhir-templates/Patient";
import LocationTemplate from "../assets/fhir-templates/Location";
import PractitionerTemplate from "../assets/fhir-templates/Practitioner";

export function findParticipant(resourceType, participant) {
  if (!participant) {
    return null;
  }

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

export function validateResources(appointment, participant) {
  return (
    validateAppointment(appointment) &&
    validatePatient(participant) &&
    validatePractitioner(participant) &&
    validateLocation(participant)
  );
}

function validateAppointment(appointment) {
  return appointment && equal(appointment.reason, AppointmentTemplate.reason);
}

function validatePatient(participant) {
  const patient = findParticipant(RESOURCE_TYPE.Patient, participant);
  return (
    patient &&
    equal(patient.name, PatientTemplate.name) &&
    equal(patient.address, PatientTemplate.address)
  );
}

function validatePractitioner(participant) {
  const practitioner = findParticipant(RESOURCE_TYPE.Practitioner, participant);
  return practitioner && equal(practitioner.name, PractitionerTemplate.name);
}

function validateLocation(participant) {
  const location = findParticipant(RESOURCE_TYPE.Location, participant);
  return location && location.name === LocationTemplate.name;
}
