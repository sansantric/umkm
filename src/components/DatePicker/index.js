import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerComponent() {
  const currentDate = new Date();
  const minDate = currentDate;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast
        sx={{ width: "100%" }}
        slotProps={{
          textField: {
            sx: { fontSize: "1rem", justifyContent: "flex-end", width: "100%" },
          },
          inputAdornment: {
            sx: { justifyContent: "flex-end", width: "100%" },
          },
        }}
      />
    </LocalizationProvider>
  );
}
