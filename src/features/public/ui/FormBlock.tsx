import { Text } from '@mantine/core';
import type { Conference } from '@/generated/types';
import { RegistrationForm } from './RegistrationForm';

interface FormField {
  id: number;
  type: 'text' | 'email' | 'phone' | 'address' | 'radio' | 'checkbox' | 'select' | 'multiselect' | 'textarea' | 'number';
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  order: number;
}

interface FormBlockProps {
  conference: Conference;
}

/**
 * Renders registration form for the conference
 */
export function FormBlock({ conference }: FormBlockProps) {
  if (!conference.form) {
    return <Text c="dimmed">No registration form configured for this event</Text>;
  }

  // Extract form fields from conference.form configuration
  const formFields: FormField[] = [
    {
      id: 1,
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: conference.form.required.includes('fullName'),
      order: 1,
    },
    {
      id: 2,
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email address',
      required: conference.form.required.includes('email'),
      order: 2,
    },
    {
      id: 3,
      type: 'phone',
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      required: conference.form.required.includes('phoneNumber'),
      order: 3,
    },
    {
      id: 4,
      type: 'text',
      label: 'City',
      placeholder: 'Enter your city',
      required: conference.form.required.includes('city'),
      order: 4,
    },
    {
      id: 5,
      type: 'select',
      label: 'Attendance Type',
      placeholder: 'Select attendance type',
      required: conference.form.required.includes('attendanceType'),
      options: ['ONLINE', 'OFFLINE'],
      order: 5,
    },
    {
      id: 6,
      type: 'text',
      label: 'Occupation',
      placeholder: 'Enter your occupation',
      required: conference.form.required.includes('occupation'),
      order: 6,
    },
  ];

  return (
    <RegistrationForm
      conferenceId={conference.id}
      fields={formFields}
      onSuccess={() => {
        // Could add success callback here
      }}
    />
  );
} 