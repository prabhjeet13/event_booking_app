import {pool} from "../db/config.js";

export const insert = async (req,res,next) => {
    try {
      const {name,email} = req.body;
      
      const [exists] = await pool.query(`select 1 from users where Email = ?`,[email]);
      
      if(exists.length != 0)
      {
        return res.status(409).json({
            flag : 0,
            flag_message : "email already exists"
        })
      }

      const [result] = await pool.query(`Insert into users (Name,Email) VALUES (?,?)`,[name,email]);

        return res.status(201).json({
            flag : 1,
            flag_message : "User Created Successfully"
        })  


    }catch(err)
    {
        return res.status(500).json({
            flag : 0,
            flag_message : "something went wrong"
        })
    }
}

export const getBookings = async (req,res,next) => {
    try {
            const {id} = req.params;

            if(!id)
            {
                return res.status(404).json({
                    flag : 0,
                    flag_message : "kindly provide user id"
                })
            }

            const [result] = await pool.query(`
                  select b.* from bookings b 
                  inner join users u on b.user_id = u.Id
                  where u.id = ?`,[id]);
      
            return res.status(200).json({
                  flag : 1,
                  flag_message : "bookings fetched Successfully",
                  data: result
            })  
    }catch(err)
    {
        return res.status(500).json({
            flag : 0,
            flag_message : "something went wrong"
        })
    }
}

