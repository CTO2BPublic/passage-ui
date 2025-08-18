export type AccessRole = {
  annotations: {
    'dashboard.passage.io/dataType': 'sum' | 'avg' | 'count';
    'dashboard.passage.io/enabled': 'true' | 'false';
    'dashboard.passage.io/icon': string;
    'dashboard.passage.io/widgetType': 'statCard' | 'chart' | 'table';
  };
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

export enum Provider {
  AWS = 'aws',
  AZURE = 'azure',
  GITLAB = 'gitlab',
  GOOGLE = 'google',
  TELEPORT = 'teleport',
}

export type User = {
  id: string;
  username: string;
  settings: {
    providerUsernames: {
      [key in Provider]: string;
    };
  };
};

export type UsersRoleMapping = {
  id: string;
  username: string;
  roles?: string[];
};

export type ActivityLog = {
  id: string;
  date: string;
  severity: string;
  raisedBy: string;
  approvedBy: string;
  type: string;
  role: string;
  message: string;
  requestId: string;
  eventId: string;
};

export type Event = {
  id: string;
  createdAt: string;
};
