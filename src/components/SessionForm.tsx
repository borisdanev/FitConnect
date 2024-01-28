import { useState } from "react";
import FormContainer from "./FormContainer";
import SelectionCalendar from "./SelectionCalendar";
const SessionForm: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {};
  return (
    <FormContainer text="Sessions" handleSubmit={handleSubmit}>
      <SelectionCalendar
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
    </FormContainer>
  );
};
export default SessionForm;
