export const baseURL =
  window.location.hostname === 'localhost'
    ? 'https://api.passage.shared.prod.cto2b.eu'
    : `${window.location.origin}/api`;

const endpoints = {
  user: '/user/profile',
  userSettings: '/user/profile/settings',
  accessRoles: '/access/roles',
  accessRequests: '/access/requests',
  accessRequest: (id: string) => `/access/requests/${id}`,
  accessRequestApprove: (id: string) => `/access/requests/${id}/approve`,
  accessRequestExpire: (id: string) => `/access/requests/${id}/expire`,
};

export default endpoints;
