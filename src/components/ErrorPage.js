import Hero from "./Hero";

const ErrorPage = () => {
    return(
        <>
            <Hero text = 'Error 404: Page not found'/>
            <p className="about"
            // style={{position: "relative", top: "200px", left: "0", width: "100%", zIndex: "999"}}
            >Make sure to follow a valid address</p>
        </>
    )
}

export default ErrorPage;