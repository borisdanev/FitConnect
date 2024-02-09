import { useSelector } from "react-redux";
import { RootState } from "../store";
const useDynamicInitialValues = (inputs: number[]) => {
  // const initialValues = Object.fromEntries(
  //   inputs.flatMap((item, i) =>
  //     Array.from({ length: item }, (_, k) => {
  //       const key = `input${i}${k + 1}`;
  //       return [key, ""];
  //     })
  //   )
  // );
  const selectedDays = useSelector(
    (state: RootState) => state.program.selectedDays
  );
  console.log(selectedDays);
  console.log(inputs);
  // const initialValues = Object.fromEntries(
  //   inputs.flatMap((item, i) => [
  //     ...Array.from({ length: item }, (_, k) => {
  //       const key = `input${i}${k + 1}`;
  //       return [key, ""];
  //     }),
  //     [`name${i + 1}`, ""],
  //   ])
  // );
  const initialValues = Object.fromEntries(
    inputs.flatMap((item, i) => {
      // Check if the index i is included in the selected array
      if (selectedDays.includes(i)) {
        // If included, add the corresponding "name${i + 1}" input
        return [
          ...Array.from({ length: item }, (_, k) => {
            const key = `input${i}${k + 1}`;
            return [key, ""];
          }),
          [`name${i}`, ""],
        ];
      } else {
        // Otherwise, return only the initial values for inputs
        return Array.from({ length: item }, (_, k) => {
          const key = `input${i}${k + 1}`;
          return [key, ""];
        });
      }
    })
  );
  return initialValues;
};
export default useDynamicInitialValues;
