export interface ApplyFormValues {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  message: string;
}

export interface ApplyFormProps {
  initialValues?: Partial<ApplyFormValues>;
  onSubmit: (values: ApplyFormValues) => void;
  // You can extend with more config props as needed
}
