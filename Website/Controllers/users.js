const mysql=require("mysql");
const bcrypt=require("bcryptjs");
const nodemailer=require("nodemailer")
global.glo="";
const db=mysql.createConnection({
  host:process.env.DATABASE_HOST,
  user:process.env.DATABASE_USER,
  port:process.env.DATABASE_PORT,
  password:process.env.DATABASE_PASS,
  database:process.env.DATABASE,
  });
  exports.login=async(req,res)=>{
    try{
        const email1=req.body.email;
        console.log(email1);
        const password1=req.body.password;
        console.log(password1);
        // console.log(req.body);
        if(email1=="" || password1==""){
          return res.render("login",{msg:"Please fill the blank"});
        }
        db.query('select * from users where Email=?',[email1],async(error,result)=>{
          // console.log(result);
          // console.log(result[0].username); 
         
          if(result.length < 1){
            return res.render("login",{msg:"This Email is wrong"});
          }
           else{
            if(result[0].pass!=password1){
              res.render("login",{msg:"password is incorrect"})
            }
            else{
              name=result[0].username;   
              res.render("homepage",{name});
              }
            }
            
          }
    ); 
    }
    catch(error){
    console.log(error);
    };
  };
exports.homepage=(req,res) =>{
  res.redirect("/");
}
exports.index=(req,res) =>{
  res.redirect("/login");
}
exports.index2=(req,res) =>{
  console.log(req.body);
}
exports.revolt=(req,res)=>{
  res.redirect("/login");
}
exports.forgot=(req,res)=>{
  const {email,username}=req.body;
  console.log(req.body);
  db.query("select * from users where Email=?",[email],async(err,result)=>{
    glo=result[0].Email;

    if(err) throw err;
    // else if(email="" || username==""){
    //   res.render("forgot",{msg:"Do fill all the blanks"});
    // }
    else if(result[0].username==username){
      res.render("forgotnew",{glo:glo});
      
    }
    else{
      res.render("forgot",{msg:"Invalid email or username"});
    }
  });
  // if(email=="" || username==""){
  //   res.render("forgot",{msg:"Do fill all the blanks"});
  // }
  // else{
  //   res.render("forgot",{msg:"Account does not match"});
  // }
}
  
exports.register=(req,res)=>{
  //console.log("Form submitted");
  // console.log(req.body);
  // const email=req.body.email;
  // const password=req.body.password;
  // const confirm_password=req.body.confirm_password;
  
  const {password,confirm_password}=req.body;
  // const email=[{"email2":req.body.email,"user2":req.body.username}];
  const email=req.body.email;
  const user=req.body.username;
  console.log(email);
//   console.log(password);
db.query("select * from users where Email=?",[email], async(error,result)=>{
  // console.log("result in array"+result);

 if(error){
  console.log(error);
 }
 else if(result.length>0){
  return res.render("register",{msg:"Email ID already taken",msg_type:"error"});
 }
//  else if(user!=result[0].username){
//   return res.render("register",{msg:"Username already taken",msg_type:"error"});
//  }
 else if(password!==confirm_password){
  return res.render("register",{msg:"password does not match",msg_type:"error"});
//  return res.render("register", alert("Password does not match"));
 }
 let hashedPassword=await bcrypt.hash(password,8);
//  console.log(hashedPassword);
db.query("insert into users set ?",{Email:email,pass:password,confirm:confirm_password,username:user},(error,result)=>{
  if(error){
    console.log(error);
  }
  else{
    // res.render(alert("User registration successfull"));
    var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'2k19me070@kiot.ac.in',
      pass:'Jeeva2001aarav'
    }
  });
  var mailoptions={
    from:'2k19me070@kiot.ac.in',
    to:email,
    subject:'Sending mail testing',
    text:`Thanks for creating an account, Account registered successfully`
  };

  transporter.sendMail(mailoptions,function(err,info){
    if(err) throw err;
    console.log('email sent:'+info.response);
  });
    res.status(200).redirect("/login");
  }
}
);
});
};
exports.forgotnew=(req,res)=>{
    const {email,pass,confirmpass}=req.body;
    const sql="update users set pass=? where Email=?";
    const upd="update users set confirm=? where Email=?";
    db.query(sql,[pass,email],(err,result)=>{
      //  console.log(result);
      if(err) throw err;

      db.query(upd,[confirmpass,email],(err,result)=>{
        if(err) throw err;
        else{
          res.render("login");
        }
      }); 
    });
};