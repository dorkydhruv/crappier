import prisma from "@/lib/db";
import { CreateUserSchema } from "@/lib/types";
import { NextApiRequest, NextApiResponse } from "next/types";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const parsedBody = CreateUserSchema.safeParse(req.body);
        if(!parsedBody.success){
            return res.status(400).json({error: parsedBody.error});
        }
        const {email, password, name} = parsedBody.data;
        // Check if user already exists
        const user =await prisma.user.findFirst({
            where:{
                email
            }
        });
        if(user){
            return res.status(400).json({error: "User already exists"});
        }
        //TODO: Password hashing
        //Now create a user and ask for verification
        const newUser = await prisma.user.create({
            data:{
                email,
                password,
                name,
                verified: false,
            }
        })

        //Now send verification email
        
    }catch(error){

    }
}