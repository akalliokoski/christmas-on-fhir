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
    start: Date.now(),
    end: Date.now() + 10000,
    practitionerId: "Dr",
    roomId: "100"
  };
};
