import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import {Toaster} from "react-hot-toast";

const Layout = ({children,title, description, keywords, author}) => {
  return (
    <div>
      <Header/>

        <Helmet>
                <meta charSet="utf-8" />


  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="description" content={author}/>



                <title>{title}</title>
        </Helmet>
      <main style={{minHeight:"70vh"}}>
        <Toaster/>
        {children}

      </main>
      <Footer/>
    </div>
  )
}

Layout.defaultProps = {
  title:"Ecommerce App - Shop Now",
  description:'mern stack project',
  keywords:'mern, react, node, mongoDb',
  author: "Techinfoyt"
}
export default Layout
