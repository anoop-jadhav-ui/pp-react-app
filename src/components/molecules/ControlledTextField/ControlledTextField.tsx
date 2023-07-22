import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

export type ControlledTextFieldType =
  | TextFieldProps & {
      rules?: Exclude<
        RegisterOptions,
        "valueAsNumber" | "valueAsDate" | "setValueAs"
      >;
      callbackToUpdateStore?: (newValue: string) => void;
    };

const ControlledTextField = (props: ControlledTextFieldType) => {
  const { control } = useFormContext();
  const { callbackToUpdateStore, rules, ...otherProps } = props;

  return (
    <Controller
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
          const updatedValue = event.target.value;
          onChange(updatedValue);
          callbackToUpdateStore?.(updatedValue);
        };

        return (
          <TextField
            {...otherProps}
            value={value}
            onChange={handleInputChange}
            ref={ref}
            error={Boolean(error)}
            helperText={error ? error.message : ""}
            fullWidth
          />
        );
      }}
      control={control}
      name={props.name || ""}
      rules={rules}
    />
  );
};

export default ControlledTextField;
