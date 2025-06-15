import express from "express";
import {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
} from "../controllers/articleController.js";

const router = express.Router();

// Route to create a new article
router.post("/", createArticle);

// Route to get all articles
router.get("/", getAllArticles);

// Route to get a single article by ID
router.get("/:id", getArticleById);

// Route to update an article
router.put("/:id", updateArticle);

// Route to delete an article
router.delete("/:id", deleteArticle);

export default router;
