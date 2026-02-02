import React from 'react';
import { FiPhone, FiMapPin, FiClock, FiStar } from 'react-icons/fi';
import Button from '../components/Button';

const AboutUsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">
        About Goyal Textiles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12">

        {/* Left Column */}
        <div className="md:col-span-3 space-y-8">
          <section>
            <h2 className="text-2xl font-display font-bold text-primary-blue mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Goyal Textiles is a family-run business with deep roots in the textile
              industry. For over 30 years, we have been dedicated to providing our
              customers with premium fabrics and personalized service. Our physical
              store, located in the heart of the textile market, has been a trusted
              destination for designers, tailors, and families alike.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-primary-blue mb-4">
              Our Commitment
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We believe in the value of quality and trust. Our experience allows us
              to hand-pick a curated selection of suiting, shirting, kurta, and pant
              fabrics that meet our high standards. While our online store showcases
              a selection of our finest materials, our physical inventory is
              constantly updated with new and unique designs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-primary-blue mb-4">
              Contact & Visit Us
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-primary-blue mt-1" size={20} />
                <div>
                  <p className="font-semibold">GOYAL TEXTILES</p>
                  <p className="text-gray-600">556, Katra Neel, Chandni Chowk</p>
                  <p className="text-gray-600">Delhi - 110006, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-primary-blue" size={20} />
                <a
                  href="tel:+919810777391"
                  className="text-gray-600 hover:text-primary-blue hover:underline"
                >
                  +91 98107 77391
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiClock className="text-primary-blue" size={20} />
                <p className="text-gray-600">
                  Mon - Sat: 10:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-8">

          <section>
            <h2 className="text-2xl font-display font-bold text-primary-blue mb-4">
              Our Location
            </h2>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3501.045682531122!2d77.2259541!3d28.6583508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd08dbc451fd%3A0x30a05a53dec40cea!2sGoyal%20Textiles!5e0!3m2!1sen!2sin!4v1770025899616!5m2!1sen!2sin"
              className="w-full h-[200px] border-0 rounded-lg shadow-md"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Goyal Textiles Location"
            />
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-primary-blue mb-4">
              Customer Reviews
            </h2>

            <div className="bg-white p-6 border border-gray-200/80 rounded-lg text-center shadow-md">
              <p className="text-gray-600 mb-1">Our customers have rated us</p>

              <div className="flex items-center justify-center gap-2">
                <p className="text-3xl font-bold text-gray-800">4.9</p>
                <div className="flex text-yellow-500">
                  <FiStar fill="currentColor" />
                  <FiStar fill="currentColor" />
                  <FiStar fill="currentColor" />
                  <FiStar fill="currentColor" />
                  <FiStar fill="currentColor" />
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                based on 100+ Google reviews
              </p>

              <a
                href="https://www.google.com/maps/place/Goyal+Textiles/@28.6583508,77.2259541,17z/data=!4m8!3m7!1s0x390cfd08dbc451fd:0x30a05a53dec40cea!8m2!3d28.6583508!4d77.2259541!9m1!1b1!16s%2Fg%2F11c5q4d2xv?hl=en&entry=ttu#lrd=0x390cfd08dbc451fd:0x30a05a53dec40cea,1"
                target="_blank"
                rel="noopener noreferrer"
              >

                <Button variant="secondary">
                  Read our Reviews on Google
                </Button>
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
