"use server";

import { RangeProps as Range } from "@/components/range";
import { MOCKABLE_FIXED_RANGE_URL, MOCKABLE_RANGE_URL } from "@/lib";

export async function getRange(): Promise<Range> {
  try {
    const res = await fetch(MOCKABLE_RANGE_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch range data: ${res.status} ${res.statusText}`
      );
    }

    const data = (await res.json()) as Range;

    if (typeof data.min !== "number" || typeof data.max !== "number") {
      throw new Error("Invalid range data received from server.");
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch range data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching range data.");
    }
  }
}

export async function getFixedRange(): Promise<Range> {
  try {
    const res = await fetch(MOCKABLE_FIXED_RANGE_URL, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch fixed range data: ${res.status} ${res.statusText}`
      );
    }

    const data = (await res.json()) as number[];

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Invalid fixed range data received from server.");
    }

    return {
      min: data[0],
      max: data[data.length - 1],
      isFixed: true,
      fixedValues: data,
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch fixed range data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
