import connection from "../config/connection";
import { DataTypes, Model } from "sequelize";
import Address from "./Address";

class User extends Model {
    declare id: number
    declare createdAt: string
    declare updatedAt: string
    declare address?: {
        id?: number
    }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    birthDate: DataTypes.DATE
  },
  {
    sequelize: connection,
    tableName: "users",
    paranoid: true
  }
);

User.hasOne(Address, {
    foreignKey: 'userId',
    as: 'address'
})

export default User;