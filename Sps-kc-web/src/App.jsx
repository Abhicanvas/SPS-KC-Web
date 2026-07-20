import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO/SEO";
import { getFullUrl } from "./config/siteConfig";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/footer/footer";
import HomePage from "./components/Home/home";
import AllEvents from "./components/Event/allEvents";
import Newsletter from "./components/Newsletter/newsletter";
import Sbc from "./components/SBC/sbc";
import Awards from "./components/Awards/award";
import Achievements from "./components/Awards/achievements";
import PastTeam from "./components/Execom/pastTeam";
import Team from "./components/Execom/team";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SEO
                  title="IEEE SPS Kerala Chapter - Signal Processing Society"
                  description="IEEE SPS Kerala Chapter promotes excellence in signal processing education, research, and technology in Kerala. Join our community of professionals, students, and researchers."
                  url={getFullUrl("/")}
                />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/team"
            element={
              <>
                <SEO
                  title="Team"
                  description="Meet the IEEE SPS Kerala Chapter team and learn more about the chapter members."
                  url={getFullUrl("/team")}
                />
                <Team />
              </>
            }
          />
          <Route
            path="/execom-25"
            element={
              <>
                <SEO
                  title="Office Bearers 2025"
                  description="Meet the current office bearers and team members of IEEE SPS Kerala Chapter for 2025."
                  url={getFullUrl("/execom-25")}
                />
                <PastTeam year={2025} />
              </>
            }
          />
          <Route
            path="/execom-23"
            element={
              <>
                <SEO
                  title="Office Bearers 2023"
                  description="Meet the office bearers and team members of IEEE SPS Kerala Chapter for 2023."
                  url={getFullUrl("/execom-23")}
                />
                <PastTeam year={2023} />
              </>
            }
          />
          <Route
            path="/execom-24"
            element={
              <>
                <SEO
                  title="Office Bearers 2024"
                  description="Meet the office bearers and team members of IEEE SPS Kerala Chapter for 2024."
                  url={getFullUrl("/execom-24")}
                />
                <PastTeam year={2024} />
              </>
            }
          />
          <Route
            path="/execom-22"
            element={
              <>
                <SEO
                  title="Office Bearers 2022"
                  description="Meet the office bearers and team members of IEEE SPS Kerala Chapter for 2022."
                  url={getFullUrl("/execom-22")}
                />
                <PastTeam year={2022} />
              </>
            }
          />
          <Route
            path="/execom-21"
            element={
              <>
                <SEO
                  title="Office Bearers 2021"
                  description="Meet the office bearers and team members of IEEE SPS Kerala Chapter for 2021."
                  url={getFullUrl("/execom-21")}
                />
                <PastTeam year={2021} />
              </>
            }
          />
          <Route
            path="/events"
            element={
              <>
                <SEO
                  title="Events"
                  description="Discover upcoming and past events organized by IEEE SPS Kerala Chapter. Join us for workshops, seminars, and technical sessions."
                  url={getFullUrl("/events")}
                />
                <AllEvents />
                <Footer />
              </>
            }
          />
          <Route
            path="/newsletter"
            element={
              <>
                <SEO
                  title="Newsletter"
                  description="Stay updated with IEEE SPS Kerala Chapter newsletter featuring latest news, events, and achievements."
                  url={getFullUrl("/newsletter")}
                />
                <Newsletter />
              </>
            }
          />
          <Route
            path="/sbc"
            element={
              <>
                <SEO
                  title="Student Branch Chapters"
                  description="Explore IEEE SPS Student Branch Chapters under Kerala Chapter and their activities."
                  url={getFullUrl("/sbc")}
                />
                <Sbc />
              </>
            }
          />
          <Route
            path="/awards"
            element={
              <>
                <SEO
                  title="Awards"
                  description="Recognition and awards received by IEEE SPS Kerala Chapter members and the chapter itself."
                  url={getFullUrl("/awards")}
                />
                <Awards />
              </>
            }
          />
          <Route
            path="/achievements"
            element={
              <>
                <SEO
                  title="Achievements"
                  description="Major achievements and milestones of IEEE SPS Kerala Chapter and its members."
                  url={getFullUrl("/achievements")}
                />
                <Achievements />
              </>
            }
          />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
