import connection from "../config/connection";
import { DataTypes, Model } from "sequelize";

class Address extends Model {}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    country: {
        type: DataTypes.ENUM,
        values: ['ES', 'UK', 'DE', 'US']
    },
    postalcode: DataTypes.STRING
  },
  {
    sequelize: connection,
    tableName: "addresses",
    timestamps: false
  }
);

export default Address;