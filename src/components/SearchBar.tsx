import { useState } from "react";
import { setSearchKeyword, selectView } from "../store";
import { useDispatch } from "react-redux";
import useScreenSize from "../hooks/useScreenSize";
import { ViewEnum } from "../enums/View";
import { FormEvent } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
const SearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const [openedSearch, setOpenedSearch] = useState<boolean>(false);
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(setSearchKeyword(value));
    dispatch(selectView(ViewEnum.Home));
    setOpenedSearch(false);
  };
  const screenSize = useScreenSize();
  const searchForm = (
    <form
      onSubmit={handleSubmit}
      style={{
        width: "90%",
        position: "relative",
        height: screenSize > 600 ? "2.5rem" : "2rem",
        fontSize: "1.2rem",
        maxWidth: "90%",
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
  return (
    <>
      {screenSize > 430 ? (
        <>{searchForm}</>
      ) : (
        <>
          <IconButton sx={{ ml: 1 }} onClick={() => setOpenedSearch(true)}>
            <IoIosSearch />
          </IconButton>
          {openedSearch && (
            <Box
              className="position-fill"
              sx={{
                position: "fixed",
                display: "flex",
                justifyContent: "center",
                bgcolor: "rgba(0, 0, 0, 0.6)",
                zIndex: 99,
                pt: 4,
              }}
            >
              <IconButton
                sx={{ position: "absolute", right: "0.5rem", top: "0.5rem" }}
                onClick={() => setOpenedSearch(false)}
              >
                <IoMdClose />
              </IconButton>
              <Box sx={{ width: "70%" }}>{searchForm}</Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};
export default SearchBar;
