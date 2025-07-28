/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EventDateType } from './EventDateType';

export type EventDateDto = {
    type: EventDateType;
    date?: string;
    from?: string;
    to?: string;
}