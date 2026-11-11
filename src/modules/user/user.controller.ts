import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

//create user
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);
   
    res.status(201).json({
      success: true,
      message: "User Created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};


//get all user
const getAllUsers = async (req:Request,res:Response)=>{
     try {
    const result = await userService.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }

}

//get singel user
const getSingleUser = async(req:Request,Res:Response)=>{

}





export const userController = {
  createUser,
  getAllUsers,
};