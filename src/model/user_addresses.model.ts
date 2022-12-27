import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";
import { UserDataModel } from "./user_data.model";

export const UserAddressModel = sequelize.define(
  "user_addresses", {
  id_user_address: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  country: {
    type: DataTypes.STRING,
  },
  province: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  address_number: {
    type: DataTypes.STRING
  },
  road_type: {
    type: DataTypes.STRING
  }
},
  {
    timestamps: false
  }
)

UserAddressModel.belongsTo(UserDataModel, {
  foreignKey: 'id_user',
  targetKey: 'id_user'
})

UserDataModel.hasOne(UserAddressModel, {
  foreignKey: 'id_user',
  sourceKey: 'id_user'
})