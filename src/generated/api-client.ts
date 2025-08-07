import { 
  User,
  Form,
  Conference,
  Image,
  Guest,
  GuestProperty,
  Host,
  Hosts,
  InputField,
  PageBlock,
  EventDate,
  CreateUserRequest, UpdateUserRequest,
  CreateFormRequest, UpdateFormRequest,
  CreateConferenceRequest, UpdateConferenceRequest,
  CreateImageRequest, UpdateImageRequest,
  CreateGuestRequest, UpdateGuestRequest,
  CreateGuestPropertyRequest, UpdateGuestPropertyRequest,
  CreateHostRequest, UpdateHostRequest,
  CreateHostsRequest, UpdateHostsRequest,
  CreateInputFieldRequest, UpdateInputFieldRequest,
  CreatePageBlockRequest, UpdatePageBlockRequest,
  CreateEventDateRequest, UpdateEventDateRequest,
  ApiResponse,
  PaginatedResponse,
  QueryParams
} from './types';

export class ApiClient {
  // Authentication methods
  async login(data: { email: string; password: string }): Promise<{ access_token: string; user: { id: number; email: string; role: string } }> {
    const response = await this.request<{ access_token: string; user: { id: number; email: string; role: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.request<User>('/auth/me');
    return response;
  }
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.token = token;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = undefined;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Handle headers from options
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else if (typeof options.headers === 'object') {
        Object.assign(headers, options.headers);
      }
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      (error as any).status = response.status;
      (error as any).statusCode = response.status;
      throw error;
    }

    return response.json();
  }

