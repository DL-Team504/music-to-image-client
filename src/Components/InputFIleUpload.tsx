import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { ChangeEventHandler, InputHTMLAttributes } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export type InputFileUploadProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  InputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "type">;
} & Omit<LoadingButtonProps, "component" | "role" | "tabIndex" | "onChange">;

export default function InputFileUpload(props: InputFileUploadProps) {
  const { sx, children, onChange, InputProps, ...rest } = props;

  return (
    // @ts-expect-error it's too much of hassle to extract the specific type for which component is a valid prop from ButtonProps
    <LoadingButton
      component="label"
      role={undefined}
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{ height: "100%", width: "100%", ...sx }}
      {...rest}
    >
      {children ?? "Upload a song"}
      <VisuallyHiddenInput type="file" onChange={onChange} {...InputProps} />
    </LoadingButton>
  );
}
