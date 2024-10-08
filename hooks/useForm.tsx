import { ChangeEventHandler, useState } from "react";

export default function useForm(
  initialValues: Record<string, string | number | boolean>
): [
  Record<string, string | number | boolean>,
    ChangeEventHandler<HTMLInputElement | HTMLSelectElement>,
    (object: any) => void
  ] {
  const [values, setValues] = useState<
    Record<string, string | number | boolean>>( initialValues);
  return [
    values,
    (event: any): void => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    },
    (object : any):void => {
      setValues(object)
    }
  ];
}