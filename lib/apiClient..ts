'use server'

import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { decryptToken } from "./crypto";
import { ApiValidationError } from "@/types/errorTypes";


export type BackendValidationErrors = Record<string, string[]>;

export const apiClient = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const cookieStore = await cookies();
  const encrypted = cookieStore.get("access_token")?.value;
  const token = encrypted ? decryptToken(encrypted) : null
  const locale = await getLocale();


  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      "Accept-Language": locale,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  // const method = options.method ?? "GET";
  // const isFormData = options.body instanceof FormData;
  // const hasBody = options.body !== undefined && method !== "GET";

  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
  //   ...options,
  //   headers: {
  //     "Accept-Language": locale,
  //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     ...(hasBody && !isFormData ? { "Content-Type": "application/json" } : {}),
  //     ...options.headers,
  //   },
  // });

  if (res.status === 401) {
    throw new Error("Unauthorized");
  }

  console.log(res, 'newRes');


  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));

    if (errorBody?.error_name === "VALIDATION_ERROR") {
      const formatted: ApiValidationError = {
        error_name: "VALIDATION_ERROR",
        message: errorBody.message,
        errors: errorBody.errors,
        status: errorBody.status,
      };

      throw formatted;
    }

    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
};
