import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req,res) => {

    try{
        const {name}= req.body;
        if(!name){
            return res.status(401).send({message:'Name is required'});
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){return res.status(200).send({message:'Category already exists', success:true})}


        const category = await new categoryModel({name,slug:slugify(name)}).save();

        res.status(201).send({
            success:true,
            message:'Category created successfully',
            category
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in creating category',
            error
        })
    }
};

//update category controller

export const updateCategoryController = async (req,res) => {
    try {
        const {name}=req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        res.status(200).send({
            success:true,
            message:'Category updated successfully',
            category,
        });
    } 
    catch (error) {
        console.log(error)
        res.send({
            message:'Error while updating category',
            success:false,
            error,
        })
    }
}

//get All categories

export const categoryController = async (req,res)=>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'Categories fetched successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                message: 'Error while getting categories',
                success: false,
                error,
            }
        )
    }
}

export const singleCategoryController = async (req,res)=>{
    try {
        const {slug}=req.params.slug;
        const category = await categoryModel.findOne({slug});
        res.status(200).send({
            success:true,
            message:'Category fetched successfully',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(
            {
                message: 'Error while getting category',
                success: false,
                error,
            }
        )
    }
}

//delete category

export const deleteCategoryController = async (req,res)=>{
    try {
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Category deleted successfully',
        });
    } catch (error) {
        res.status(401).send({
            message : "Error while deleting category",
            success:false,
            error
        })
    }
}