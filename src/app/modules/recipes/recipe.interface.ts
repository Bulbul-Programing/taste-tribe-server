import { ObjectId } from "mongoose";

export type TRecipe ={
    title : String,
    description : String,
    ingredients : String[],
    instructions : String[],
    category : String,
    cookingTime : Number,
    image : String,
    userId : ObjectId,
}