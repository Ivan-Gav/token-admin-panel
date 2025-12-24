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

export type TokenCreateResponseData = {
  params: Token;
  token: string; // <= token_id
};

export type TokenCreateData = {
  active_before?: string;
  comment?: string;
  has_private_access: boolean;
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

export type TokenLogItem = {
  endpoint_path: string;
  id: string;
  price: number;
  success: boolean;
  timestamp: string;
  token_id: string;
  trace_id: string;
};
