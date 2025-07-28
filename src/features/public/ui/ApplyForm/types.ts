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
  onSubmit?: (values: ApplyFormValues) => Promise<void> | void;
  onSuccess?: (data: ApplyFormValues) => void;
  onError?: (errorMessage: string) => void;
}
