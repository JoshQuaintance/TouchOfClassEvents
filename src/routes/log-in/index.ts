import { append } from "svelte/internal";
import { connectToDB } from "$utils/db";


export async function post (req) {

  const { mongoose, schemas } = await connectToDB();
  const { UserSchema } = await schemas;

  const bcrypt = require('bcrypt')  

  const {email, password} = JSON.parse(req.body)

  const User = mongoose.models.User || mongoose.model('Users', UserSchema);
  bcrypt.compare(password, function(err, result) {

  });

  if (!validate) {
    
  }
  else {
    console.log("User found");

  }
}