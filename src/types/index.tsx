export type AccessRole = {
  name: string;
  description: string;
  tags: string[];
  providers: {
    name: string;
    provider: string;
    credentialRef: {
      name: string;
    };
    parameters: {
      group: string;
    };
  }[];
};

export enum AccessRequestStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  DENIED = 'Denied',
  EXPIRED = 'Expired',
}

export enum ProviderStatus {
  GRANTED = 'Granted',
  REVOKED = 'Revoked',
  ERROR = 'Error',
}

export type AccessRequest = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  trace: string;
  roleRef: {
    name: string;
  };
  details: {
    justification: string;
    attributes: unknown;
    ttl: string;
  };
  status: {
    status: AccessRequestStatus;
    approvalRule: {
      string: string;
      authorCanApprove: boolean;
      users: string[];
      groups: string[];
    };
    approvedBy: string;
    requestedBy: string;
    providerUsernames?: {
      db_users: string;
      gitlab: string;
      logins: string;
    };
    providerStatuses?: {
      [key in string]: {
        action: ProviderStatus;
        details: string;
        error?: string;
      };
    };
  };
};

export type User = {
  id: string;
  username: string;
  settings: { providerUsernames?: Record<string, string> };
};
