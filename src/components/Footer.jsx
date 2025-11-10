import React from "react";

const Footer = () => {
  return (
    <div className="h-screen text-[16px] text-gray-600">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="text-lg font-semibold underline">
            Questions? Contact us.
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-8 mb-8">
       
          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium">Support</li>
              <li>FAQ</li>
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Report a Problem</li>
            </ul>
          </div>
      
          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium">Your Account</li>
              <li>Sign In</li>
              <li>Create Account</li>
              <li>Your Devices</li>
              <li>Email Preferences</li>
            </ul>
          </div>

          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium">Information</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Terms of Use</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium">For Media</li>
              <li>Press Releases</li>
              <li>Official Blog</li>
              <li>Events</li>
              <li>Brand Guidelines</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <div>Netflix Italia</div>
          <div className="mt-2">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <span className="text-blue-500 underline ml-1">Learn more.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
