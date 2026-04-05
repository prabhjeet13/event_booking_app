import {pool} from "../db/config.js";
import { v4 as uuidv4 } from "uuid";

export const get = async (req,res,next) => {
    try {
            const [result] = await pool.query(`select * from events`)
      
            return res.status(202).json({
                  flag : 1,
                  flag_message : "Event get Successfully",
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


export const add = async (req,res,next) => {
    try {
       const {title,description,eventDate,totalCapacity} = req.body;
            
      
            const [result] = await pool.query(`Insert into events (Title,Description,Event_date,Total_capacity,Remaining_tickets) VALUES (?,?,?,?,?)`,[title,description,eventDate,totalCapacity,totalCapacity]);
      
              return res.status(201).json({
                  flag : 1,
                  flag_message : "Event Created Successfully"
              })  
      
    }catch(err)
    {
        return res.status(500).json({
            flag : 0,
            flag_message : "something went wrong"
        })
    }
}


export const booking = async (req,res,next) => {


    const conn = await pool.getConnection();
    try {

    const {userId,eventId,tickets_count} = req.body;    
    await conn.beginTransaction();

    const [rows] = await conn.query(
        "SELECT Remaining_tickets FROM events WHERE id = ? FOR UPDATE",
        [eventId]
    );

    if (rows[0].Remaining_tickets < tickets_count) {
        throw new Error("Not enough tickets");
    }

    const booking_code = uuidv4();


    await conn.query(
        "UPDATE events SET remaining_tickets = remaining_tickets - ? WHERE id = ?",
        [tickets_count, eventId]
    );


    await conn.query(
        "INSERT INTO bookings (User_id, Event_id,Booking_Code,Tickets_Count) VALUES (?, ?,?,?)",
        [userId, eventId,booking_code,tickets_count]
    );

      await conn.commit();
      
      return res.status(202).json({
        flag : 1,
        flag_message : "booked successfully",
        data : booking_code,
      })


    } catch (err) {
      await conn.rollback();
        return res.status(500).json({
            flag : 0,
            flag_message : err.message || "something went wrong"
        })
    } finally {
      conn.release();
    }
}


export const attendance = async (req,res,next) => {
    try {

        const {id} = req.params;

        const { code } = req.body;
   
        const [booking] = await pool.query(
            "SELECT tickets_count FROM bookings WHERE booking_code = ? and event_id = ?",
            [code,id]
        );

        if (booking.length === 0) {
            return res.status(404).json({
              flag : 0,
              flag_message : "invalid code",    
             });
        }

        res.status(202).json({
            flag : 1,
            flag_message : "fetched successfully",
            tickets_booked: booking[0].tickets_count,
        });

    }catch(err)
    {
        return res.status(500).json({
            flag : 0,
            flag_message : "something went wrong"
        })
    }
}