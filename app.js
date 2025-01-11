var express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const cors=require('cors')

app.use(cors())
const app = express();
app.use(express.json())     //middleware

mongoose.connect("mongodb+srv://pradeepa-1204:pradeepam@cluster0.c1hoy.mongodb.net/expense ").then(() => {
    console.log("connected to database");
   /* mongoose.connect("mongodb://localhost:27017/expense ").then(() => {
        console.log("connected to database");*/
    });


const expenseSchema = new mongoose.Schema({
    //schema
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },   //required: true-> mandatory field
    amount: { type: Number, required: true },
});

const Expenses = mongoose.model("Expenses", expenseSchema);

app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expenses.find();
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ message: "failed to fetch expense" });
    }

});

app.get("/api/expenses/:id", async (req, res) => {
    try {
        const { id } = req.params
        const expenses = await Expenses.findOne({ id });
        if (!expenses) {
            return res.status(404).json({ message: "Expense not found" })
        }
        res.status(200).json(expenses)
    }
    catch (error) {
        res.status(500).json({ message: "error in fetching expenses" })
    }

})

app.put("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const { title, amount } = req.body;
    try {
        const updateExpense = await Expenses.findOneAndUpdate(
            { id }, { title, amount },
        )
        if (!updateExpense) {
            return res.status(404).json({ message: "Expensse not found" });
        }
        return res.status(200).json({ title, amount });
    }
    catch (error) {
        res.status(500).json({ message: "Error in updating expense" })
    }

})
app.delete("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteExpense = await Expenses.findOneAndDelete({ id });
        if (!deleteExpense) {
            return res.status(404).json({ message: "Expense not found" })
        }
        res.status(200).json({ message: "Expense deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Error in deleting expense" });
    }
});
app.post("/api/expenses", async (req, res) => {

    console.log("POST /api/expenses called"); // Debug log
    console.log("Request Body:", req.body);  // Debug log to check body content


    const { title, amount } = req.body;
    try {
        const newExpense = new Expenses({
            id: uuidv4(),     //new uuid generated
            title: title,
            amount: amount
        });
        const savedExpense = await newExpense.save()
        res.status(200).json(savedExpense);
    } catch (err) {
        res.status(500).json({ message: "Error in creating expense" })
    }
});
/*
app.get("/api/sayhello",(req,res)=>{
    res.send("vanakam da maaple");
    res.end()
});

app.get("/api/students",(req,res)=>{
    res.status(200).json({name:"yalini",age:25});

});
//app.get("/api/")*/

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})




