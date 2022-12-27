import { Response } from "express";
import { GenericServiceErrorResponse, GenericServiceResponse } from "../utils/interfaces";
import { UserAddressModel } from "../model/user_addresses.model";
import { status200Ok, status201Created, status400BadRequest, status404NotFound, status500InternalServerError } from "../utils/methods";
import { getGenericResponseHelper } from "../utils/methods/responseHelpers";

const model = UserAddressModel

export async function findAddresses(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>) {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).json(status400BadRequest("Invalid userId"))
  }

  try {
    const addresses = await model.findAll({
      attributes: [
        "id_user_address", "id_user", "country", "province", "city", "address", "address_number", "road_type"
      ], where: {
        id_user: userId
      }
    })

    getGenericResponseHelper(addresses, "user address", res)
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))
  }
}

export async function createAddress(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>) {
  // console.log(req.body)
  const { id_user, country, province, city, address, address_number, road_type } = req.body

  try {
    const newAddress = await model.create({
      id_user, country, province, city, address, address_number, road_type
    })

    return res.status(201).json(status201Created(newAddress, "address"))
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))
  }
}

export async function updateAddress(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>) {

}

export async function deleteAddress(req: any, res: Response<GenericServiceResponse | GenericServiceErrorResponse>) {
  console.log(req.query)
  const { userId, addressId } = req.query

  if (!userId || !addressId) {
    return res.status(400).json(status400BadRequest("Invalid userId or addressId"))
  }

  try {
    const deleteAction = await model.destroy({ where: { id_user: userId, id_user_address: addressId } })

    if (!deleteAction) {
      return res.status(404).json(status404NotFound(`User address with id_user: ${userId} and id_user_address: ${addressId}`))
    }
    return res.status(200).json(status200Ok(deleteAction, "user address", "", false, true))
  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))
  }
}