import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.username
    );

    if(!newAccount) throw Error;
      
    const avatarUrl = avatars.getInitials(user.name);
     const newUser = await saveUsertoDB({
      accountId:newAccount.$id,
      name: newAccount.name,
      email:newAccount.email,
      username:user.username,
      imageUrl:avatarUrl,
     })
    return newUser;
  } catch (err) {
    console.error(err);
  }
}

export async function saveUsertoDB(user:{
  accountId:string;
  name:string;
  email:string;
  username:string,
  imageUrl:URL;

  
}){
  try{
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user,
      )

      return newUser;
  }catch(Err){
    console.error(Err);
  }
}