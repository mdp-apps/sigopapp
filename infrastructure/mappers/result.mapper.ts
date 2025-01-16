import { ApiResponse, Result } from "../interfaces";

export class ResultMapper {
  static fromResultToEntity(response: ApiResponse<string>): Result {
    return {
      result: response.resultado,
    };
  }
}