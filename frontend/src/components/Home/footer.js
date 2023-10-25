
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = ()=>{
    return (
        <div className="footer" >
            <div className="footer-content">
                <i className="fa-brands fa-linkedin fa-xl footer-img"></i>
                <Link href="https://www.linkedin.com/in/yinyin-huang" className="footer-link clickable">Linkedin</Link>
            </div>
            <div className="footer-content">
                <i className="fa-brands fa-square-github fa-xl footer-img"></i>
                <Link href="https://github.com/elevenstand7" className="footer-link clickable">GitHub</Link>
            </div>
        </div>

    )

}

export default Footer;
