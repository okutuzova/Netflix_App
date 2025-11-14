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
              <li>
                <a href="/sign-in" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/create-account" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/your-devices" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/email-preferences" className="hover:underline">
                  Report a Problem
                </a>
              </li>
            </ul>
          </div>

          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium">Your Account</li>
              <li>
                <a href="/sign-in" className="hover:underline">
                  Sign In
                </a>
              </li>
              <li>
                <a href="/create-account" className="hover:underline">
                  Create Account
                </a>
              </li>
              <li>
                <a href="/your-devices" className="hover:underline">
                  Your Devices
                </a>
              </li>
              <li>
                <a href="/email-preferences" className="hover:underline">
                  Email Preferences
                </a>
              </li>
            </ul>
          </div>

          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium">Information</li>
              <li>
                <a href="/sign-in" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/create-account" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="/your-devices" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/email-preferences" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium">For Media</li>
              <li>
                <a href="/sign-in" className="hover:underline">
                  Press Releases
                </a>
              </li>
              <li>
                <a href="/create-account" className="hover:underline">
                  Official Blog
                </a>
              </li>
              <li>
                <a href="/your-devices" className="hover:underline">
                  Events
                </a>
              </li>
              <li>
                <a href="/email-preferences" className="hover:underline">
                  Brand Guidelines
                </a>
              </li>
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
