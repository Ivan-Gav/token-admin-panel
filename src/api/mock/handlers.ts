import {
  http,
  delay,
  HttpResponse,
  type StrictRequest,
  type DefaultBodyType,
} from "msw";
import type {
  Response,
  Token,
  TokenCreateData,
  TokenCreateResponseData,
  TokenListResponse,
  TokenLogItem,
  TokenLogRequest,
} from "@/types";
import { initialTokensArray, logStorage } from "./data";

import { api } from "../endpoints";

const AUTH_HEADER_NAME = import.meta.env.VITE_AUTH_HEADER_NAME || "";
const DEMO_API_KEY = import.meta.env.VITE_DEMO_API_KEY;

const tokensArray = [...initialTokensArray];

const AUTHORIZED_KEYS = [DEMO_API_KEY];

// --------------------------------------------------------------

const isValidUUID = (uuid: string) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
};

// --------------------------------------------------------------

const isAuthorized = (apiKey?: string | null) =>
  apiKey ? AUTHORIZED_KEYS.includes(apiKey) : false;

// --------------------------------------------------------------

const checkAuth = (request: StrictRequest<DefaultBodyType>) => {
  const key = request.headers.get(AUTH_HEADER_NAME);

  if (!isAuthorized(key)) {
    throw HttpResponse.json<Response>(
      { success: false, message: "Wrong API key", data: null },
      { status: 401 }
    );
  }
};

// --------------------------------------------------------------

const checkTokenId = (data: unknown) => {
  const isValidTokenId = (token_id: unknown) =>
    !token_id ? false : typeof token_id === "string" && isValidUUID(token_id);

  if (
    !data ||
    !(typeof data === "object") ||
    !("token_id" in data) ||
    !isValidTokenId(data.token_id)
  ) {
    throw HttpResponse.json<Response>(
      { success: false, message: "Bad request", data: null },
      { status: 400 }
    );
  }
};

// --------------------------------------------------------------

const checkTokenIndex = (index: number) => {
  if (index === -1) {
    throw HttpResponse.json<Response>(
      { success: false, message: "Token not found", data: null },
      { status: 404 }
    );
  }
};

// --------------------------------------------------------------

const log = ({
  token_id,
  endpoint_path,
  success,
}: {
  token_id: string;
  endpoint_path: string;
  success: boolean;
}) => {
  const logItem: TokenLogItem = {
    id: crypto.randomUUID(),
    token_id,
    trace_id: crypto.randomUUID(),
    price: 0,
    timestamp: new Date().toISOString(),
    endpoint_path,
    success,
  };

  if (logStorage[token_id]) {
    logStorage[token_id].unshift(logItem);
  } else if (tokensArray.find((token) => token.id === token_id)) {
    logStorage[token_id] = [logItem];
  }
};

// --------------------------------------------------------------

