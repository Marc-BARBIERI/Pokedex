import {Type} from "../models/index.js";


export async function getAllTypes(req,res){
  try {
    
 const types = await Type.findAll();
 res.json(types)

} catch (error) {
    console.log ("Erreur lors de la récupération des Types")
  }
}

export async function getOneType(req,res){
  
try {
  const id = (req.params.id)
  const types = await Type.findByPk(id)
  res.json(types)
  
} catch (error) {
  console.log ("Erreur lors de la récupération d'un Type")
}

}