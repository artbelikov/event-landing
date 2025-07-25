/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GuestPropertyDto } from './GuestPropertyDto';

export type CreateGuestDto = {
    conferenceId: number;
    properties: Array<GuestPropertyDto>;
}