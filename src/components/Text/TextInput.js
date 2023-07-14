import * as React from "react";
import useInput from "@mui/base/useInput";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Dropdown from "components/Dropdown";
import FileInput from "components/Text/ButtonFIle";
import DatePicker from "components/DatePicker";
import Input, { inputClasses } from "@mui/base/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/base/Button";
import Icon from "@mui/material/Icon";

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { slots, ...other } = props;
  return (
    <Input
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        ...slots,
      }}
      {...other}
      ref={ref}
    />
  );
});

CustomInput.propTypes = {
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    textarea: PropTypes.elementType,
  }),
};
const InputAdornment = styled("div")`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  // font-weight: ;
  color: rgba(0, 0, 0, 0.5);
`;
const IconButton = styled(Button)(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;  
  font-size: 1rem;
  cursor: pointer;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[700]};
  `
);

export default function TextInput(props) {
  const {
    handleChange,
    placeholder,
    type,
    width,
    disable,
    value,
    label,
    list,
    file,
    date,
    suffix,
    prefix,
    icon,
  } = props;
  const [visibility, setVisibility] = React.useState(false);
  return label ? (
    <Grid container sx={{ display: "flex", alignItems: "center" }}>
      <Grid xs={4}>
        <span style={{ fontWeight: "500", fontSize: "1rem" }}>{label}</span>
      </Grid>
      <Grid xs={8}>
        {list && <Dropdown handleOnChange={(e) => handleChange(e)} list={list} />}
        {file && <FileInput handleChange={(e) => handleChange(e)} />}
        {date && <DatePicker />}
        {!list && !file && !date ? (
          <CustomInput
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            type={type}
            style={{ width: width, backgroundColor: disable ? "#F0F0F0" : "" }}
            disabled={disable}
            value={value}
            // endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            endAdornment={
              suffix && !icon ? (
                <InputAdornment>{suffix}</InputAdornment>
              ) : (
                <InputAdornment>{suffix}</InputAdornment>
              )
            }
            startAdornment={
              prefix && !icon ? (
                <InputAdornment>{prefix}</InputAdornment>
              ) : (
                <InputAdornment>{prefix}</InputAdornment>
              )
            }
          />
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  ) : (
    <CustomInput
      placeholder={placeholder}
      onChange={(e) => handleChange(e)}
      // type={type}
      type={visibility ? "text" : type}
      style={{ width: width, backgroundColor: disable ? "#F0F0F0" : "" }}
      disabled={disable}
      value={value}
      endAdornment={
        suffix && icon ? (
          <IconButton onClick={() => setVisibility(!visibility)} sx={{ margin: "10px" }}>
            {visibility ? (
              <Icon fontSize="medium">visibility_off</Icon>
            ) : (
              <Icon fontSize="medium">visibility</Icon>
            )}
          </IconButton>
        ) : (
          <InputAdornment>{suffix}</InputAdornment>
        )
      }
    />
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};
const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[500]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  display: flex;
  align-items: center;
  justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;


  // &.${inputClasses.focused} {
  //   border-color: ${blue[400]};
  //   box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  // }

  &.Mui-focused:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  // line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
`
);
// const StyledInputElement = styled("input")(
//   ({ theme }) => `
//   font-family: IBM Plex Sans, sans-serif;
//   font-size: 1rem;
//   font-weight: 400;
//   line-height: 1.5;
//   padding: 12px;
//   margin-top: 10px;
//   margin-bottom: 10px;
//   border-radius: 12px;
//   color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
//   background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
//   border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
//   box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]};

//   &:hover {
//     border-color: ${blue[400]};
//   }

//   // &:focus {
//   //   border-color: ${blue[400]};
//   //   box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
//   // }

//   // firefox
//   &:focus-visible {
//     outline: 0;
//   }
// `
// );

TextInput.defaultProps = {
  type: "",
  disable: false,
  value: "",
  label: "",
  list: false,
  file: false,
  date: false,
  suffix: false,
  prefix: false,
  icon: false,
};

TextInput.propTypes = {
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
  disable: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  list: PropTypes.array,
  file: PropTypes.bool,
  date: PropTypes.bool,
  suffix: PropTypes.string,
  prefix: PropTypes.string,
  icon: PropTypes.bool,
};
