const useDynamicInitialValues = (totalInputs: number) => {
  const initialValues: any = {};
  Array(totalInputs).forEach((_, i) => {
    const key = `input${i + 1}`;
    initialValues[key] = "";
  });
  return initialValues;
};
export default useDynamicInitialValues;
