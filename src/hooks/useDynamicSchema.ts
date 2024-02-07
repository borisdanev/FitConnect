import * as Yup from "yup";
const useDynamicSchema = (inputs: number[]) => {
  const schemaEntries = inputs.flatMap((item, i) =>
    Array.from({ length: item }, (_, k) => {
      const key = `input${i}${k + 1}`;
      return [key, Yup.string().required("Required")];
    })
  );
  let schemaObject = Object.fromEntries(schemaEntries);
  return Yup.object().shape(schemaObject);
};
export default useDynamicSchema;
