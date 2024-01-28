import FormContainer from "./FormContainer";
import SelectionCalendar from "./SelectionCalendar";
const SessionForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {};
  return (
    <FormContainer text="Sessions" handleSubmit={handleSubmit}>
      <SelectionCalendar />
    </FormContainer>
  );
};
export default SessionForm;
