import "./Footer.css"
function Footer(){

    return(
       <div className="content-footer">
        <div className="right-footer">
            <h2>NorthStar</h2><br></br>
            <p id="writing">We help you find <br></br>your dream plant</p><br></br>
            <div className="logos-footer">
             <div className="logose"><i class="fa-brands fa-facebook"></i></div>
            <div className="logose"><i class="fa-brands fa-instagram"></i></div>
            <div className="logose"><i class="fa-brands fa-twitter"></i></div>
            </div>
         

        </div>
        <div className="left-footer">
           
         <ul>
        <li>Information</li><br></br>
         <li>About</li>
         <li>Product</li>
         <li>Blog</li>
         </ul>

         
         <ul>
            <li>Information</li><br></br>
         <li>About</li>
         <li>Product</li>
         <li>Blog</li>
         </ul>

         <ul>
            <li>Information</li><br></br>
         <li>About</li>
         <li>Product</li>
         <li>Blog</li>
         </ul>

        </div >
        


       </div>
    )
}
export default Footer