import { Request, Response, RequestHandler } from 'express';
import { RowDataPacket, FieldPacket, OkPacket } from "mysql2"
import connection from '../config/db_connection';

interface IMurmursProps extends RowDataPacket {
  id?: number,
  text?: string,
  creator?: string,
  like_count?: number
};

export const createMurmurs: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();
    const text: string = req.body?.text;
    const creator: number = +req.body?.creator;

    const insertQry: string = `INSERT INTO murmurs (text, creator) VALUES ('${text}', '${creator}')`;
    const [rows, ]: [OkPacket, FieldPacket[]] = await connection.promise().execute<OkPacket>(insertQry);
    res.status(200).send({
      data: rows,
      message: "Murmurs created"
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "Murmurs creation failed"
    })
  }
};
export const getMurmurs: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();

    const insertQry: string = `SELECT * FROM murmurs WHERE creator='${2}'`;
    const [rows, ] : [IMurmursProps[], FieldPacket[]] = await connection.promise().execute<IMurmursProps[]>(insertQry, []);

    res.status(200).send({
      data: rows,
      message: "Murmurs List"
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "Failed to get Murmurs"
    })
  }
};

export const likeOrDislikeMurmurs: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();
    const murmurId: string = req.params.murmurId

    const insertQry: string = `UPDATE murmurs SET like_count = like_count + 1 WHERE id = '${murmurId}'`;
    const [rows]: [OkPacket, FieldPacket[]] = await connection.promise().execute(insertQry);
    res.status(200).send({
      data: rows,
      message: "Murmurs like updated"
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "Failed to Delete Murmurs"
    })
  }
};

export const deleteMurmurs: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();
    const murmurId = req.params.murmurId
    console.log(req.params)
    const insertQry: string = `DELETE FROM murmurs WHERE id = '${murmurId}'`;
    const [rows]: [OkPacket, FieldPacket[]] = await connection.promise().execute(insertQry);
    res.status(200).send({
      data: rows,
      message: "Murmurs deleted"
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "Failed to Delete Murmurs"
    })
  }
};