const Hero = ({text, backdrop }) => {
    return(
        <header className="bg-secondary text-white p-4 hero-container"
        // style={{position: "fixed", top: "55px", left: "0", width: "100%", zIndex: "999"}}
        >

            <h1 className="hero-text">{text}</h1>
            {backdrop &&
                <div className="hero-backdrop" style={{backgroundImage: `url(${backdrop})`}}></div>
            }
            
        </header>
    )
}

export default Hero;