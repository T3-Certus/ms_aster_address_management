import { Router } from "express";
import { createAddress, deleteAddress, findAddresses } from "../controller/address_management.controller";
import { CreateAddressValidator } from "../utils/middlewares/validators/create_address.validator";

const router = Router()

router.get("/get-addresses/:userId", findAddresses)
router.post("/create-address", CreateAddressValidator, createAddress)
// router.put("/update-address")
router.delete("/delete-address", deleteAddress)

export default router