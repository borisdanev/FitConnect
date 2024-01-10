import { FormEvent } from "react";
import { IoIosSearch } from "react-icons/io";
const SearchBar = () => {
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log("somethig");
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "30rem",
        position: "relative",
        height: "2.5rem",
        fontSize: "1.2rem",
      }}
    >
      <IoIosSearch
        style={{
          position: "absolute",
          top: "30%",
          left: "2%",
          color: "black",
        }}
      />
      <input
        style={{
          paddingLeft: "10%",
          width: "90%",
          height: "100%",
          borderRadius: "5rem",
          border: "none",
        }}
        placeholder="Search"
      />
    </form>
  );
};
export default SearchBar;
