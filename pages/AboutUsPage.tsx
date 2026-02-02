import React from 'react';
import { FiPhone, FiMapPin, FiClock, FiStar } from 'react-icons/fi';
import * as ReactRouterDOM from 'react-router-dom';
import Button from '../components/Button';

const AboutUsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-display font-bold text-primary-blue mb-4">
          About Goyal Textiles
        </h1>
        <div className="h-1.5 w-16 bg-gradient-to-r from-primary-blue/80 to-transparent mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8 animate-fade-in-up">
          <section>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary-blue mb-4">
              Our Story
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Goyal Textiles is a family-run business with deep roots in the textile
              industry. For over 30 years, we have been dedicated to providing our
              customers with premium fabrics and personalized service. Our physical
              store, located in the heart of the textile market, has been a trusted
              destination for designers, tailors, and families alike.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary-blue mb-4">
              Our Commitment
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              We believe in the value of quality and trust. Our experience allows us
              to hand-pick a curated selection of suiting, shirting, kurta, and pant
              fabrics that meet our high standards. While our online store showcases
              a selection of our finest materials, our physical inventory is
              constantly updated with new and unique designs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary-blue mb-6">
              Visit Us In Person
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50/50 transition-colors duration-300">
                <FiMapPin className="text-primary-blue mt-0.5 flex-shrink-0" size={22} />
                <div>
                  <p className="font-bold text-gray-900 text-lg">GOYAL TEXTILES</p>
                  <p className="text-base text-gray-600 mt-1">556, Katra Neel, Chandni Chowk</p>
                  <p className="text-base text-gray-600">Delhi - 110006, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-50/50 transition-colors duration-300">
                <FiPhone className="text-primary-blue flex-shrink-0" size={22} />
                <a
                  href="tel:+919810777391"
                  className="text-base text-gray-600 hover:text-primary-blue hover:underline transition-all duration-250 ease-out font-medium"
                >
                  +91 98107 77391
                </a>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-50/50 transition-colors duration-300">
                <FiClock className="text-primary-blue flex-shrink-0" size={22} />
                <p className="text-base text-gray-600 font-medium">
                  Mon - Sat: 10:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>

          <section>
            <h2 className="text-2xl font-display font-bold text-primary-blue mb-4">
              Our Location
            </h2>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3501.045682531122!2d77.2259541!3d28.6583508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd08dbc451fd%3A0x30a05a53dec40cea!2sGoyal%20Textiles!5e0!3m2!1sen!2sin!4v1770025899616!5m2!1sen!2sin"
              className="w-full h-[280px] border-0 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
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

            <div className="bg-gradient-to-br from-white to-blue-50/40 p-6 border border-blue-100/70 rounded-xl text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <p className="text-gray-600 mb-4 text-sm font-medium">Trusted by customers worldwide</p>

              <div className="flex items-center justify-center gap-3 mb-3">
                <p className="text-4xl font-bold text-primary-blue">4.9</p>
                <div className="flex text-yellow-400 gap-1">
                  <FiStar fill="currentColor" size={20} />
                  <FiStar fill="currentColor" size={20} />
                  <FiStar fill="currentColor" size={20} />
                  <FiStar fill="currentColor" size={20} />
                  <FiStar fill="currentColor" size={20} />
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-6 font-medium">
                Based on 100+ Google reviews
              </p>

              <a
                href="https://www.google.com/maps/place/Goyal+Textiles/@28.6583508,77.2259541,17z/data=!4m8!3m7!1s0x390cfd08dbc451fd:0x30a05a53dec40cea!8m2!3d28.6583508!4d77.2259541!9m1!1b1!16s%2Fg%2F11c5q4d2xv?hl=en&entry=ttu#lrd=0x390cfd08dbc451fd:0x30a05a53dec40cea,1"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="secondary" className="text-xs sm:text-sm">
                  Read our Reviews on Google
                </Button>
              </a>
            </div>
          </section>

        </div>
      </div>

      {/* Policies Section */}
      <div className="mt-8 py-8 border-t border-gray-200/80 bg-gradient-to-br from-off-white/40 to-off-white/20 rounded-2xl px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-primary-blue mb-4">
              Our Policies
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              To understand more about how we operate and protect your rights, review our comprehensive policies:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ReactRouterDOM.Link to="/privacy-policy" className="block group">
              <div className="p-5 bg-white rounded-xl border border-gray-200/70 group-hover:border-primary-blue group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 text-center cursor-pointer">
                <p className="text-primary-blue font-bold text-lg group-hover:text-blue-900 transition-colors duration-300">Privacy Policy</p>
              </div>
            </ReactRouterDOM.Link>
            
            <ReactRouterDOM.Link to="/terms-of-service" className="block group">
              <div className="p-5 bg-white rounded-xl border border-gray-200/70 group-hover:border-primary-blue group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 text-center cursor-pointer">
                <p className="text-primary-blue font-bold text-lg group-hover:text-blue-900 transition-colors duration-300">Terms of Service</p>
              </div>
            </ReactRouterDOM.Link>
            
            <ReactRouterDOM.Link to="/returns-policy" className="block group">
              <div className="p-5 bg-white rounded-xl border border-gray-200/70 group-hover:border-primary-blue group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 text-center cursor-pointer">
                <p className="text-primary-blue font-bold text-lg group-hover:text-blue-900 transition-colors duration-300">Returns & Refunds</p>
              </div>
            </ReactRouterDOM.Link>
            
            <ReactRouterDOM.Link to="/shipping-policy" className="block group">
              <div className="p-5 bg-white rounded-xl border border-gray-200/70 group-hover:border-primary-blue group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 text-center cursor-pointer">
                <p className="text-primary-blue font-bold text-lg group-hover:text-blue-900 transition-colors duration-300">Shipping Policy</p>
              </div>
            </ReactRouterDOM.Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
