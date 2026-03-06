import { headers } from "next/headers";
import { NextResponse } from "next/server";

type IpCandidate = {
  value: string;
  source: string;
};

const isLikelyIpv6 = (ip: string) => ip.includes(":");

const normalizeIp = (raw: string) => {
  const value = raw.trim();

  if (value.startsWith("[") && value.includes("]")) {
    return value.slice(1, value.indexOf("]"));
  }

  // Strip port from IPv4 addresses like "203.0.113.10:1234"
  if (/^\d{1,3}(?:\.\d{1,3}){3}:\d{1,5}$/.test(value)) {
    return value.split(":")[0];
  }

  return value;
};

const getHeaderCandidates = (value: string | null, source: string) => {
  if (!value) return [] as IpCandidate[];

  return value
    .split(",")
    .map((entry) => normalizeIp(entry))
    .filter(Boolean)
    .map((entry) => ({ value: entry, source }));
};

export async function GET() {
  const requestHeaders = await headers();

  const headerPriority = [
    "cf-connecting-ip",
    "x-forwarded-for",
    "x-real-ip",
    "true-client-ip",
    "x-client-ip",
    "fastly-client-ip",
  ];

  const candidates = headerPriority.flatMap((name) =>
    getHeaderCandidates(requestHeaders.get(name), name),
  );

  const preferred =
    candidates.find((candidate) => isLikelyIpv6(candidate.value)) ||
    candidates[0];

  const ipAddress = preferred?.value || "not available";
  const ipVersion =
    ipAddress === "not available"
      ? "unknown"
      : isLikelyIpv6(ipAddress)
        ? "IPv6"
        : "IPv4";

  return NextResponse.json({
    submissionIp: ipAddress,
    submissionIpVersion: ipVersion,
    submissionIpWithType: `${ipAddress} (${ipVersion})`,
    submissionIpSourceHeader: preferred?.source || "none",
    userAgent: requestHeaders.get("user-agent") || "not available",
    acceptLanguage: requestHeaders.get("accept-language") || "not available",
    uaPlatform: requestHeaders.get("sec-ch-ua-platform") || "not available",
    uaClientHints: requestHeaders.get("sec-ch-ua") || "not available",
    uaMobile: requestHeaders.get("sec-ch-ua-mobile") || "not available",
    reviewedAtUtc: new Date().toISOString(),
    ipv6Preferred: ipVersion === "IPv6",
  });
}
