import { validate } from "class-validator";
import { type ClassConstructor, plainToClass } from "class-transformer";
import HTTPError from "@/errors";

export async function parse<T extends object>(
  targetClass: ClassConstructor<T>,
  request: Request,
): Promise<T> {
  const body = await request.json();
  const result = plainToClass(targetClass, body);
  const errors = await validate(result, {
    whitelist: true,
    forbidNonWhitelisted: true,
    enableDebugMessages: true,
  });
  if (errors.length > 0) {
    throw new HTTPError(422, { errors });
  } else {
    return result;
  }
}
