import {
  ConferenceCreateModal,
  ConferenceDetailsModal,
  GuestCreateModal,
  GuestDetailsModal,
  PageBlockEditorModal,
} from '@/features/admin';
import { MODAL_KEYS } from '@/shared/constants';

export const modals = {
  [MODAL_KEYS.CONFERENCE_DETAILS]: ConferenceDetailsModal,
  [MODAL_KEYS.CONFERENCE_CREATE]: ConferenceCreateModal,
  [MODAL_KEYS.GUEST_DETAILS]: GuestDetailsModal,
  [MODAL_KEYS.GUEST_CREATE]: GuestCreateModal,
  [MODAL_KEYS.PAGE_BLOCK_EDITOR]: PageBlockEditorModal,
};
