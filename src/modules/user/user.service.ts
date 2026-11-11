import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./user.interface";


const createUserIntoDB = async (payload : IUser) =>{
    const { name, email, password, age } = payload;

    const hashPassword = await bcrypt.hash(password, 10);

     const result = await pool.query(
      `
     INSERT INTO users(name,email,password,age) VALUES($1,$2,$3,$4) RETURNING *
    `,
      [name, email, hashPassword, age],
    );

    return result;
}
// get all user
const  getAllUsersFromDB = async()=>{
    const result = await pool.query(`
      SELECT * FROM users  
        `);
    
    return result;
}


//singel user
const  getSingleUserFromDB = async (id:string) => {
    const result = await pool.query(
          `
          SELECT * FROM users WHERE id=$1  
            `,
          [id],
        );
    return result;
};


//update 
const updateUserFromDB = async(payload: IUser, id: string)=>{
     const { name, password, age } = payload;
     const result = await pool.query(
      `
    UPDATE users 
    SET 
    name=COALESCE($1,name),
    password=COALESCE($2,password),
    age=COALESCE($3,age)

    WHERE id=$4 RETURNING *
    `,
      [name, password, age, id],
    );

    return result;
}

//delete user
const deleteUserFromDB = async (id:string) =>{
     const result = await pool.query(
      `
    DELETE FROM users WHERE id=$1  
      `,
      [id],
    );
    return result;
}

export const userService ={
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUserFromDB,
    updateUserFromDB,
    deleteUserFromDB,

}