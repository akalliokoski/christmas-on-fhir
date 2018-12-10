export const getAppointment = patient => {
  if (!patient) {
    throw new Error("patient was not provided for getting the appointment");
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

export const getPractitioner = appointment => {
  return {
    id: appointment.practitionerId,
    firstName: "Homer",
    lastName: "Simpson"
  };
};

export const getRoom = appointment => {
  return {
    id: appointment.roomId,
    info: "1st Floor"
  };
};
