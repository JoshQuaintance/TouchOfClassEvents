import { append } from "svelte/internal";
import { connectToDB } from "$utils/db";
import bcrypt from 'bcrypt'

export async function post (req) {

  const { mongoose, schemas } = await connectToDB();
  const { UserSchema } = await schemas;


  const {email, nickname, password} = JSON.parse(req.body);
  const User = mongoose.models.User || mongoose.model('Users', UserSchema);

  const validateEmail = await User.findOne({ email })
  const validateNickname = await User.findOne({ nickname })

  if (validateEmail || validateNickname) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const validatePass = await User.findOne({ hashedPassword })

    if (validatePass) {
      console.log("User found");
      return {
        status: 200,
        body: {
          message: 'User found'
        }
      }
    }
    else {
      return {
        status: 404,
        body: {
          message: 'No password'
        }
      }
    }
  }
  else {
    return {
      status: 404,
      body: {
        message: 'No user found'
      }
    }
  }
}