const mysql=require("mysql");
global.msg="";
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    port:process.env.DATABASE_PORT,
    password:process.env.DATABASE_PASS,
    database:process.env.DATABASE1,
    });
    
    exports.index1=(req,res) =>{
        console.log(req.body);
        const {email}=req.body;
        db.query("select * from user where email=?",[email],(err,result)=>{
         console.log(result);
         console.log(result.length);
         if(result.length==1){
            return res.render("index",{msg:"Already registered"});   
          }
        db.query("insert into user set ?",{email:email},(error,result)=>{
         if(error){
            console.log(error);
         }
         else{
            setTimeout(()=>{
               res.render("index");
            },3000);
            console.log(result);
         }
        });
      });
        
      }
    