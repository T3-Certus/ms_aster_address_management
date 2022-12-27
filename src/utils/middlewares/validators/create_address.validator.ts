import { check } from "express-validator";
import { validateCreateRequest } from "../../methods";

export const CreateAddressValidator = [
  check("id_user").exists().isInt(),
  check(["country", "province", "city", "address", "address_number", "road_type"]).exists().isString(),

  (req: any, res: any, next: any) => {
    validateCreateRequest(req, res, next)
  }
]
