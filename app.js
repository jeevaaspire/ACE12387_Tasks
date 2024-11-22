const express=require('express');
const mysql=require("mysql");
const app=express();
const nodemailer=require('nodemailer');
const path=require('path');
const { dirname } = require('path');
const ejs=require('ejs');
const db=mysql.createConnection({
host:"localhost",
user:"root",
port:"5500",
password:"root",
database:"login",
});
const db1=mysql.createConnection({
  host:"localhost",
  user:"root",
  port:"5500",
  password:"root",
  database:"home",
  });

db.connect((err) =>{
if(err){
    console.log(err);
}
else{
    console.log('Mysql connection success');
}
});

app.use(express.urlencoded({extended:false}));

const location=path.join(__dirname,"./public");
app.use(express.static(location));
app.set("view engine","ejs");

// ----------------------login start------------------------
app.post('/loginValue',(req,res)=>{
        const email1=req.body.email;
        const password1=req.body.password;
        if(email1=="" || password1==""){
          return res.render("login",{msg:"Please fill the blank"});
        }
        else if(email1=="EVadmin@gmail.com" && password1=="Admin790@2001"){
          res.redirect("/admin");
        }
        db.query('select * from users where Email=?',[email1],async(error,result)=>{
          if(result.length < 1){
            return res.render("login",{msg:"This Email is wrong"});
          }
           else{
            if(result[0].pass!=password1){
              res.render("login",{msg:"password is incorrect"})
            }
            else{
              name=result[0].username;
              res.render("homepage");
              console.log(result);
            }
            }
          }
    ); 
});
// ----------------------login end----------------------------

// ----------------registration start------------------------
app.post('/signupValue',(req,res)=>{
    const {password,confirm_password}=req.body;
    const email=req.body.email;
    const user=req.body.username;
    console.log(email);
    if(password=="" || confirm_password=="" || email=="" || user==""){
      return res.render("register",{msg:"Please fill the blanks"});
    }
  db.query("select * from users where Email=?",[email], async(error,result)=>{
   if(error){
    console.log(error);
   }
   else if(result.length>0){
    return res.render("register",{msg:"Email ID already taken",msg_type:"error"});
   }
   else if(password!==confirm_password){
    return res.render("register",{msg:"password does not match",msg_type:"error"});
   }
  db.query("insert into users set ?",{Email:email,pass:password,confirm:confirm_password,username:user},(error,result)=>{
    if(error){
      console.log(error);
    }
    else{
      var transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:'2k19me070@kiot.ac.in',
        pass:'Jeeva2001@arav'
      }
    });
    var mailoptions={
      from:'2k19me070@kiot.ac.in',
      to:email,
      subject:'Creating account on EV Mart',
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
  });
//   -----------------registration end------------------------

// ---------------------logout start--------------------------
  app.post('/logout',(req,res)=>{
    res.render("index",{msg:" "});
  });
// ----------------------logout end---------------------------

// ----------------------forgotpage start--------------------------
  app.post('/forgotValue',(req,res)=>{
    const {email,username}=req.body;
    console.log(req.body);
    db.query("select * from users where Email=?",[email],async(err,result)=>{
      glo=result[0].Email;
      if(err) throw err;
      // else if(email="" || username==""){
      //   res.render("forgot",{msg:"Do fill all the blanks"});
      // }
      else if(result[0].username==username){
        res.render("forgotnew");
      }
      else{
        res.render("forgot",{msg:"Invalid email or username"});
      }
    })
    
});
// ---------------------------forgot end----------------------------

// -------------------------forgotnew start------------------------
app.post('/forgotnewvalue',(req,res)=>{
    const {email,pass,confirmpass}=req.body;
    const sql="update users set pass=? where Email=?";
    const upd="update users set confirm=? where Email=?";
    db.query(sql,[pass,email],(err,result)=>{
      //  console.log(result);
      if(err) throw err;

      db.query(upd,[confirmpass,email],(err,result)=>{
        if(err) throw err;
        else{
          var transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
              user:'2k19me070@kiot.ac.in',
              pass:'Jeeva2001@arav'
            }
          });
          var mailoptions={
            from:'2k19me070@kiot.ac.in',
            to:email,
            subject:'Forgot Password',
            text:`Hi user, Your password has been changed successfully`
          };
        
          transporter.sendMail(mailoptions,function(err,info){
            if(err) throw err;
            console.log('email sent:'+info.response);
          });
          res.redirect("login");
        }
      }); 
    });
});
// -----------------------forgotnew end----------------------------

