import "../styles/Home.css";
import Header from "../components/Header";
import HomePresentation from "../components/Home/HomePresentation";
import HomeAdvantages from "../components/Home/HomeAdvantages";
import HomeServices from "../components/Home/HomeServices";
import HomeMessage from "../components/Home/HomeMessage";
import HomeStandards from "../components/Home/HomeStandards";
import HomeContactMessage from "../components/Home/HomeContactMessage";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="Main">
      <div className="Main__Brown">
        <section className="Main__Presentation">
          <Header />
          <HomePresentation />
        </section>
      </div>
      <div className="Main__White">
        <HomeAdvantages />
      </div>
      <div className="Main__Brown">
        <HomeServices />
      </div>
      <div className="Main__White">
        <HomeMessage />
      </div>
      <div className="Main__Brown">
        <HomeStandards />
      </div>
      <div className="Main__White">
        <HomeContactMessage />
      </div>
      <div className="Main__Brown">
        <Footer />
      </div>
    </main>
  );
}
