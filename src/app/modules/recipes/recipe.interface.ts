import { ObjectId } from "mongoose";

export type TRecipe ={
    title : String,
    description : String,
    ingredients : String[],
    instructions : [{title : String, time : Number}],
    category : String,
    cookingTime : Number,
    image : String,
    userId : ObjectId,
    premiumStatus : Boolean,
}