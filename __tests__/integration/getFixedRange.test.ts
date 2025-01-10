import { getFixedRange } from "@/actions/getData";

describe("Integration test for getFixedRange()", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("returns data if fetch is successful", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
    });

    const result = await getFixedRange();
    expect(result).toEqual({
      min: 1.99,
      max: 70.99,
      isFixed: true,
      fixedValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
    });
  });

  it("throws an error if fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    await expect(getFixedRange()).rejects.toThrow(
      "Failed to fetch fixed range data: 404 Not Found"
    );
  });

  it("throws an error if data is empty or not an array", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await expect(getFixedRange()).rejects.toThrow(
      "Invalid fixed range data received from server."
    );
  });
});
