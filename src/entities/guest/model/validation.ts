interface PropertyFormValue {
  key: string;
  value: string;
}

export const validateConferenceId = (value: string, t: (key: string) => string) => {
  if (!value || value.trim().length === 0) {
    return t('adminGuests.form.validation.conferenceRequired');
  }
  const conferenceIdNum = parseInt(value);
  if (isNaN(conferenceIdNum) || conferenceIdNum <= 0) {
    return t('adminGuests.form.validation.invalidConference');
  }
  return null;
};

export const validatePropertyKey = (
  value: string,
  properties: PropertyFormValue[],
  index: number,
  t: (key: string) => string
) => {
  if (!value || value.trim().length === 0) {
    if (
      index === properties.length - 1 &&
      (!properties[index]?.value || properties[index].value.trim().length === 0)
    ) {
      return null;
    }
    return t('adminGuests.form.validation.propertyKeyRequired');
  }

  const duplicateIndex = properties.findIndex(
    (prop, i) => i !== index && prop.key.trim().toLowerCase() === value.trim().toLowerCase()
  );
  if (duplicateIndex !== -1) {
    return t('adminGuests.form.validation.propertyKeyUnique');
  }

  return null;
};

export const validatePropertyValue = (
  value: string,
  keyValue: string,
  t: (key: string) => string
) => {
  if (keyValue && keyValue.trim().length > 0 && (!value || value.trim().length === 0)) {
    return t('adminGuests.form.validation.propertyValueRequired');
  }
  return null;
};

export const isFormValid = (formIsValid: boolean, properties: PropertyFormValue[]): boolean => {
  return formIsValid && !(properties.length === 1 && !properties[0].key && !properties[0].value);
};
