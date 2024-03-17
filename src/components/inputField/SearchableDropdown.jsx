import React from "react";
import Select from "react-select";

const customStyles = {
  // Style for the control (the input container)
  control: (provided, state) => ({
    // Example: Apply a border and box shadow when focused
    ...provided,
    // border: state.isFocused ? "1px solid #d3d3d3" : "1px solid #d3d3d3",
    "&:hover": {
      border: "1px solid #d3d3d3", // Remove the blue outline border on hover
    },
    width: "100%",
    height: "52px",
    marginBottom: "12px",
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    borderRadius: "5px",
    border: "1px solid #eaecf0",
    outline: state.isFocused ? "none" : "none",
    paddingLeft: "20px",
    fontFamily: "satoshi",
    fontSize: "14px",
  }),

  // Style for the option in the dropdown menu
  option: (provided, state) => ({
    // Example: Change background color and font color when hovered
    ...provided,
    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
    color: state.isFocused ? "#292929" : "#292929",
    fontWeight: state.isFocused ? "500" : "400",
    cursor: "pointer",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#2e2d2d",
    fontFamily: "satoshi",
  }),

  // Style for the menu (the dropdown list)
  menu: (provided, state) => ({
    // Example: Change the border and background color of the menu
    ...provided,
    border: "2px solid #ccc",
    backgroundColor: "white",
  }),
};

const SearchableDropdown = ({
  options,
  placeholder,
  handleInputChange,
  selectedOption,
}) => {
  return (
    <div>
      <Select
        options={options}
        value={selectedOption}
        styles={customStyles}
        isClearable={true}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchableDropdown;
