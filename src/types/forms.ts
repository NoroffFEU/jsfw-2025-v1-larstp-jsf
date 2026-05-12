export type ContactFormData = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export type ContactFormTouched = Partial<
  Record<keyof ContactFormData, boolean>
>;
