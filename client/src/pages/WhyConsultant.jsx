import "../styles/WhyConsultant.css";
import Header from "../components/Header";
import WhyConsultantPresentation from "../components/WhyConsultant/WhyConsultantPresentation";
import WhyConsultantHelp from "../components/WhyConsultant/WhyConsultantHelp";
import WhyConsultantMessage from "../components/WhyConsultant/WhyConsultantMessage";
import WhyConsultantAdvantages from "../components/WhyConsultant/WhyConsultantAdvantages";
import WhyConsultantInnovation from "../components/WhyConsultant/WhyConsultantInnovation";
import Footer from "../components/Footer";

export default function WhyConsultant() {
  return (
    <main className="Main__WhyConsultant">
      <div className="Main__WhyConsultant__Brown">
        <section className="Main__WhyConsultant__Presentation">
          <Header />
          <WhyConsultantPresentation />
        </section>
      </div>
      <div className="Main__WhyConsultant__White">
        <WhyConsultantHelp />
      </div>
      <div className="Main__WhyConsultant__Brown">
        <WhyConsultantMessage content="1" />
      </div>
      <div className="Main__WhyConsultant__White">
        <WhyConsultantMessage content="2" />
      </div>
      <div className="Main__WhyConsultant__Brown">
        <WhyConsultantAdvantages />
      </div>
      <div className="Main__WhyConsultant__White">
        <WhyConsultantInnovation />
      </div>
      <div className="Main__WhyConsultant__Brown">
        <Footer />
      </div>
    </main>
  );
}
