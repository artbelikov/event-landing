/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRole } from './UserRole';

export type User = {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    googleId?: string;
    googleEmail?: string;
    googleAvatar?: string;
}