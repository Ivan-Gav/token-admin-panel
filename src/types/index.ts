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
  token: string;
};

export type TokenCreateData = Omit<Token, "id" | "is_active" | "created_at">;

export type TokenCreateDataForm = {
  has_points: boolean;
  has_active_before: boolean;
} & TokenCreateData;

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

export type TokenLogRequest = {
  last: {
    limit: number;
    skip: number;
  };
  period?: {
    start: string;
    end: string;
  };
  token_id: string;
};
