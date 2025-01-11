const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/plain"});
    fs.readFile('./sample.json','utf8',(err,data)=>{
        if(err){
            console.log("Cannot open file");
            return;
        }
        res.write(data);
        res.end();
    });
});
server.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000");
});