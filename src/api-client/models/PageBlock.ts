/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PageBlockType } from './PageBlockType';

export type PageBlock = {
    id: number;
    richText: string;
    mapUrl: string;
    type: PageBlockType;
    order: number;
    settings?: any;
    conferenceId: number;
}