  // User API methods
  async getUsers(params?: QueryParams): Promise<PaginatedResponse<User>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<User>>(`/users${queryString}`);
    return response;
  }

  async getUserById(id: number): Promise<User> {
    const response = await this.request<User>(`/users/${id}`);
    return response;
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await this.request<User>(`/users`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateUser(id: number, data: UpdateUserRequest): Promise<User> {
    const response = await this.request<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteUser(id: number): Promise<void> {
    await this.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Form API methods
  async getForms(params?: QueryParams): Promise<PaginatedResponse<Form>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<Form>>(`/forms${queryString}`);
    return response;
  }

  async getFormById(id: number): Promise<Form> {
    const response = await this.request<Form>(`/forms/${id}`);
    return response;
  }

  async createForm(data: CreateFormRequest): Promise<Form> {
    const response = await this.request<Form>(`/forms`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateForm(id: number, data: UpdateFormRequest): Promise<Form> {
    const response = await this.request<Form>(`/forms/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteForm(id: number): Promise<void> {
    await this.request<void>(`/forms/${id}`, {
      method: 'DELETE',
    });
  }

  // Conference API methods
  async getConferences(params?: QueryParams): Promise<PaginatedResponse<Conference>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<Conference>>(`/conferences${queryString}`);
    return response;
  }

  async getConferenceById(id: number): Promise<Conference> {
    const response = await this.request<Conference>(`/conferences/${id}`);
    return response;
  }

  async createConference(data: CreateConferenceRequest): Promise<Conference> {
    const response = await this.request<Conference>(`/conferences`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateConference(id: number, data: UpdateConferenceRequest): Promise<Conference> {
    const response = await this.request<Conference>(`/conferences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteConference(id: number): Promise<void> {
    await this.request<void>(`/conferences/${id}`, {
      method: 'DELETE',
    });
  }

  // Image API methods
  async getImages(params?: QueryParams): Promise<PaginatedResponse<Image>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<Image>>(`/images${queryString}`);
    return response;
  }

  async getImageById(id: number): Promise<Image> {
    const response = await this.request<Image>(`/images/${id}`);
    return response;
  }

  async createImage(data: CreateImageRequest): Promise<Image> {
    const response = await this.request<Image>(`/images`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateImage(id: number, data: UpdateImageRequest): Promise<Image> {
    const response = await this.request<Image>(`/images/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteImage(id: number): Promise<void> {
    await this.request<void>(`/images/${id}`, {
      method: 'DELETE',
    });
  }

  // Guest API methods
  async getGuests(params?: QueryParams): Promise<PaginatedResponse<Guest>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<Guest>>(`/guests${queryString}`);
    return response;
  }

  async getGuestById(id: number): Promise<Guest> {
    const response = await this.request<Guest>(`/guests/${id}`);
    return response;
  }

  async createGuest(data: CreateGuestRequest): Promise<Guest> {
    const response = await this.request<Guest>(`/guests`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateGuest(id: number, data: UpdateGuestRequest): Promise<Guest> {
    const response = await this.request<Guest>(`/guests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteGuest(id: number): Promise<void> {
    await this.request<void>(`/guests/${id}`, {
      method: 'DELETE',
    });
  }

  // GuestProperty API methods
  async getGuestpropertys(params?: QueryParams): Promise<PaginatedResponse<GuestProperty>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<GuestProperty>>(`/guestpropertys${queryString}`);
    return response;
  }

  async getGuestPropertyById(id: number): Promise<GuestProperty> {
    const response = await this.request<GuestProperty>(`/guestpropertys/${id}`);
    return response;
  }

  async createGuestProperty(data: CreateGuestPropertyRequest): Promise<GuestProperty> {
    const response = await this.request<GuestProperty>(`/guestpropertys`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateGuestProperty(id: number, data: UpdateGuestPropertyRequest): Promise<GuestProperty> {
    const response = await this.request<GuestProperty>(`/guestpropertys/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteGuestProperty(id: number): Promise<void> {
    await this.request<void>(`/guestpropertys/${id}`, {
      method: 'DELETE',
    });
  }

  // Host API methods
  async getHosts(params?: QueryParams): Promise<PaginatedResponse<Host>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<Host>>(`/hosts${queryString}`);
    return response;
  }

  async getHostById(id: number): Promise<Host> {
    const response = await this.request<Host>(`/hosts/${id}`);
    return response;
  }

  async createHost(data: CreateHostRequest): Promise<Host> {
    const response = await this.request<Host>(`/hosts`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateHost(id: number, data: UpdateHostRequest): Promise<Host> {
    const response = await this.request<Host>(`/hosts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteHost(id: number): Promise<void> {
    await this.request<void>(`/hosts/${id}`, {
      method: 'DELETE',
    });
  }

  // Hosts API methods
  async getHostss(params?: QueryParams): Promise<PaginatedResponse<Hosts>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<Hosts>>(`/hostss${queryString}`);
    return response;
  }

  async getHostsById(id: number): Promise<Hosts> {
    const response = await this.request<Hosts>(`/hostss/${id}`);
    return response;
  }

  async createHosts(data: CreateHostsRequest): Promise<Hosts> {
    const response = await this.request<Hosts>(`/hostss`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateHosts(id: number, data: UpdateHostsRequest): Promise<Hosts> {
    const response = await this.request<Hosts>(`/hostss/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteHosts(id: number): Promise<void> {
    await this.request<void>(`/hostss/${id}`, {
      method: 'DELETE',
    });
  }

  // InputField API methods
  async getInputfields(params?: QueryParams): Promise<PaginatedResponse<InputField>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<InputField>>(`/inputfields${queryString}`);
    return response;
  }

  async getInputFieldById(id: number): Promise<InputField> {
    const response = await this.request<InputField>(`/inputfields/${id}`);
    return response;
  }

  async createInputField(data: CreateInputFieldRequest): Promise<InputField> {
    const response = await this.request<InputField>(`/inputfields`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateInputField(id: number, data: UpdateInputFieldRequest): Promise<InputField> {
    const response = await this.request<InputField>(`/inputfields/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteInputField(id: number): Promise<void> {
    await this.request<void>(`/inputfields/${id}`, {
      method: 'DELETE',
    });
  }

  // PageBlock API methods
  async getPageblocks(params?: QueryParams): Promise<PaginatedResponse<PageBlock>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<PageBlock>>(`/pageblocks${queryString}`);
    return response;
  }

  async getPageBlockById(id: number): Promise<PageBlock> {
    const response = await this.request<PageBlock>(`/pageblocks/${id}`);
    return response;
  }

  async createPageBlock(data: CreatePageBlockRequest): Promise<PageBlock> {
    const response = await this.request<PageBlock>(`/pageblocks`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updatePageBlock(id: number, data: UpdatePageBlockRequest): Promise<PageBlock> {
    const response = await this.request<PageBlock>(`/pageblocks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deletePageBlock(id: number): Promise<void> {
    await this.request<void>(`/pageblocks/${id}`, {
      method: 'DELETE',
    });
  }

  // EventDate API methods
  async getEventdates(params?: QueryParams): Promise<PaginatedResponse<EventDate>> {
    const queryString = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '';
    const response = await this.request<PaginatedResponse<EventDate>>(`/eventdates${queryString}`);
    return response;
  }

  async getEventDateById(id: number): Promise<EventDate> {
    const response = await this.request<EventDate>(`/eventdates/${id}`);
    return response;
  }

  async createEventDate(data: CreateEventDateRequest): Promise<EventDate> {
    const response = await this.request<EventDate>(`/eventdates`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response;
  }

  async updateEventDate(id: number, data: UpdateEventDateRequest): Promise<EventDate> {
    const response = await this.request<EventDate>(`/eventdates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response;
  }

  async deleteEventDate(id: number): Promise<void> {
    await this.request<void>(`/eventdates/${id}`, {
      method: 'DELETE',
    });
  }
}