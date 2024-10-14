import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";


export class Type extends Model{}

Type.init({

name:{
  type: DataTypes.STRING(255),
  allowNull:false
  },
  color:{
    type:DataTypes.TEXT,
    allowNull:false
  }
}, {
  sequelize,
  tableName: "type",
  timestamps: false, 
});








