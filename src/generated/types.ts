// Auto-generated types from Prisma schema
// Generated on: 2025-08-05T14:20:40.121Z

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum ConferenceStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum AttendanceType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export enum EventDateType {
  SINGLE = 'SINGLE',
  PERIOD = 'PERIOD'
}

export enum PageBlockType {
  HERO = 'HERO',
  TEXT = 'TEXT',
  MAP = 'MAP',
  FORM = 'FORM',
  FOOTER = 'FOOTER',
  CREDITS = 'CREDITS',
  OWNERS = 'OWNERS',
  SPEAKERS = 'SPEAKERS',
  COUNTDOWN = 'COUNTDOWN',
  CUSTOM = 'CUSTOM'
}

export interface User {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  conferences: Conference[];
  images: Image[];
  createdAt: string;
  updatedAt: string;
  googleId?: string;
  googleEmail?: string;
  googleAvatar?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  googleEmail?: string;
  googleAvatar?: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number;
}

export interface Form {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  attendanceType: AttendanceType;
  occupation: string;
  createdAt: string;
  required: String[];
  Conference: Conference[];
}

export interface CreateFormRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  city: string;
  attendanceType: AttendanceType;
  occupation: string;
}

export interface UpdateFormRequest extends Partial<CreateFormRequest> {
  id: number;
}

export interface Conference {
  id: number;
  name: string;
  description: string;
  eventDates: EventDate[];
  place: string;
  customUrl?: string;
  form: Form;
  status: ConferenceStatus;
  images: Image[];
  guests: Guest[];
  ownerId: number;
  owner: User;
  createdAt: string;
  updatedAt: string;
  formId: number;
  pageBlocks: PageBlock[];
}

export interface CreateConferenceRequest {
  name: string;
  description: string;
  place: string;
  customUrl?: string;
}

export interface UpdateConferenceRequest extends Partial<CreateConferenceRequest> {
  id: number;
}

export interface Image {
  id: number;
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  metadata?: Record<string, any>;
  conferenceId: number;
  conference: Conference;
  uploaderId: number;
  uploader: User;
  createdAt: string;
}

export interface CreateImageRequest {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
  metadata?: Record<string, any>;
}

export interface UpdateImageRequest extends Partial<CreateImageRequest> {
  id: number;
}

export interface Guest {
  id: number;
  conferenceId: number;
  conference: Conference;
  properties: GuestProperty[];
  createdAt: string;
}

export interface CreateGuestRequest {
  // This interface is intentionally empty as all fields are auto-generated or relations
}

export interface UpdateGuestRequest extends Partial<CreateGuestRequest> {
  id: number;
}

export interface GuestProperty {
  id: number;
  guestId: number;
  guest: Guest;
  key: string;
  value: string;
}

export interface CreateGuestPropertyRequest {
  key: string;
  value: string;
}

export interface UpdateGuestPropertyRequest extends Partial<CreateGuestPropertyRequest> {
  id: number;
}

export interface Host {
  id: number;
  label: string;
  Hosts?: Hosts;
  hostsId?: number;
}

export interface CreateHostRequest {
  label: string;
}

export interface UpdateHostRequest extends Partial<CreateHostRequest> {
  id: number;
}

export interface Hosts {
  id: number;
  list: Host[];
}

export interface CreateHostsRequest {
  // This interface is intentionally empty as all fields are auto-generated or relations
}

export interface UpdateHostsRequest extends Partial<CreateHostsRequest> {
  id: number;
}

export interface InputField {
  id: number;
  type: string;
  label: string;
  placeholder: string;
  heightScale: number;
  value: string;
  radioOptions: String[];
  PageBlock?: PageBlock;
  pageBlockId?: number;
}

export interface CreateInputFieldRequest {
  type: string;
  label: string;
  placeholder: string;
  heightScale: number;
  value: string;
}

export interface UpdateInputFieldRequest extends Partial<CreateInputFieldRequest> {
  id: number;
}

export interface PageBlock {
  id: number;
  richText: string;
  mapUrl: string;
  type: PageBlockType;
  order: number;
  settings?: Record<string, any>;
  form: InputField[];
  Conference: Conference;
  conferenceId: number;
}

