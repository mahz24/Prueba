export const getResidentIds = (residents = []) => {
  const ids = residents.map((resident) => {
    return resident.split("/").pop();
  });
  return ids.join();
};
