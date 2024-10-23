'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({email,password}: signInProps) =>{

    try {
        //Mutation /database / make fetch
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email,password);
        

        return parseStringify(response); //return response to authform which calls signIn
    } catch (error) {
        console.error('Error',error)
    }

}


export const signUp = async (userData : SignUpParams) =>{
//distructure syntax
const { email, password, firstName, lastName} = userData;

    try {
        //Mutation /database / make fetch //code from appwrite

        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
        ID.unique(),
        email,
        password,
         `${firstName} ${lastName}`
        );


        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        //next.js cant take newUserAccount as object but only as string
        return parseStringify(newUserAccount);

    } catch (error) {
        console.error('Error',error)
    }

}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();


      const user = await account.get();
      return parseStringify(user)
    } catch (error) {
      return null;
    }
  }
  
  export const logoutAccount = async () => {
    try {
      

      const { account } = await createSessionClient();
      
      cookies().delete('appwrite-session');

      await account.deleteSession('current');

    } catch (error) {

      return null;
    }
  }