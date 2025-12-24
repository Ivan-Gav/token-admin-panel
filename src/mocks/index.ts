import type { TokenLogItem } from "../types";

// export const mockTokens: Token[] = [
//   {
//     id: "token_001",
//     isActive: true,
//     createdAt: "2024-01-15T10:30:00Z",
//     activeBefore: "2024-12-31T23:59:59Z",
//     comment: "Initial development token",
//     owner: "alice@example.com",
//     points: 100,
//     hasPrivateAccess: true,
//   },
//   {
//     id: "token_002",
//     isActive: false,
//     createdAt: "2023-11-22T14:45:00Z",
//     activeBefore: "2024-01-01T00:00:00Z",
//     comment: "Expired testing token",
//     owner: "bob@example.com",
//     points: 50,
//     hasPrivateAccess: false,
//   },
//   {
//     id: "token_003",
//     isActive: true,
//     createdAt: "2024-02-10T09:15:00Z",
//     activeBefore: "2024-06-30T23:59:59Z",
//     comment: "Temporary API access",
//     points: 25,
//     hasPrivateAccess: true,
//   },
//   {
//     id: "token_004",
//     isActive: true,
//     createdAt: "2024-03-05T16:20:00Z",
//     activeBefore: "2024-12-31T23:59:59Z",
//     owner: "charlie@example.com",
//     points: 200,
//     hasPrivateAccess: true,
//   },
//   {
//     id: "token_005",
//     isActive: false,
//     createdAt: "2023-12-18T11:10:00Z",
//     comment: "Deactivated for security",
//     owner: "diana@example.com",
//     hasPrivateAccess: false,
//   },
//   {
//     id: "token_006",
//     isActive: true,
//     createdAt: "2024-01-30T13:45:00Z",
//     activeBefore: "2024-08-15T23:59:59Z",
//     points: 75,
//     hasPrivateAccess: true,
//   },
//   {
//     id: "token_007",
//     isActive: true,
//     createdAt: "2024-03-15T08:30:00Z",
//     comment: "Production monitoring",
//     owner: "evan@example.com",
//     points: 150,
//     hasPrivateAccess: true,
//   },
//   {
//     id: "token_008",
//     isActive: false,
//     createdAt: "2024-02-28T17:55:00Z",
//     activeBefore: "2024-03-01T00:00:00Z",
//     comment: "Short-lived demo token",
//     hasPrivateAccess: false,
//   },
//   {
//     id: "token_009",
//     isActive: true,
//     createdAt: "2024-01-10T12:00:00Z",
//     activeBefore: "2024-09-30T23:59:59Z",
//     owner: "fiona@example.com",
//     points: 300,
//     hasPrivateAccess: true,
//   },
//   {
//     id: "token_010",
//     isActive: false,
//     createdAt: "2023-10-05T09:40:00Z",
//     owner: "george@example.com",
//     hasPrivateAccess: false,
//   },
//   {
//     id: "token_011",
//     isActive: true,
//     createdAt: "2024-03-20T10:15:00Z",
//     activeBefore: "2024-11-15T23:59:59Z",
//     comment: "Backup service token",
//     points: 125,
//     hasPrivateAccess: true,
//   },
//   {
//     id: "token_012",
//     isActive: true,
//     createdAt: "2024-02-14T15:30:00Z",
//     activeBefore: "2024-07-31T23:59:59Z",
//     owner: "hannah@example.com",
//     points: 80,
//     hasPrivateAccess: false,
//   },
//   {
//     id: "token_013",
//     isActive: false,
//     createdAt: "2024-01-05T14:20:00Z",
//     activeBefore: "2024-02-01T00:00:00Z",
//     comment: "Trial period ended",
//     points: 10,
//     hasPrivateAccess: false,
//   },
//   {
//     id: "token_014",
//     isActive: true,
//     createdAt: "2024-03-25T11:45:00Z",
//     activeBefore: "2024-10-10T23:59:59Z",
//     owner: "ian@example.com",
//     points: 250,
//     hasPrivateAccess: true,
//   },
//   {
//     id: "token_015",
//     isActive: true,
//     createdAt: "2024-02-01T09:00:00Z",
//     comment: "Long-term integration",
//     owner: "julia@example.com",
//     points: 500,
//     hasPrivateAccess: true,
//   },
// ];

export const mockTokenLogs: TokenLogItem[] = [
  {
    endpoint_path: "/api/v1/tokens/validate",
    id: "100a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf31",
    price: 1575,
    success: true,
    timestamp: "2024-01-15T08:30:45.123Z",
    token_id:
      "100a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf31",
    trace_id:
      "100a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf31",
  },
  {
    endpoint_path: "/api/v1/tokens/generate",
    id: "200a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf32",
    price: 0,
    success: true,
    timestamp: "2024-01-15T09:15:22.456Z",
    token_id:
      "200a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf32",
    trace_id:
      "200a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf32",
  },
  {
    endpoint_path: "/api/v1/tokens/revoke",
    id: "300a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf33",
    price: 550,
    success: false,
    timestamp: "2024-01-15T10:45:33.789Z",
    token_id:
      "300a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf33",
    trace_id:
      "300a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf33",
  },
  {
    endpoint_path: "/api/v1/tokens/validate",
    id: "400a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf34",
    price: 1225,
    success: true,
    timestamp: "2024-01-15T11:20:15.234Z",
    token_id:
      "400a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf34",
    trace_id:
      "400a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf34",
  },
  {
    endpoint_path: "/api/v1/tokens/refresh",
    id: "500a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf35",
    price: 325,
    success: true,
    timestamp: "2024-01-15T13:10:55.567Z",
    token_id:
      "500a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf35",
    trace_id:
      "500a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf35",
  },
  {
    endpoint_path: "/api/v1/tokens/validate",
    id: "600a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf36",
    price: 1899,
    success: false,
    timestamp: "2024-01-15T14:35:44.890Z",
    token_id:
      "600a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf36",
    trace_id:
      "600a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf36",
  },
  {
    endpoint_path: "/api/v1/tokens/create",
    id: "700a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf37",
    price: 0,
    success: true,
    timestamp: "2024-01-15T16:05:12.111Z",
    token_id:
      "700a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf37",
    trace_id:
      "700a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf37",
  },
  {
    endpoint_path: "/api/v1/tokens/validate",
    id: "800a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf38",
    price: 2250,
    success: true,
    timestamp: "2024-01-15T17:40:33.222Z",
    token_id:
      "800a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf38",
    trace_id:
      "800a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf38",
  },
  {
    endpoint_path: "/api/v1/tokens/revoke",
    id: "900a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf39",
    price: 780,
    success: true,
    timestamp: "2024-01-15T19:15:55.333Z",
    token_id:
      "900a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf39",
    trace_id:
      "900a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf39",
  },
  {
    endpoint_path: "/api/v1/tokens/validate",
    id: "a00a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf3a",
    price: 999,
    success: false,
    timestamp: "2024-01-15T20:50:17.444Z",
    token_id:
      "a00a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf3a",
    trace_id:
      "a00a9d59cb7a412c217b56c117128a26bc3b524b78850946f9bf49c88d3fbf3a",
  },
];
