import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RootState,
  setCurrentSessionIndex,
  setRemovedExerciseIndex,
} from "../store";
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
      let currentIndex: number = 0;
      const adjustedValues = Object.keys(formik.values)
        .map((key) => {
          const [input, index] = key.split("input");
          currentIndex = parseInt(index.charAt(0));
          // console.log(currentSessionIndex);
          // console.log(currentIndex);
          // console.log(removedExerciseIndex);
          // console.log(parseInt(index.slice(1)));
          return parseInt(index.slice(1));
        })
        .filter(
          (item) =>
            currentSessionIndex === currentIndex &&
            !(item > removedExerciseIndex && item <= removedExerciseIndex + 3)
        )
        .map((item) => {
          console.log(item);
          return {
            key:
              item > removedExerciseIndex + 3
                ? `input${currentSessionIndex}${item - 3}`
                : `input${currentSessionIndex}${item}`,
            value: formik.values[`input${currentSessionIndex}${item}`],
          };
        });
      console.log(adjustedValues);
      // console.log(formik.values);
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
