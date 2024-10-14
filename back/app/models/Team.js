import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";

export class Teams extends Model{}

Teams.init({
  name:{type:DataTypes.TEXT,
  allowNull:false
  },
  description:{
    type:DataTypes.TEXT,
  }
},{
  sequelize,
  tableName: "team",
  timestamps: false, 
});

