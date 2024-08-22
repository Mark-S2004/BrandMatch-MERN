import PropTypes from "prop-types"
import Marquee from "react-fast-marquee"

const ImageMarquee = ({ images }) => {
  return (
    <Marquee pauseOnClick={true} speed={25}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${image} logo`}
          className="m-4 object-contain max-h-16"
        />
      ))}
    </Marquee>
  )
}

ImageMarquee.propTypes = {
  images: PropTypes.arrayOf(PropTypes.any),
}

export default ImageMarquee
