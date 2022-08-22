import { Request, Response, RequestHandler } from 'express';
import { RowDataPacket, FieldPacket, OkPacket } from "mysql2"
import connection from '../config/db_connection';

interface IMurmursProps extends RowDataPacket {
  id?: number,
  text?: string,
  creator?: string,
  like_count?: number
};

interface ILikeProps extends RowDataPacket {
  id?: number,
};

interface IFullLikeProps extends ILikeProps {
  userId?: number,
  post_id?: number,
  name?: string,
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
    const limit: number = req?.query && req?.query?.limit ? +req?.query?.limit : 10;
    const skip: number = req?.query && req?.query?.skip ? +req?.query?.skip : 0;


    // GET THE ARRAY OF FOLLOWERS
    const followers: number[] = [1, 2];
    const insertQry: string = `SELECT m.*, u.name\
        FROM murmurs m\
        JOIN user u ON u.id = m.creator\ 
        WHERE creator IN (${followers})\
        ORDER BY id DESC LIMIT ${limit} OFFSET ${skip}`;

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

export const getMurmursDetails: RequestHandler = async (req: Request, res: Response) => {
  try {
    await connection.connect();
    const murmurId: string = req.params.murmurId

    const detailsQry: string = `SELECT m.*, u.name\
        FROM murmurs m\
        JOIN user u ON u.id = m.creator\ 
        WHERE m.id ='${murmurId}'`;

    const likedQry: string = `SELECT  murlike.*, u.name\
      FROM like_murmurs murlike\
      JOIN user u ON u.id = murlike.user_id\ 
      WHERE post_id ='${murmurId}'`;

    const [rows, ] : [IMurmursProps[], FieldPacket[]] = await connection.promise().execute<IMurmursProps[]>(detailsQry, []);
    const [likeRowsa, ] : [IFullLikeProps[], FieldPacket[]] = await connection.promise().execute<IFullLikeProps[]>(likedQry, []);


    res.status(200).send({
      data: {murmurDetails: rows[0], liked: likeRowsa},
      message: "Murmurs Details"
    })
    
  } catch (error) {
    res.status(404).send({
      error,
      message: "Failed to get Murmurs details"
    })
  }
};

export const likeOrDislikeMurmurs: RequestHandler = async (req: Request, res: Response) => {
  try {
    console.log("here")
    await connection.connect();
    const murmurId: string = req.params.murmurId;
    //todo get userId from auth header token
    const userId: number = 2;
    const existQuery: string = `SELECT id FROM like_murmurs WHERE user_id = '${userId}' AND post_id = '${murmurId}'`;
    const [like_exist, ] : [ILikeProps[], FieldPacket[]] = await connection.promise().execute<IMurmursProps[]>(existQuery, []);

    if (like_exist?.length > 0) {
      return res.status(200).send({
        message: "Like already given to this MURMUR"
      })
    }

    const insertQry: string = `UPDATE murmurs SET like_count = like_count + 1 WHERE id = '${murmurId}'`;
    const insertLikeQry: string = `INSERT INTO like_murmurs (user_id, post_id) VALUES ('${userId}', '${murmurId}')`;

    const [rows]: [OkPacket, FieldPacket[]] = await connection.promise().execute(insertQry);
    const [murmurs_like]: [OkPacket, FieldPacket[]] = await connection.promise().execute(insertLikeQry);

    res.status(200).send({
      data: {rows, murmurs_like},
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