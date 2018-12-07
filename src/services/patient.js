export const getPatient = id => {
  const parsed = Number(id);
  if (isNaN(parsed)) {
    return null;
  }

  return { id: parsed };
};
