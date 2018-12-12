import { Patient, Appointment, Practitioner, Room } from "../models";

export async function getPatient(id) {
  const parsedId = Number(id);
  if (isNaN(parsedId)) {
    return null;
  }

  return new Patient(parsedId, "Bart", "Simpson");
}

export async function getAppointment(patient) {
  if (!patient) {
    return null;
  }

  const { id } = patient;

  if (id === 0) {
    return null;
  }

  return new Appointment("", new Date(), new Date() + 10000, "Dr", "100");
}

export async function getPractitioner(appointment) {
  if (!appointment) {
    return null;
  }

  return new Practitioner(appointment.practitionerId, "Homer", "Simpson");
}

export async function getRoom(appointment) {
  if (!appointment) {
    return null;
  }

  return new Room(appointment.roomId, "1st Floor");
}
