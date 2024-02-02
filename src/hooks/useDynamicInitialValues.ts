interface FormValues {
  [key: string]: string;
}
const useDynamicInitialValues = (totalInputs: number) => {
  const initialValues: FormValues = {};
  Array(totalInputs)
    .fill(null)
    .forEach((_, i) => {
      const key = `input${i + 1}`;
      initialValues[key] = "";
    });
  return initialValues;
};
export default useDynamicInitialValues;
