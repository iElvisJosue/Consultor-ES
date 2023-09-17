import "../styles/About.css";
import Header from "../components/Header";
import AboutPresentation from "../components/About/AboutPresentation";
import AboutBusiness from "../components/About/AboutBusiness";
import AboutAdvantages from "../components/About/AboutAdvantages";
import AboutCosts from "../components/About/AboutCosts";
import AboutInformation from "../components/About/AboutInformation";
import Footer from "../components/Footer";

export default function About() {
  return (
    <main className="Main__About">
      <div className="Main__About__Brown">
        <section className="Main__About__Presentation">
          <Header />
          <AboutPresentation />
        </section>
      </div>
      <div className="Main__About__White">
        <AboutBusiness />
      </div>
      <div className="Main__About__Brown">
        <AboutAdvantages />
      </div>
      <div className="Main__About__White">
        <AboutCosts />
      </div>
      <div className="Main__About__Brown">
        <AboutInformation content="1" />
      </div>
      <div className="Main__About__White">
        <AboutInformation content="2" />
      </div>
      <div className="Main__About__Brown">
        <Footer />
      </div>
    </main>
  );
}