export interface CreatePageBlockRequest {
  richText: string;
  mapUrl: string;
  type: PageBlockType;
  order: number;
  settings?: Record<string, any>;
}

export interface UpdatePageBlockRequest extends Partial<CreatePageBlockRequest> {
  id: number;
}

export interface EventDate {
  id: number;
  type: EventDateType;
  date?: string;
  from?: string;
  to?: string;
  conferenceId: number;
  conference: Conference;
}

export interface CreateEventDateRequest {
  date?: string;
  from?: string;
  to?: string;
}

export interface UpdateEventDateRequest extends Partial<CreateEventDateRequest> {
  id: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = 'ApiError';
  }
}

export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

// Add missing enums that the frontend expects
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export enum ConferenceSortField {
  NAME = 'name',
  DESCRIPTION = 'description',
  PLACE = 'place',
  STATUS = 'status',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt'
}

// API Endpoints interface
export interface ApiEndpoints {
  users: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<User>>;
    getById: (id: number) => Promise<User>;
    create: (data: CreateUserRequest) => Promise<User>;
    update: (data: UpdateUserRequest) => Promise<User>;
    delete: (id: number) => Promise<void>;
  };
  forms: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<Form>>;
    getById: (id: number) => Promise<Form>;
    create: (data: CreateFormRequest) => Promise<Form>;
    update: (data: UpdateFormRequest) => Promise<Form>;
    delete: (id: number) => Promise<void>;
  };
  conferences: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<Conference>>;
    getById: (id: number) => Promise<Conference>;
    create: (data: CreateConferenceRequest) => Promise<Conference>;
    update: (data: UpdateConferenceRequest) => Promise<Conference>;
    delete: (id: number) => Promise<void>;
  };
  images: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<Image>>;
    getById: (id: number) => Promise<Image>;
    create: (data: CreateImageRequest) => Promise<Image>;
    update: (data: UpdateImageRequest) => Promise<Image>;
    delete: (id: number) => Promise<void>;
  };
  guests: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<Guest>>;
    getById: (id: number) => Promise<Guest>;
    create: (data: CreateGuestRequest) => Promise<Guest>;
    update: (data: UpdateGuestRequest) => Promise<Guest>;
    delete: (id: number) => Promise<void>;
  };
  guestpropertys: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<GuestProperty>>;
    getById: (id: number) => Promise<GuestProperty>;
    create: (data: CreateGuestPropertyRequest) => Promise<GuestProperty>;
    update: (data: UpdateGuestPropertyRequest) => Promise<GuestProperty>;
    delete: (id: number) => Promise<void>;
  };
  hosts: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<Host>>;
    getById: (id: number) => Promise<Host>;
    create: (data: CreateHostRequest) => Promise<Host>;
    update: (data: UpdateHostRequest) => Promise<Host>;
    delete: (id: number) => Promise<void>;
  };
  hostss: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<Hosts>>;
    getById: (id: number) => Promise<Hosts>;
    create: (data: CreateHostsRequest) => Promise<Hosts>;
    update: (data: UpdateHostsRequest) => Promise<Hosts>;
    delete: (id: number) => Promise<void>;
  };
  inputfields: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<InputField>>;
    getById: (id: number) => Promise<InputField>;
    create: (data: CreateInputFieldRequest) => Promise<InputField>;
    update: (data: UpdateInputFieldRequest) => Promise<InputField>;
    delete: (id: number) => Promise<void>;
  };
  pageblocks: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<PageBlock>>;
    getById: (id: number) => Promise<PageBlock>;
    create: (data: CreatePageBlockRequest) => Promise<PageBlock>;
    update: (data: UpdatePageBlockRequest) => Promise<PageBlock>;
    delete: (id: number) => Promise<void>;
  };
  eventdates: {
    getAll: (params?: QueryParams) => Promise<PaginatedResponse<EventDate>>;
    getById: (id: number) => Promise<EventDate>;
    create: (data: CreateEventDateRequest) => Promise<EventDate>;
    update: (data: UpdateEventDateRequest) => Promise<EventDate>;
    delete: (id: number) => Promise<void>;
  };
}