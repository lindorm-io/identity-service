import { APIError, HttpStatus } from "@lindorm-io/core";

export class UsernameConflictError extends APIError {
  constructor(username: string) {
    super("Username already exists", {
      debug: { username },
      details: "The provided username has already been claimed by another.",
      statusCode: HttpStatus.ClientError.FORBIDDEN,
    });
  }
}
