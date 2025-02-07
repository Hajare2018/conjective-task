const express = require("express");

const cors = require("cors")
const app = express();
const {Sequelize, DataTypes} = require("sequelize");
const port = 3003;
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize("task_manager", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

const Task = sequelize.define("task", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    deadline: DataTypes.DATE,
    priority: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN
});

sequelize.authenticate();
// sequelize.sync();

const router = express.Router();

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.post("/tasks", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(400).send("Invalid request data");
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})