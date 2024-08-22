import Hero from "../Components/Hero"
import WithFadeIn from "../Components/WithFadeIn"
import AboutUs from "../Components/AboutUs"
import HowToStart from "../Components/HowToStart"
import KeyFeatures from "../Components/KeyFeatures"
import Testimonials from "../Components/Testimonials"
import SuccessPartnersMarquee from "../Components/Marquee/SuccessPartnersMarquee"

const FadedHero = WithFadeIn(Hero)

const LandingPage = () => {
  return (
    <main>
      <FadedHero />
      <KeyFeatures />
      <SuccessPartnersMarquee />
      <AboutUs />
      <Testimonials />
      <HowToStart />
    </main>
  )
}

export default LandingPage
