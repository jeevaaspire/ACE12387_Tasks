const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    //res.send("<h1>Hello world Earth!</h1>");
    res.render("index");
});
router.get("/register",(req,res)=>{
    //res.send("<h1>Hello world Earth!</h1>");
    res.render("register");
});
router.get("/login",(req,res) =>{
    res.render("login");
});
router.get("/homepage",(req,res) =>{
    res.render("index");
});// 
router.get("/ola",(req,res)=>{
    res.redirect("ola");
});
router.get("/revolt",(req,res)=>{
    res.redirect("revolt");
});
router.get("/ather",(req,res)=>{
    res.redirect("ather");
});
router.get("/heroelectric",(req,res)=>{
    res.redirect("heroelectric");
});
router.get("/admin790@242001",(req,res)=>{
    res.redirect("admin");
});
router.get("/forgot",(req,res)=>{
    res.render("forgot");
});
router.get("/forgotnew",(req,res)=>{
    res.redirect("forgotnew");
});

module.exports=router;
