import "./Salers.css"
import picture from "../../assets/picture2.png"
function Salers() {
    return (
      <div className="Saler">
         <div className="leftSaler">
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, quibusdam.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum necessitatibus dolore a consequuntur, error similique. Quisquam deserunt omnis itaque expedita?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores corporis eaque quae esse tenetur aliquid incidunt veniam laudantium ad error!</p>
                <button className="btnheader">Shop now</button>
            </div>
            <div className="rightSaler">
                <img src={picture} alt="headerimg"  className="imageSaler"/>
            </div>
           
          </div>
     
    );
}
export default Salers;