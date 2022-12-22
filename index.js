const express=require('express')
const app=express()
const uuid=require('uuid')
const methodOverRide=require('method-override')
  
// setting the view engine to ejs
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverRide('_method'))

let arr=[
    {   id:uuid.v4(),
        name:'sivasankar'
        ,comment:"I like BlackPearl"
    },
    {   id:uuid.v4(),
        name:'arun',
        comment:"I like burgur"
    },
    {   id:uuid.v4(),
        name:'selvaKumar',
        comment:"I like biriyani"
    },
    {   id:uuid.v4(),
        name:'Yokesh',
        comment:"I like tomotoRise"
    }
]

// app.use("html",require('ejs').renderFile)

app.get('/',(req,res)=>{
    res.render('example')
})
app.get('/comments',(req,res)=>{
    res.render('Comments')
})

app.get('/likes',(req,res)=>{
   
    res.render('likes',{arr})
   
})
app.post('/likes',(req,res)=>{
    const {name,comment}=req.body
    arr.push({name,comment,id:uuid.v4()})
    // res.render('likes',{name,comment})
    res.redirect('likes')
})
app.get('/likes/:id',(req,res)=>{
    const {id}=req.params
    const detail=arr.find((ar)=>ar.id===id)
    res.render('details',{detail})
})

app.get('/likes/:id/Edit',(req,res)=>{
    const {id}=req.params
    const comment=arr.find((ar)=>ar.id===id)
    res.render('Edit',{comment})
})              

app.patch('/likes/:id',(req,res)=>{
    const{id}=req.params;
    let array=arr.find((c)=>c.id===id);
    var newcomment=req.body.comment;
    array.comment=newcomment;
    res.redirect('/likes');
});
app.delete('/likes/:id/delete',(req,res)=>{
    const{id}=req.params;
    arr=arr.filter((c)=>c.id!==id);
    // var newcomment=req.body.comment;
    // array.comment=newcomment;
    res.redirect('/likes');
});
// app.get('/details',(req,res)=>{

//     res.render('details')
// })


// app.get('/home',(req,res)=>{
//     res.render('home',{num:Math.floor(Math.random()*100),name:'sivasankar'})
// })

// app.get('/hobbies',(req,res)=>{
//     res.render('hobbies',{siva})
// })

// app.post('/forms',(req,res)=>{
//     const {name}=req.body 
//     res.send(`<h1>my name ${name} </h1>`)
// })

app.listen(2000,(err)=>{
    if(err) {throw err}
    console.log("server started on 2000")
})