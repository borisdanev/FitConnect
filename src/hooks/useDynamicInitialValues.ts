const useDynamicInitialValues = (inputs: number[]) => {
  const initialValues = Object.fromEntries(
    inputs.flatMap((item, i) =>
      Array.from({ length: item }, (_, k) => {
        const key = `input${i}${k + 1}`;
        return [key, ""];
      })
    )
  );
  inputs.forEach((_, i) => (initialValues[`name${i + 1}`] = ""));
  return initialValues;
};
export default useDynamicInitialValues;
