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
    const adjustValues = async () => {
      const keysToRemove = Object.keys(formik.values).slice(
        removedExerciseIndex,
        removedExerciseIndex + 3
      );
      let updatedKeys = Object.keys(formik.values).filter(
        (key) => !keysToRemove.includes(key)
      );
      const emptyFields = Object.keys(initialValues).filter(
        (item) => !updatedKeys.includes(item)
      );
      const adjustedValues = { ...formik.values };
      emptyFields.forEach((key) => (adjustedValues[key] = ""));
      await formik.setValues({ ...adjustedValues });
    };
    adjustValues();
    dispatch(setRemovedExerciseIndex(undefined));
  }, [removedExerciseIndex]);
};
export default useAdjustInputValues;
