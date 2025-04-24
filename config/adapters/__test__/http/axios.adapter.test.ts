import axios, { AxiosError, AxiosInstance } from "axios";
import { AxiosAdapter } from "../../http/axios.adapter";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
} as unknown as AxiosInstance;

mockedAxios.create.mockReturnValue(mockAxiosInstance);

describe("Probar AxiosAdapter", () => {
  const baseURL = "https://api.example.com";
  let adapter: AxiosAdapter;

  beforeEach(() => {
    jest.clearAllMocks();
    adapter = new AxiosAdapter({ baseURL });
  });

  const mockErrorMsg = "Unknown error occurred";

  describe("get", () => {
    test("Debe realizar una solicitud GET exitosa", async () => {
      const mockData = { id: 1, name: "Test" };
      (mockAxiosInstance.get as jest.Mock).mockResolvedValueOnce({
        data: mockData,
      });

      const result = await adapter.get("/test");

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/test", undefined);
      expect(result).toEqual(mockData);
    });

    test("Debe manejar errores en una solicitud GET con mensaje de error", async () => {
      const mockError = {
        response: { data: { error: "Not Found" } },
      } as AxiosError;

      (mockAxiosInstance.get as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(adapter.get("/test")).rejects.toThrow("Not Found");
    });

    test("Debe manejar errores en una solicitud GET sin mensaje de error", async () => {
      const mockError = {
        response: undefined,
        message: mockErrorMsg,
      } as AxiosError;

      (mockAxiosInstance.get as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(adapter.get("/test")).rejects.toThrow(mockErrorMsg);
    });
  });

  describe("post", () => {
    test("Debe realizar una solicitud POST exitosa", async () => {
      const mockData = { id: 1, name: "Test" };
      const body = { name: "Test" };

      (mockAxiosInstance.post as jest.Mock).mockResolvedValueOnce({
        data: mockData,
      });

      const result = await adapter.post("/test", body);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/test",
        body,
        undefined
      );
      expect(result).toEqual(mockData);
    });

    test("Debe manejar errores en una solicitud POST con mensaje de error", async () => {
      const errorMessage = "Bad Request";

      const mockError = {
        response: { data: { error: errorMessage } },
      } as AxiosError;

      (mockAxiosInstance.post as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(adapter.post("/test", {})).rejects.toThrow(errorMessage);
    });

    test("Debe manejar errores en una solicitud POST sin mensaje de error", async () => {
      const mockError = {
        response: undefined,
        message: mockErrorMsg,
      } as AxiosError;

      (mockAxiosInstance.post as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(adapter.post("/test", {})).rejects.toThrow(mockErrorMsg);
    });
  });

  describe("put", () => {
    test("Debe realizar una solicitud PUT exitosa", async () => {
      const mockData = { id: 1, name: "Updated" };
      const body = { name: "Updated" };

      (mockAxiosInstance.put as jest.Mock).mockResolvedValueOnce({
        data: mockData,
      });

      const result = await adapter.put("/test", body);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        "/test",
        body,
        undefined
      );
      expect(result).toEqual(mockData);
    });

    test("Debe manejar errores en una solicitud PUT con mensaje de error", async () => {
      const errorMessage = "Conflict";

      const mockError = {
        response: { data: { error: errorMessage } },
      } as AxiosError;

      (mockAxiosInstance.put as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(adapter.put("/test", {})).rejects.toThrow(errorMessage);
    });

    test("Debe manejar errores en una solicitud PUT sin mensaje de error", async () => {
      const mockError = {
        response: undefined,
        message: mockErrorMsg,
      } as AxiosError;

      (mockAxiosInstance.put as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(adapter.put("/test", {})).rejects.toThrow(
        mockErrorMsg
      );
    });
  });

  describe("delete", () => {
    test("Debe realizar una solicitud DELETE exitosa", async () => {
      const mockData = { success: true };

      (mockAxiosInstance.delete as jest.Mock).mockResolvedValueOnce({ data: mockData });

      const result = await adapter.delete("/test");

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith("/test", undefined);
      expect(result).toEqual(mockData);
    });

    test("Debe manejar errores en una solicitud DELETE con mensaje de error", async () => {
      const errorMessage = "Forbidden";
      
      const mockError = {
        response: { data: { error: errorMessage } },
      } as AxiosError;

      (mockAxiosInstance.delete as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(adapter.delete("/test")).rejects.toThrow(errorMessage);
    });

    test("Debe manejar errores en una solicitud DELETE sin mensaje de error", async () => {
      const mockError = {
        response: undefined,
        message: mockErrorMsg,
      } as AxiosError;

      (mockAxiosInstance.delete as jest.Mock).mockRejectedValueOnce(mockError);

      await expect(adapter.delete("/test")).rejects.toThrow(
        mockErrorMsg
      );
    });
  });
});
