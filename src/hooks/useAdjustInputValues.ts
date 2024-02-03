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
      if (Object.keys(initialValues).length === 0) {
        await formik.setValues({});
        return;
      }
      const dynamicValues: { [key: string]: string } = {};
      const adjustedValues = Object.keys(formik.values)
        .map((key) => parseInt(key.split("input")[1]))
        .filter(
          (item) =>
            !(item > removedExerciseIndex && item <= removedExerciseIndex + 3)
        )
        .map((item) => ({
          key:
            item > removedExerciseIndex + 3
              ? `input${item - 3}`
              : `input${item}`,
          value: formik.values[`input${item}`],
        }));
      Object.keys(initialValues).forEach((key) => {
        const presentValue = adjustedValues.find((item) => item.key === key);
        if (!presentValue) {
          dynamicValues[key] = "";
          return;
        }
        dynamicValues[key] = presentValue.value;
      });
      await formik.setValues({ ...dynamicValues });
    };
    adjustValues();
    dispatch(setRemovedExerciseIndex(undefined));
  }, [removedExerciseIndex]);
};
export default useAdjustInputValues;
