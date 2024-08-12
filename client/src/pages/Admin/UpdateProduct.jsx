import React ,{useState,useEffect}from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/Layouts/AdminMenu'
import toast from "react-hot-toast";
import axios from 'axios'
import {Select} from 'antd';
import { useNavigate , useParams} from 'react-router-dom';

const { Option } = Select; //dropdown menu




const UpdateProduct = () => {

    const navigate = useNavigate();
    const params = useParams();
  const [categories,setCategories]=useState([]);
  const [category,setCategory]=useState([]);
  const [photo,setPhoto]=useState("");
  const [name,setname]=useState("");
  const [description,setDescription]=useState("");
  const [price,setPrice]=useState("");
  const [quantity,setQuantity]=useState("");
  const [shipping,setShipping]=useState("");
  const [id,setId]=useState("");


  //get single product
  const getSingleProduct = async ()=>{
    try {
        const {data}= await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
        console.log(data.product);
        setname(data.product.name);
        setId(data.product._id);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setCategory(data.product.category._id);
        //setPhoto(data.product.photo);

    } catch (error) {
        console.log(error);
    }
  }

  useEffect(()=>{
    getSingleProduct();
    //eslint-disable-next-line
  },[])
  //get-all-categories
  const getAllCategory = async()=>{
    try {
      const {data}= await axios.get('http://localhost:8080/api/v1/category/get-category');
      if(data?.success)setCategories(data?.category);

    } 
    catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting categories')
    }
  }
  useEffect(()=>{
    getAllCategory();
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name',name);
      productData.append('description',description);
      productData.append('price',price);
      productData.append('quantity',quantity);
      productData.append('category',category);
      photo && productData.append('photo',photo);
      productData.append('shipping',shipping);

      const {data} = axios.put(`http://localhost:8080/api/v1/product/update-product/${id}`, productData)

      if(data?.success){
        
        toast.error(data?.message);
      }
      else{
        toast.success('Product Updated Successfully')
        navigate('/dashboard/admin/products');
      }
      
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in creating product')
    }
  }
//delete product

const handleDelete= async()=>{
    try {
        let answer = window.prompt('Are you sure you want to delete this product?')
        if(!answer) return;
        const{data}= await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`);
        toast.success('Product Deleted Successfully')
        navigate('/dashboard/admin/products');
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong in deleting product')
    }
}

  return (
    <Layout  title={'Dashboard - Update Product'}>
              <div className="container-fluid m-3 p-3">

    <div className="row">

        <div className="col-md-3">
            <AdminMenu/>
        </div>

        <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select 
                bordered={false} 
                placeholder='Select a Category' 
                size='large' 
                showSearch 
                className='form-select mb-3' 
                onChange={(value)=>{setCategory(value)}}
                value={category} 
                >
                    {categories.map(c =>(
                    <Option key={c._id} value={c._id}> {c.name} </Option>
                    ))}
              </Select>

              <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img src={URL.createObjectURL(photo)} alt="productPhoto" height={'200px'} className='img img-responsive'/>
                </div>
              ):(
                <div className="text-center">
                  <img src={`http://localhost:8080/api/v1/product/product-photo/${id}`} alt="productPhoto" height={'200px'} className='img img-responsive'/>
                </div>
              )}
            </div>
              <div className="mb-3">
                <input type="text" 
                       value={name} 
                       placeholder='Name'
                       className='form-control'
                       onChange={(e)=>setname(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="text" 
                       value={description} 
                       placeholder='Description'
                       className='form-control'
                       onChange={(e)=>setDescription(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="number" 
                       value={price} 
                       placeholder='Price in Rupees'
                       className='form-control'
                       onChange={(e)=>setPrice(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="number" 
                       value={quantity} 
                       placeholder='Quantity'
                       className='form-control'
                       onChange={(e)=>setQuantity(e.target.value)} />
              </div>
              <div className="mb-3">
                <Select 
                      bordered={false}
                      placeholder='Select Shipping Method' 
                      size='large'
                      showSearch 
                      className='form-select mb-3' 
                      onChange={(value)=>setShipping(value)}
                      value={shipping?"yes":"no"}
                      //onBlur={(e)=>e.target.blur()}
                >
                      <Option value='0'>No</Option>
                      <Option value='1'>Yes</Option>
               </Select>
              </div>
              <div className="mb-3">
                <button className='btn btn-primary' onClick={handleSubmit}>
                  Update Product
                </button>
              </div>
              <div className="mb-3">
                <button className='btn btn-danger' onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
        </div>
        
    </div>
    </div>
</Layout>
  )
}

export default UpdateProduct
