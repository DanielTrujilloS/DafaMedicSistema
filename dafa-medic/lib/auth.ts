import "server-only";
import { SignJWT, jwtVerify } from "jose";

type SessionPayload = {
  sub: string; // userId
  email: string;
  role: "ADMIN" | "USER";
};

const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);

export async function signSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as SessionPayload;
}
