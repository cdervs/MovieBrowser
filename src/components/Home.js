import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <Hero text="Welcome to ReelHunter" backdrop={`https://img.lovepik.com/bg/20240103/Empty-Movie-Theater-with-Vibrant-Red-Seats-A-Captivating-Background_2679101_wh860.jpg!/fw/860`}/>
      <p className="about"
      // style={{position: "relative", top: "200px", left: "0", width: "100%", zIndex: "999"}}
      >This is a humble movie browser for an ongoing personal project.
        Feel free to search your favorite movies and look up all sorts of
        information about them !
      </p>
    </>
  );
};

export default Home;
