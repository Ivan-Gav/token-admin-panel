type Response<T = unknown> = {
  data: T;
  message?: string;
  success: boolean;
};

export type Token = {
  activeBefore?: string;
  comment?: string;
  createdAt: string;
  hasPrivateAccess?: boolean;
  id: string;
  isActive: boolean;
  owner?: string;
  points?: number;
};

export type TokenListResponse = Response<{
  params: {
    limit: number;
    offset: number;
  };
  tokens: Token[];
}>;
