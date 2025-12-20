export type Response<T = unknown> = {
  data: T;
  message?: string;
  success: boolean;
};

export type Token = {
  active_before?: string;
  comment?: string;
  created_at: string;
  has_private_access?: boolean;
  id: string;
  is_active: boolean;
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
