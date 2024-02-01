import * as Yup from "yup";

const useDynamicSchema = (totalInputs: number) => {
  const schemaObject: { [key: string]: Yup.StringSchema<string> } = {};
  Array(totalInputs).forEach((_, i) => {
    const key = `input${i + 1}`;
    schemaObject[key] = Yup.string().required(`Field is required`);
  });
  return Yup.object().shape(schemaObject);
};
export default useDynamicSchema;
