import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './index';
import { 
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
  QueryParams
} from './types';

// User hooks
export const useUsers = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => apiClient.getUsers(params),
  });
};

export const useUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => apiClient.getUserById(id),
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateUserRequest) => apiClient.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserRequest }) => 
      apiClient.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Form hooks
export const useForms = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['forms', params],
    queryFn: () => apiClient.getForms(params),
  });
};

export const useForm = (id: number) => {
  return useQuery({
    queryKey: ['form', id],
    queryFn: () => apiClient.getFormById(id),
    enabled: !!id,
  });
};

export const useCreateForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateFormRequest) => apiClient.createForm(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });
};

export const useUpdateForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFormRequest }) => 
      apiClient.updateForm(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['form', id] });
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });
};

export const useDeleteForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteForm(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });
};

// Conference hooks
export const useConferences = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['conferences', params],
    queryFn: () => apiClient.getConferences(params),
  });
};

export const useConference = (id: number) => {
  return useQuery({
    queryKey: ['conference', id],
    queryFn: () => apiClient.getConferenceById(id),
    enabled: !!id,
  });
};

export const useCreateConference = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateConferenceRequest) => apiClient.createConference(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conferences'] });
    },
  });
};

export const useUpdateConference = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateConferenceRequest }) => 
      apiClient.updateConference(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['conference', id] });
      queryClient.invalidateQueries({ queryKey: ['conferences'] });
    },
  });
};

export const useDeleteConference = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteConference(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conferences'] });
    },
  });
};

// Image hooks
export const useImages = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['images', params],
    queryFn: () => apiClient.getImages(params),
  });
};

export const useImage = (id: number) => {
  return useQuery({
    queryKey: ['image', id],
    queryFn: () => apiClient.getImageById(id),
    enabled: !!id,
  });
};

export const useCreateImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateImageRequest) => apiClient.createImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};

export const useUpdateImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateImageRequest }) => 
      apiClient.updateImage(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['image', id] });
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });
};

// Guest hooks
export const useGuests = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['guests', params],
    queryFn: () => apiClient.getGuests(params),
  });
};

export const useGuest = (id: number) => {
  return useQuery({
    queryKey: ['guest', id],
    queryFn: () => apiClient.getGuestById(id),
    enabled: !!id,
  });
};

export const useCreateGuest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateGuestRequest) => apiClient.createGuest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
    },
  });
};

export const useUpdateGuest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateGuestRequest }) => 
      apiClient.updateGuest(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['guest', id] });
      queryClient.invalidateQueries({ queryKey: ['guests'] });
    },
  });
};

export const useDeleteGuest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteGuest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
    },
  });
};

// GuestProperty hooks
export const useGuestpropertys = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['guestpropertys', params],
    queryFn: () => apiClient.getGuestpropertys(params),
  });
};

export const useGuestProperty = (id: number) => {
  return useQuery({
    queryKey: ['guestproperty', id],
    queryFn: () => apiClient.getGuestPropertyById(id),
    enabled: !!id,
  });
};

export const useCreateGuestProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateGuestPropertyRequest) => apiClient.createGuestProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestpropertys'] });
    },
  });
};

export const useUpdateGuestProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateGuestPropertyRequest }) => 
      apiClient.updateGuestProperty(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['guestproperty', id] });
      queryClient.invalidateQueries({ queryKey: ['guestpropertys'] });
    },
  });
};

export const useDeleteGuestProperty = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteGuestProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestpropertys'] });
    },
  });
};

// Host hooks
export const useHosts = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['hosts', params],
    queryFn: () => apiClient.getHosts(params),
  });
};

export const useHost = (id: number) => {
  return useQuery({
    queryKey: ['host', id],
    queryFn: () => apiClient.getHostById(id),
    enabled: !!id,
  });
};

export const useCreateHost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateHostRequest) => apiClient.createHost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hosts'] });
    },
  });
};

export const useUpdateHost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateHostRequest }) => 
      apiClient.updateHost(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['host', id] });
      queryClient.invalidateQueries({ queryKey: ['hosts'] });
    },
  });
};

export const useDeleteHost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteHost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hosts'] });
    },
  });
};

// Hosts hooks
export const useHostsList = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['hostss', params],
    queryFn: () => apiClient.getHostss(params),
  });
};

export const useHostsById = (id: number) => {
  return useQuery({
    queryKey: ['hosts', id],
    queryFn: () => apiClient.getHostsById(id),
    enabled: !!id,
  });
};

export const useCreateHosts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateHostsRequest) => apiClient.createHosts(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hostss'] });
    },
  });
};

export const useUpdateHosts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateHostsRequest }) => 
      apiClient.updateHosts(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['hosts', id] });
      queryClient.invalidateQueries({ queryKey: ['hostss'] });
    },
  });
};

export const useDeleteHosts = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteHosts(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hostss'] });
    },
  });
};

// InputField hooks
export const useInputfields = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['inputfields', params],
    queryFn: () => apiClient.getInputfields(params),
  });
};

export const useInputField = (id: number) => {
  return useQuery({
    queryKey: ['inputfield', id],
    queryFn: () => apiClient.getInputFieldById(id),
    enabled: !!id,
  });
};

export const useCreateInputField = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateInputFieldRequest) => apiClient.createInputField(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inputfields'] });
    },
  });
};

export const useUpdateInputField = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateInputFieldRequest }) => 
      apiClient.updateInputField(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['inputfield', id] });
      queryClient.invalidateQueries({ queryKey: ['inputfields'] });
    },
  });
};

export const useDeleteInputField = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteInputField(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inputfields'] });
    },
  });
};

// PageBlock hooks
export const usePageblocks = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['pageblocks', params],
    queryFn: () => apiClient.getPageblocks(params),
  });
};

export const usePageBlock = (id: number) => {
  return useQuery({
    queryKey: ['pageblock', id],
    queryFn: () => apiClient.getPageBlockById(id),
    enabled: !!id,
  });
};

export const useCreatePageBlock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePageBlockRequest) => apiClient.createPageBlock(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pageblocks'] });
    },
  });
};

export const useUpdatePageBlock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePageBlockRequest }) => 
      apiClient.updatePageBlock(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['pageblock', id] });
      queryClient.invalidateQueries({ queryKey: ['pageblocks'] });
    },
  });
};

export const useDeletePageBlock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deletePageBlock(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pageblocks'] });
    },
  });
};

// EventDate hooks
export const useEventdates = (params?: QueryParams) => {
  return useQuery({
    queryKey: ['eventdates', params],
    queryFn: () => apiClient.getEventdates(params),
  });
};

export const useEventDate = (id: number) => {
  return useQuery({
    queryKey: ['eventdate', id],
    queryFn: () => apiClient.getEventDateById(id),
    enabled: !!id,
  });
};

export const useCreateEventDate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateEventDateRequest) => apiClient.createEventDate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventdates'] });
    },
  });
};

export const useUpdateEventDate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEventDateRequest }) => 
      apiClient.updateEventDate(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['eventdate', id] });
      queryClient.invalidateQueries({ queryKey: ['eventdates'] });
    },
  });
};

export const useDeleteEventDate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deleteEventDate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventdates'] });
    },
  });
};
// Authentication hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => apiClient.login(data),
    onSuccess: (data) => {
      // Store the token in localStorage
      localStorage.setItem('access_token', data.access_token);
      // Set the token on the API client
      apiClient.setToken(data.access_token);
      // Invalidate current user query to refetch with new token
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
};

// Current user hook for authentication
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiClient.getCurrentUser(),
    enabled: !!localStorage.getItem('access_token'),
    retry: false,
  });
};