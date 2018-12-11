export const getPatient = async id => {
  const parsedId = Number(id);
  if (isNaN(parsedId)) {
    return null;
  }

  return {
    id: parsedId,
    firstName: "Bart",
    lastName: "Simpson"
  };
};

export const getAppointment = async patient => {
  if (!patient) {
    return null;
  }

  const { id } = patient;

  if (id === 0) {
    return null;
  }

  return {
    id: "",
    start: new Date(),
    end: new Date() + 10000,
    practitionerId: "Dr",
    roomId: "100"
  };
};

export const getPractitioner = async appointment => {
  if (!appointment) {
    return null;
  }

  return {
    id: appointment.practitionerId,
    firstName: "Homer",
    lastName: "Simpson"
  };
};

export const getRoom = async appointment => {
  if (!appointment) {
    return null;
  }

  return {
    id: appointment.roomId,
    info: "1st Floor"
  };
};
