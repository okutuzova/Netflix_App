/**
 * Footer component for the application.
 * 
 * Features:
 * - Static links grouped by category (Support, Account, Info, Media)
 * - Header section with contact info
 * - Footer note with copyright and reCAPTCHA info
 * - Fully responsive with Tailwind CSS
 * 
 * Usage:
 * <Footer />
 */
const Footer = () => {
  return (
    <div className="bg-[#141414] text-gray-400 text-[16px] w-full">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-lg font-semibold text-gray-300 underline">
            Questions? Contact us.
          </div>
        </div>

        {/* Links */}
        <div className="flex justify-center flex-wrap gap-8 mb-8">
          <div className="w-[200px]">
            <ul className="space-y-2 list-none ">
              <li className="font-medium text-white hover:underline">
                Support
              </li>
              <li className="hover:underline">FAQ</li>
              <li className="hover:underline">Help Center</li>
              <li className="hover:underline">Contact Us</li>
              <li className="hover:underline">Report a Problem</li>
            </ul>
          </div>

          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium text-white hover:underline">
                Your Account
              </li>
              <li className="hover:underline">Sign In</li>
              <li className="hover:underline">Create Account</li>
              <li className="hover:underline">Your Devices</li>
              <li className="hover:underline">Email Preferences</li>
            </ul>
          </div>

          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium text-white hover:underline">
                Information
              </li>
              <li className="hover:underline">About Us</li>
              <li className="hover:underline">Careers</li>
              <li className="hover:underline">Terms of Use</li>
              <li className="hover:underline">Privacy Policy</li>
            </ul>
          </div>

          <div className="w-[200px]">
            <ul className="space-y-2 list-none">
              <li className="font-medium text-white hover:underline">
                For Media
              </li>
              <li className="hover:underline">Press Releases</li>
              <li className="hover:underline">Official Blog</li>
              <li className="hover:underline">Events</li>
              <li className="hover:underline">Brand Guidelines</li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <div>Netflix by Mayte & Olga</div>
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
