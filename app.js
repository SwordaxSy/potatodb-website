// requires
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// express app
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

// env variables
const PORT = parseInt(process.env.PORT || process.env.port || "3000");

// database
mongoose.connect(process.env.MONGODB_URI, { dbName: "PotatoDB" }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});

const commentSchema = new mongoose.Schema(
    {
        commenter: {
            type: String,
            required: true,
            maxlength: 24,
            minlength: 1,
        },
        comment: {
            type: String,
            required: true,
            maxlength: 300,
            minlength: 1,
        },
    },
    { timestamps: true }
);

const Comments = mongoose.model("comments", commentSchema);

// page routes
app.get("/", (req, res) => {
    res.render("home", { page: "Home" });
});

app.get("/docs", (req, res) => {
    res.render("docs", { page: "Docs" });
});

app.get("/contact", async (req, res) => {
    const comments = await Comments.find();
    res.render("contact", { page: "Contact", comments });
});

// action routes
app.post("/comment", async (req, res) => {
    if (!req.body.comment || !req.body.commenter) {
        return res.status(400).json({
            success: false,
            error: "Comment and commenter are required",
        });
    }

    try {
        const comment = await Comments.create(req.body);
        res.status(200).json({ success: true, comment });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, error: err });
    }
});

app.delete("/delete_comments", async (req, res) => {
    if (req.body.password !== process.env.ADMIN_PASSWORD)
        return res
            .status(200)
            .json({ success: false, error: "Incorrect password" });

    try {
        await Comments.deleteMany({});
        res.status(200).json({
            success: true,
            message: "Comments deleted successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, error: "Process failed" });
    }
});
