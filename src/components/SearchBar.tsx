import { useState } from "react";
import { setSearchKeyword, selectView } from "../store";
import { useDispatch } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import { ViewEnum } from "../enums/View";
import { FormEvent } from "react";
import { IoIosSearch } from "react-icons/io";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(setSearchKeyword(value));
    dispatch(selectView(ViewEnum.Home));
  };
  const screenSize = useScreenSize();
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        position: "relative",
        height: screenSize > 600 ? "2.5rem" : "2rem",
        fontSize: "1.2rem",
        maxWidth: "100%",
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
        value={value}
        style={{
          paddingLeft: screenSize > 600 ? "10%" : "15%",
          width: "90%",
          height: "100%",
          borderRadius: "5rem",
          border: "none",
          maxWidth: "100%",
          // paddingLeft: screenSize < 600 ? "0.5rem" : "",
        }}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search Workout"
      />
    </form>
  );
};
export default SearchBar;
