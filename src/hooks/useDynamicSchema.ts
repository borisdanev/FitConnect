import * as Yup from "yup";
const useDynamicSchema = (totalInputs: number) => {
  const schemaObject: { [key: string]: Yup.StringSchema<string> } = {};
  Array(totalInputs)
    .fill(null)
    .forEach((_, i) => {
      const key = `input${i + 1}`;
      schemaObject[key] = Yup.string().required(`Required`);
    });
  return Yup.object().shape(schemaObject);
};
export default useDynamicSchema;
