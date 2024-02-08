import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const useDynamicSchema = (inputs: number[]) => {
  // const schemaEntries = inputs.flatMap((item, i) =>
  //   Array.from({ length: item }, (_, k) => {
  //     const key = `input${i}${k + 1}`;
  //     return [key, Yup.string().required("Required")];
  //   })
  // );
  // const schemaEntries = inputs.flatMap((item, i) => [
  //   ...Array.from({ length: item }, (_, k) => {
  //     const key = `input${i}${k + 1}`;
  //     return [key, Yup.string().required("Required")];
  //   }),
  //   [`name${i + 1}`, Yup.string().required("Required")],
  // ]);
  const selectedDays = useSelector(
    (state: RootState) => state.program.selectedDays
  );
  const schemaEntries = inputs.flatMap((item, i) => {
    const schema = Array.from({ length: item }, (_, k) => {
      const key = `input${i}${k + 1}`;
      return [key, Yup.string().required("Required")];
    });

    // Check if the index i is included in the selected array
    if (selectedDays.includes(i)) {
      // If included, add the corresponding "name${i}" input
      return [...schema, [`name${i}`, Yup.string().required("Required")]];
    } else {
      // Otherwise, return only the schema entries for inputs
      return schema;
    }
  });
  const schemaObject = Object.fromEntries(schemaEntries);
  return Yup.object().shape(schemaObject);
};
export default useDynamicSchema;
