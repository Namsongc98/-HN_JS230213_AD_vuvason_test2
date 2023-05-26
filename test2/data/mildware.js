
const express = require("express")
const app = express()


  const validaterTitle = (req,res,next) => {
    const { title } = req.body;
    if (!title) {
      return res.status(500).json({
          messeger: "không được để trống"
      })
    }
    next()
  };

module.exports=validaterTitle