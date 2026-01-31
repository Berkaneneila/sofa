
import "./Blog.css";
import CardBlog from "./Cartblog";
import picture1 from "../../assets/Image Holder (1).png";
function Blog() {
    return (
       <div className="blog"id ="blog">
        <h2 className="title-blog"> Our Blog</h2>
        <div className="allblog">
             <CardBlog 
        logo={picture1}
        title="The Health Benefits of Tea"      
        text="Discover the numerous health benefits of tea, from boosting your immune system to improving digestion. Learn how different types of tea can enhance your well-being.health benefits of tea, from boosting your immune system to improving digestion. Learn how different types of tea can enhance your well-being."
        buttonText="Read More"/>
          <CardBlog 
        logo={picture1}
        title="The Health Benefits of Tea"      
        text="Discover the numerous health benefits of tea, from boosting your immune system to improving digestion. Learn how different types of tea can enhance your well-being.health benefits of tea, from boosting your immune system to improving digestion. Learn how different types of tea can enhance your well-being."
        buttonText="Read More"/>
        </div>
       

       </div>
    )
}
export default Blog;