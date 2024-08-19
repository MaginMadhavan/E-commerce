import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';

export const createProductController = async (req,res) =>{

    try {
        const {name,description,slug,price,category,quantity,shipping} = req.fields;
        const {photo}=req.files;

        //validation
        switch(true){
            case!name:
                return res.status(500).send({error:'Name is required'});
            case!description:
                return res.status(500).send({error:'Description is required'});
            case!category:
                return res.status(500).send({error:'Category is required'});
            case!price:
                return res.status(500).send({error:'Price is required'});
            case!quantity:
                return res.status(500).send({error:'Quantity is required'});
            // case photo && photo.size > 200000:
            //     return res.status(500).send({error:'Photo is required and it should be less than 1mb'});
        }

        const products = new  productModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType= photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            products,
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error while creating product',
            error,
        })
    }

};

export const getProductController = async (req,res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(30).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            message: 'All Products',
            total:products.length,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting products',
            error,
        })
    }
};

export const getSingleProductController = async (req,res)=>{

    try {
        const product = await productModel.findOne({slug: req.params.slug}).select('-photo').populate("category");
        res.status(200).send({
            success:true,
            message:'Product fetched successfully',
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting product',
            error,
        })
    }
};

export const productPhotoController = async (req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('Content-Type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting product photo',
            error,
        })
    }
};

export const deleteProductController = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message:'Product deleted successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting product',
            error,
        })
    }
}

export const updateProductController = async (req,res)=>{
    try {
        const {name,description,slug,price,category,quantity,shipping} = req.fields;
        const {photo}=req.files;

        //validation
        // switch(true){
        //     case!name:
        //         return res.status(500).send({error:'Name is required'});
        //     case!description:
        //         return res.status(500).send({error:'Description is required'});
        //     case!category:
        //         return res.status(500).send({error:'Category is required'});
        //     case!price:
        //         return res.status(500).send({error:'Price is required'});
        //     case!quantity:
        //         return res.status(500).send({error:'Quantity is required'});
        //     // case photo && photo.size > 200000:
        //     //     return res.status(500).send({error:'Photo is required and it should be less than 1mb'});
        // }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},
            {new:true}
        );
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType= photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            products,
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error while updating product',
            error,
        })
    }
}
//filter
export const productFilterController = async(req,res)=>{
    try {
        const {checked,radio} = req.body
        let args = {};
        if(checked.length > 0)args.category = checked;
        if(radio.length) args.price = {$gte:radio[0],$lte:radio[1]};
        const products = await productModel.find(args);
        res.status(200).send({
            success:true,
            message: 'Filtered Products',
            total: products.length,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error while filtering products',
            error,
        })
    }
}

//productCountController

export const productCountController =async (req,res)=>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            total

        })
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message:'Error in product count',
        error,
        success:false
      })  
    }
}

//product list based on page

export const productListController = async(req,res)=>{
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message: 'Products listed successfully',
            total: products.length,
            products,
            currentPage: page,
            perPage,
            totalPages: Math.ceil(products.length/perPage)  //total pages calculated by dividing total documents by perPage documents per page
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Error in per page list',
            error,
            success:false
        })
    }
}

//search product controller
export const searchProductController = async (req, res) =>{
    try {
        const {keyword} = req.params;
        const result = await productModel.find({
            $or:[
                {name:{$regex :keyword, $options:"i"}},
                {description:{$regex :keyword, $options:"i"}}, //removes case sensitivity
            

            ]

        }).select("-photo")
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Error in search product',
            error,
            success:false
        })
    }
}

//relatedProductController

export const relatedProductController = async (req, res) =>{
    try {
        const {pid,cid}= req.params
        const products = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(3).populate("category")

        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Error in related product',
            error,
            success:false
        })
    }
}

//get product by category

export const productCategoryController =async (req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        const products = await productModel.find({category}).populate('category')
        res.status(200).send({
            success:true,
            category,
            products
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message:'Error in product category',
            error,
            success:false
        })
    }
}