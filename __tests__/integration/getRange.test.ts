import { getRange } from "@/actions/getData";

describe("Integration test for getRange()", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns data if fetch is successful", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ min: 1, max: 100 }),
    });

    const result = await getRange();
    expect(result).toEqual({ min: 1, max: 100 });
  });

  it("throws an error if fetch fails (non-ok)", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(getRange()).rejects.toThrow(
      "Failed to fetch range data: 500 Internal Server Error"
    );
  });

  it("throws an error for invalid data shape", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ min: "not-a-number", max: 100 }),
    });

    await expect(getRange()).rejects.toThrow(
      "Invalid range data received from server."
    );
  });
});
