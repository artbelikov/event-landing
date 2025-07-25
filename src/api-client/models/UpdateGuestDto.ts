/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GuestPropertyDto } from './GuestPropertyDto';

export type UpdateGuestDto = {
    conferenceId?: number;
    properties?: Array<GuestPropertyDto>;
}