// ------------------------subscribe start---------------------------
app.post('/subscribe',(req,res)=>{
    const email=req.body.email;
    db.query("select * from user where email=?",[email],(err,result)=>{
        if(err) throw err;
        else if(result.length==1){
           return res.render("index",{msg:"Already taken"})
        }
       db.query("insert into user set ?",{email:email},(err,result)=>{
        if(err) throw err;
        else{
            setTimeout(()=>{
                res.render("index",{msg:" "});
            },3000)
        }
       })
    })
});
// ---------------------------subscriber end----------------------------

// ---------------------------getintouch start--------------------------
app.post('/getintouch',(req,res)=>{
    const {username,email,phone,text}=req.body;
        db.query("insert into details set ?",{uname:username,email:email,phonenum:phone,message:text},(error,result)=>{
         if(error){
            console.log(error);
         }
         else{
            res.render("index",{msg:""});
         }
        });
});
// --------------------------getintouch end----------------------------

//--------------------------------Vehicle add start-----------------------------

app.post('/vehicleaddition',(req,res)=>{
  console.log(req.body.addvehicle);
  const {brandname,imgpath,message,addvehicle,updvehicle}=req.body;

  if(addvehicle=="addvehicle"){
    db1.query("select * from homepage where head=?",[brandname],async(err,result)=>{

        if(result.length>0){
          // console.log(result[0].length);
          return res.render("vehiclemanagement",{msg:"Brand already added"});
        }
    db1.query("insert into homepage set ?",{head:brandname,image:imgpath,content:message},(err,result)=>{
      if(err) throw err;
      res.redirect("/admin");
    });
  })
}
else if(updvehicle=="updvehicle"){
  db1.query("update homepage set head=?,image=?,content=? where head=?",[brandname,imgpath,message,brandname],(err,result)=>{
          res.redirect("/admin");
  });
}
});
 


  // console.log(brandname);
  // db1.query("select * from homepage where head=?",[brandname],async(err,result)=>{

  //   if(result.length>0){
  //     // console.log(result[0].length);
  //     return res.render("vehiclemanagement",{msg:"Brand already added"});
  //   }
  //   else if(result.length>0 && result[0].head!=brandname || result[0].image!=imgpath || result[0].content!=message){
  //     db1.query("update homepage set head=?,image=?,content=? where head=?",[brandname,imgpath,message,brandname],(err,result)=>{
  //       res.redirect("/admin");
  //     });
  //   }
  //   db1.query("insert into homepage set ?",{head:brandname,image:imgpath,content:message},(err,result)=>{
  //     if(err) throw err;
  //     else{
  //     res.redirect("/admin");
  //     }
  //   });
  // });
//--------------------------------Vehicle add end-------------------------------









db1.query("select * from homepage",(err,result)=>{
    count=result.length;
    // console.log(jeeva);
});

db1.query("select * from homepage",(err,data)=>{
    if(err) throw err;
    mani=data;
    console.log(mani.length)
  });


app.get("/",(req,res)=>{
    res.render("index",{msg:""});
})
app.get("/login",(req,res)=>{
    res.render("login",{msg:""});
})
app.get("/register",(req,res)=>{
    res.render("register",{msg:""});
})
app.get("/homepage",(req,res)=>{
    res.redirect("homepage");
})
app.get("/forgot",(req,res)=>{
    res.render("forgot",{msg:""});
})
app.get("/forgotnew",(req,res)=>{
    res.render("forgotnew",{msg:""});
})
app.get("/forgot",(req,res)=>{
    res.render("forgot");
});
app.get('/vehiclemanagement',(req,res)=>{
  res.render("vehiclemanagement",{msg:""});
});
app.get('/admin',(req,res)=>{
  res.render("admin");
});
app.get('/offers',(req,res)=>{
  res.render("offers");
});

app.listen(300,() =>{
    console.log("Server started @ Port 300");
});





// const partialspath=path.join(__dirname,"./views/partial");
// hbs.registerPartials(partialspath);

// app.use("/",require("./routes/pages"));
// app.use("/auth",require("./routes/auth"));

// app.use("/",require("./routes/pages"));
// app.use("/auth",require("./routes/auth"));