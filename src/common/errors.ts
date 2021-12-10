/**
 * General class of errors in resources.
 */
export class ResourceError extends Error {
  /** @public resource - Resource path where the error was thrown */
  resource: string;
  /** @public code - HTTP response code  */
  code: number;
  /** @public message - error message */
  message: string;

  /**
   * instance class ResourceError
   * @param resource - Resource path where the error was thrown
   * @param code - HTTP response code
   * @param message - error message
   * @returns Instance class extends class Error
   */
  constructor(resource: string, code: number, message: string) {
    super(message);
    this.resource = resource;
    this.code = code;
    this.message = message;
  }
}
