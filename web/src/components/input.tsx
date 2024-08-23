import { Control, FieldValues, Path, useController } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  password?: boolean;
  errorMessage?: string;
  onChangeText?: (text: string) => void;
  reference?: React.LegacyRef<HTMLInputElement>;
}

export type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  password?: boolean;
  control: Control<T>;
  errorMessage?: string;
  reference?: React.LegacyRef<HTMLInputElement>;
  formatter?: (value: number | string) => string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

const InputBase: React.FC<InputProps> = ({ label, errorMessage, ...rest }) => {
  return (
    <>
      <div className="border-b">
        <input
          placeholder={label}
          className="flex-1 text-sm p-2 bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500"
          {...rest}
        />
      </div>
      {errorMessage && <p className="text-xs text-red-700">{errorMessage}</p>}
    </>
  );
};

export function Input<T extends FieldValues>(props: ControlledInputProps<T>) {
  const { name, control, reference, ...inputProps } = props;
  const { field, fieldState } = useController({ name, control });

  const newProps = { ...inputProps, ...field };
  delete newProps.formatter;

  return <InputBase reference={reference} errorMessage={fieldState.error?.message} {...newProps} />;
}