export const handlers = [
  http.get(api.getTokenList, async ({ request }) => {
    await delay(500);
    checkAuth(request);

    const url = new URL(request.url);

    const offset = url.searchParams.get("offset")
      ? parseInt(url.searchParams.get("offset")!)
      : null;
    const limit = url.searchParams.get("limit")
      ? parseInt(url.searchParams.get("limit")!)
      : null;

    if (offset === null || limit === null) {
      return HttpResponse.json<Response>(
        { success: false, message: "Bad request", data: null },
        { status: 400 }
      );
    }

    return HttpResponse.json<TokenListResponse>({
      success: true,
      data: {
        params: {
          offset,
          limit,
        },
        tokens: tokensArray.slice(offset, offset + limit),
      },
    });
  }),

  // --------------------------------------------------------------

  http.get(api.getToken, async ({ request }) => {
    await delay(500);
    checkAuth(request);

    const url = new URL(request.url);

    const token_id = url.searchParams.get("token_id");

    if (!token_id) {
      return HttpResponse.json<Response>(
        { success: false, message: "Bad request", data: null },
        { status: 400 }
      );
    }

    const token = tokensArray.find((token) => token.id === token_id);

    if (!token) {
      return HttpResponse.json<Response>(
        { success: false, message: "Token not found", data: null },
        { status: 404 }
      );
    }

    return HttpResponse.json<Response<Token>>({ success: true, data: token });
  }),

  // --------------------------------------------------------------

  http.post(api.createToken, async ({ request }) => {
    await delay(500);
    checkAuth(request);

    const data = (await request.json()) as TokenCreateData;

    if (!data) {
      return HttpResponse.json<Response>(
        { success: false, message: "Bad request", data: null },
        { status: 400 }
      );
    }

    try {
      const { active_before, points, owner, comment, has_private_access } =
        data;

      const isValidDate = !active_before
        ? true
        : new Date(active_before) > new Date();

      const isValidPoints = !points
        ? true
        : Number.isInteger(points) && points >= 0;

      const isValidOwner = !owner
        ? true
        : typeof owner === "string" && owner.length > 3;

      const isValidComment = !comment
        ? true
        : typeof comment === "string" && comment.length > 5;

      const isValidHasPrivateAccess = !has_private_access
        ? true
        : typeof has_private_access === "boolean";

      if (
        !isValidDate ||
        !isValidPoints ||
        !isValidOwner ||
        !isValidComment ||
        !isValidHasPrivateAccess
      ) {
        throw new Error();
      }
    } catch {
      return HttpResponse.json<Response>(
        { success: false, message: "Bad request", data: null },
        { status: 400 }
      );
    }

    const newToken: Token = {
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      active_before: data.active_before,
      comment: data.comment,
      has_private_access: data.has_private_access || false,
      is_active: true,
      owner: data.owner,
      points: data.points,
    };

    tokensArray.unshift(newToken);
    logStorage[newToken.id] = [];

    const responseData: TokenCreateResponseData = {
      params: newToken,
      token: newToken.id,
    };

    return HttpResponse.json<Response>(
      { success: true, data: responseData },
      { status: 201 }
    );
  }),

  // --------------------------------------------------------------

  http.post(api.fetchTokenLogs, async ({ request }) => {
    await delay(500);
    checkAuth(request);

    const data = (await request.json()) as TokenLogRequest;

    checkTokenId(data);

    const { token_id, last, period } = data;

    const index = tokensArray.findIndex((token) => token.id === token_id);

    checkTokenIndex(index);

    try {
      const isValidLast =
        !!last &&
        "limit" in last &&
        "skip" in last &&
        Number.isInteger(last.limit) &&
        last.limit >= 0 &&
        Number.isInteger(last.skip) &&
        last.skip >= 0;

      const isValidPeriod = !period
        ? true
        : new Date(period.end) > new Date(period.start);

      if (!isValidLast || !isValidPeriod) {
        throw new Error();
      }
    } catch {
      return HttpResponse.json<Response>(
        { success: false, message: "Bad request", data: null },
        { status: 400 }
      );
    }

    const logs = logStorage[token_id];

    if (!logs) {
      return HttpResponse.json<Response<TokenLogItem[]>>(
        { success: true, data: [] },
        { status: 200 }
      );
    }

    if (!period) {
      return HttpResponse.json<Response<TokenLogItem[]>>(
        { success: true, data: logs.slice(last.skip, last.skip + last.limit) },
        { status: 200 }
      );
    }

    const filteredLogs = logs.filter((item) => {
      const date = new Date(item.timestamp);
      const end = new Date(period.end);
      const start = new Date(period.start);

      return date >= start && date <= end;
    });

    return HttpResponse.json<Response<TokenLogItem[]>>(
      {
        success: true,
        data: filteredLogs.slice(last.skip, last.skip + last.limit),
      },
      { status: 200 }
    );
  }),

  // --------------------------------------------------------------

  http.put(api.activateToken, async ({ request }) => {
    await delay(500);
    checkAuth(request);

    const data = (await request.json()) as {
      token_id: string;
      active: boolean;
    };

    checkTokenId(data);

    const { token_id, active } = data;

    const index = tokensArray.findIndex((token) => token.id === token_id);

    checkTokenIndex(index);

    try {
      const isValidActive =
        active === undefined || active === null
          ? false
          : typeof active === "boolean";

      if (!isValidActive) {
        throw new Error();
      }
    } catch {
      log({ token_id, endpoint_path: api.activateToken, success: false });

      return HttpResponse.json<Response>(
        { success: false, message: "Bad request", data: null },
        { status: 400 }
      );
    }

    tokensArray[index].is_active = active;

    log({ token_id, endpoint_path: api.activateToken, success: true });

    return HttpResponse.json<Response>(
      { success: true, data: null },
      { status: 200 }
    );
  }),

  // --------------------------------------------------------------

  http.put(api.setTokenPoints, async ({ request }) => {
    await delay(500);
    checkAuth(request);

    const data = (await request.json()) as {
      token_id: string;
      points: number;
      mode: "add" | "set";
    };

    checkTokenId(data);

    const { token_id, points, mode } = data;

    const index = tokensArray.findIndex((token) => token.id === token_id);

    checkTokenIndex(index);

    try {
      const isValidPoints =
        points === undefined || points === null
          ? false
          : Number.isInteger(points) && points >= 0;

      const isValidMode = mode === "add" || mode === "set";

      if (!isValidPoints || !isValidMode) {
        throw new Error();
      }
    } catch {
      log({ token_id, endpoint_path: api.setTokenPoints, success: false });

      return HttpResponse.json<Response>(
        { success: false, message: "Bad request", data: null },
        { status: 400 }
      );
    }

    const token = tokensArray[index];

    if (mode === "set" || token.points === undefined || token.points === null) {
      token.points = points;
    } else {
      token.points += points;
    }

    log({ token_id, endpoint_path: api.setTokenPoints, success: true });

    return HttpResponse.json<Response>(
      { success: true, data: null },
      { status: 200 }
    );
  }),

  // --------------------------------------------------------------

  http.put(api.setTokenExpireDate, async ({ request }) => {
    await delay(500);
    checkAuth(request);

    const data = (await request.json()) as {
      token_id: string;
      timeout: string;
    };

    checkTokenId(data);

    const { token_id, timeout } = data;

    const index = tokensArray.findIndex((token) => token.id === token_id);

    checkTokenIndex(index);

    try {
      const isValidDate = !timeout ? true : new Date(timeout) > new Date();

      if (!isValidDate) {
        throw new Error();
      }
    } catch {
      log({ token_id, endpoint_path: api.setTokenExpireDate, success: false });

      return HttpResponse.json<Response>(
        { success: false, message: "Bad request", data: null },
        { status: 400 }
      );
    }

    tokensArray[index].active_before = timeout || undefined;

    log({ token_id, endpoint_path: api.setTokenExpireDate, success: true });

    return HttpResponse.json<Response>(
      { success: true, data: null },
      { status: 200 }
    );
  }),
];
