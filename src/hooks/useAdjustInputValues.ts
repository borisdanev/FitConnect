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
  const currentSessionIndex = useSelector(
    (state: RootState) => state.program.currentSessionIndex
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
        .map((key) => {
          const [_, index] = key.split("input");
          return {
            exerciseIndex: parseInt(index.slice(1)),
            sessionIndex: parseInt(index.charAt(0)),
          };
        })
        .filter(
          (item) =>
            currentSessionIndex === item.sessionIndex &&
            !(
              item.exerciseIndex > removedExerciseIndex &&
              item.exerciseIndex <= removedExerciseIndex + 3
            )
        )
        .map((item) => {
          return {
            key:
              item.exerciseIndex > removedExerciseIndex + 3
                ? `input${currentSessionIndex}${item.exerciseIndex - 3}`
                : `input${currentSessionIndex}${item.exerciseIndex}`,
            value:
              formik.values[`input${currentSessionIndex}${item.exerciseIndex}`],
          };
        });
      Object.keys(initialValues).forEach((key) => {
        const [_, index] = key.split("input");
        const currentIndex = parseInt(index.charAt(0));
        if (currentIndex !== currentSessionIndex) {
          if (Object.keys(formik.values).includes(key))
            dynamicValues[key] = formik.values[key];
          else dynamicValues[key] = "";
          return;
        }
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
