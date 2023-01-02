import "./Banner.css"
import banner from "../img/banner2.png"

function BannerWhite(){
    return(
        <div class="bannerBox">
            <img src={banner} alt="researcherBanner" class="banner"></img>
        </div>
    );
}

export default BannerWhite;