import Hero from "./Hero";

const AboutView = () => {
    return(
        <>
            <Hero text = 'Learn about us' backdrop = {`https://i0.hippopx.com/photos/977/573/114/movies-dark-red-movie-theatre-chair-preview.jpg`}/>
            <p className="about"
            // style={{position: "relative", top: "200px", left: "0", width: "100%", zIndex: "999"}}
            >This started as a small learning project to get myself familiar with front-end
                development tools and practices. The goal is to expand this as I keep learning.
                I hope this browser provides a practical and pleasant experience !
            </p>
        </>
    )
}

export default AboutView;