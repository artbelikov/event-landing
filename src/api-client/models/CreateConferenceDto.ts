/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConferenceStatus } from './ConferenceStatus';
import type { EventDateDto } from './EventDateDto';

export type CreateConferenceDto = {
    name: string;
    description: string;
    eventDates: Array<EventDateDto>;
    place: string;
    headliner: string;
    customUrl?: string;
    formId: number;
    status: ConferenceStatus;
    ownerId: number;
}