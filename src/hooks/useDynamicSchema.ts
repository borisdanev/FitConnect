import * as Yup from "yup";
const useDynamicSchema = (inputs: number[]) => {
  // const schemaObject: { [key: string]: Yup.StringSchema<string> } = {};
  // inputs.forEach((item, i) => {
  //   Array(item)
  //     .fill(null)
  //     .forEach((_, k) => {
  //       const key = `input${i}${k + 1}`;
  //       schemaObject[key] = Yup.string().required(`Required`);
  //     });
  // });
  const schemaEntries = inputs.flatMap((item, i) =>
    Array.from({ length: item }, (_, k) => {
      const key = `input${i}${k + 1}`;
      return [key, Yup.string().required("Required")];
    })
  );
  const schemaObject = Object.fromEntries(schemaEntries);
  return Yup.object().shape(schemaObject);
};
export default useDynamicSchema;
