import { useState } from "react";
import { setSearchKeyword, selectView } from "../store";
import { useDispatch } from "react-redux";
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
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "40rem",
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
        value={value}
        style={{
          paddingLeft: "10%",
          width: "90%",
          height: "100%",
          borderRadius: "5rem",
          border: "none",
        }}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
      />
    </form>
  );
};
export default SearchBar;
