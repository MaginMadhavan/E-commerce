import express from 'express';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router()

//routes
//create category
router.post(
    '/create-category',
    requireSignIn, isAdmin, 
    createCategoryController)

//update category
router.put(
    '/update-category/:id',
    requireSignIn, isAdmin,
    updateCategoryController
)
//getAll categories
router.get(
    '/get-category', 
    categoryController
)

//get single category

router.get(
    '/get-single-category/:slug',
    singleCategoryController
)

//delete category

router.delete('/delete-category/:id',
    requireSignIn, isAdmin,
    deleteCategoryController
)

export default router;

