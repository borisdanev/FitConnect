import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setRemovedExerciseIndex } from "../store";
import { FormikProps } from "formik";
const useAdjustInputValues = (
  initialValues: Object,
  formik: FormikProps<{ [key: string]: string }>
) => {
  const removedExerciseIndex = useSelector(
    (state: RootState) => state.program.removedExerciseIndex
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (removedExerciseIndex === undefined) return;
    console.log(initialValues);
    console.log(formik.values);
    console.log(removedExerciseIndex);
    const adjustedValues = Object.keys(formik.values)
      .map((key) => parseInt(key.split("input")[1]))
      .filter(
        (item) =>
          !(item >= removedExerciseIndex && item <= removedExerciseIndex + 3)
      )
      .map((item) => `input${item}`);
    console.log(adjustedValues);
    // const adjustValues = async () => {
    //   if (Object.keys(initialValues).length === 0) {
    //     await formik.setValues({});
    //     return;
    //   }
    //   console.log(formik.values);
    //   console.log(initialValues);
    //   const addedValues: { [key: string]: string } = {};
    //   Object.keys(initialValues).forEach((key) => {
    //     let changedKey: string | number = parseFloat(key.split("input")[1]);
    //     changedKey = `input${changedKey - 3}`;
    //     if (Object.keys(formik.values).includes(key)) {
    //       addedValues[key] = formik.values[key];
    //     }
    //     addedValues[key] = "";
    //   });
    //   console.log(addedValues);
    //   const keysToRemove = Object.keys(initialValues).slice(
    //     removedExerciseIndex,
    //     removedExerciseIndex + 3
    //   );
    //   let updatedKeys = Object.keys(formik.values).filter(
    //     (key) => !keysToRemove.includes(key)
    //   );
    //   console.log(updatedKeys);
    //   const emptyFields = Object.keys(initialValues).filter(
    //     (item) => !updatedKeys.includes(item)
    //   );
    //   console.log(emptyFields);
    //   const adjustedValues = { ...formik.values };
    //   emptyFields.forEach((key) => (adjustedValues[key] = ""));

    //   await formik.setValues({ ...adjustedValues });
    // };
    // adjustValues();
    dispatch(setRemovedExerciseIndex(undefined));
  }, [removedExerciseIndex]);
};
export default useAdjustInputValues;
