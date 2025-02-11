import { AccessRequestStatus, ProviderStatus } from 'src/types';

export const searchInData = <T>(data: T, query: string): boolean => {
  if (typeof data === 'string') {
    return data.toLowerCase().includes(query.toLowerCase());
  }

  if (Array.isArray(data)) {
    return data.some((item) => searchInData(item, query));
  }

  if (data && typeof data === 'object') {
    return Object.values(data).some((value) => searchInData(value, query));
  }

  return false;
};

export const getAccessRequestStatusColor = (status: AccessRequestStatus) => {
  switch (status) {
    case AccessRequestStatus.PENDING:
      return 'warning';
    case AccessRequestStatus.APPROVED:
      return 'success';
    case AccessRequestStatus.DENIED:
      return 'error';
    case AccessRequestStatus.EXPIRED:
      return 'secondary';
    default:
      return 'info';
  }
};

export const getProviderStatusColor = (status: ProviderStatus) => {
  switch (status) {
    case ProviderStatus.GRANTED:
      return 'success';
    case ProviderStatus.REVOKED:
      return 'secondary';
    case ProviderStatus.ERROR:
      return 'error';
    default:
      return 'info';
  }
};
