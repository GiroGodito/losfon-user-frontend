// // src/pages/HomePage.tsx
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Button } from '../components/common/Button';

// export const HomePage = () => {
//   const { isAuthenticated } = useAuth();

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
//       <div className="text-center max-w-2xl">
//         {/* Logo/Icon */}
//         <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-2xl mb-6 border border-green-500/20">
//           <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
//           </svg>
//         </div>
        
//         <h1 className="text-5xl font-bold text-white mb-4">
//           LosFon Public
//         </h1>
//         <p className="text-xl text-gray-400 mb-8">
//           Report lost items and get notified when they're found.
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           {isAuthenticated ? (
//             <Link to="/dashboard">
//               <Button variant="primary" size="lg" className="px-8">
//                 Go to Dashboard
//               </Button>
//             </Link>
//           ) : (
//             <>
//               <Link to="/login">
//                 <Button variant="primary" size="lg" className="px-8">
//                   Sign In
//                 </Button>
//               </Link>
//               <Link to="/register">
//                 <Button variant="outline" size="lg" className="px-8">
//                   Create Account
//                 </Button>
//               </Link>
//             </>
//           )}
//         </div>
        
//         {/* Feature badges */}
//         <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
//           <span className="flex items-center gap-2">
//             <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//             Secure
//           </span>
//           <span className="flex items-center gap-2">
//             <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//             Encrypted
//           </span>
//           <span className="flex items-center gap-2">
//             <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//             Protected
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
// src/pages/HomePage.tsx
// src/pages/HomePage.tsx
// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { 
  MagnifyingGlassIcon,
  BellIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  ArrowRightIcon,
  RocketLaunchIcon,
  SparklesIcon,
  HeartIcon,
  DocumentTextIcon,
  PhotoIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: DocumentTextIcon,
      title: 'Report Lost Items',
      description: 'Submit detailed reports with descriptions, locations, and images to maximize your chances of recovery.'
    },
    {
      icon: BellIcon,
      title: 'Real-time Notifications',
      description: 'Get instant alerts when there are updates on your reports or when someone finds a matching item.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Simple Claim Process',
      description: 'Follow our straightforward claim process with clear instructions and verification steps.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Private',
      description: 'Your personal information is protected with enterprise-grade encryption and security best practices.'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Available 24/7',
      description: 'Access your reports and notifications anytime, anywhere from any device with internet access.'
    },
    {
      icon: UserGroupIcon,
      title: 'Growing Community',
      description: 'Be one of the first users to help build a community that looks out for each other\'s belongings.'
    }
  ];

  const steps = [
    {
      icon: DocumentTextIcon,
      title: 'Report',
      description: 'Fill out a detailed report about your lost item with description and optional photos.'
    },
    {
      icon: BellIcon,
      title: 'Track',
      description: 'Monitor your report status in real-time and get notified about any matches or updates.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Recover',
      description: 'Follow the verification process to claim your item once it\'s been found'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* ============ NAVBAR ============ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <div className="
                w-8 h-8 sm:w-10 sm:h-10 
                bg-green-500/10 backdrop-blur-sm 
                border border-green-500/20 
                rounded-xl 
                flex items-center justify-center 
                group-hover:bg-green-500/20
                group-hover:border-green-500/30
                group-hover:scale-105
                transition-all duration-300
              ">
                <span className="text-green-400 font-bold text-sm sm:text-lg group-hover:text-green-300 transition-colors">
                  LF
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-lg sm:text-xl tracking-tight">
                  LosFon
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                How It Works
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="glass-green" size="sm" className="font-medium px-3 sm:px-5 text-xs sm:text-sm">
                    Dashboard
                    <ArrowRightIcon className="w-2 h-2 ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white px-2 sm:px-4 text-xs sm:text-sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="glass-green" size="sm" className="font-medium px-3 sm:px-5 text-xs sm:text-sm">
                      Get Started
                      <ArrowRightIcon className="w-2 h-2 ml-2" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 sm:pt-20 overflow-hidden px-4 sm:px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-green-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-48 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-purple-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1]">
              Lost Something?
              <br />
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Let's Find It Together.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl pt-4 sm:pt-5 pb-4 sm:pb-5 px-2 sm:px-0">
              A modern platform designed to help you report lost items and 
              connect with finders. <span className="text-green-400 font-medium">Be part of the first community </span> 
              making lost and found effortless.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0">
              {isAuthenticated ? (
                <Link to="/report" className="w-full sm:w-auto">
                  <Button variant="glass-green" size="lg" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold group">
                    Report Lost Item
                    <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="w-full sm:w-auto">
                    <Button variant="glass-green" size="lg" className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold group">
                      Get Started
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/login" className="w-full sm:w-auto">
                    <Button variant="glass-grey" size="lg" className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-6 sm:pt-8 px-2 sm:px-0">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                <ShieldCheckIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="hidden xs:block w-px h-4 sm:h-5 bg-gray-700" />
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                <ClockIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                <span>Real-time Updates</span>
              </div>
              <div className="hidden xs:block w-px h-4 sm:h-5 bg-gray-700" />
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                <HeartIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                <span>Built with Care</span>
              </div>
            </div>

            {/* Honest Note */}
            <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 sm:gap-3 bg-gray-800/50 border border-gray-700/50 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 max-w-full mx-2 sm:mx-0">
              <RocketLaunchIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
              <p className="text-[10px] sm:text-xs text-gray-500">
                🚀 We're new! Be among the first users and help shape the future of lost and found.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section id="features" className="py-16 sm:py-20 md:py-24 bg-gray-900/30 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-green-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Features
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3">
              Everything You Need to Recover Your Items
            </h2>
            <p className="text-gray-400 mt-3 sm:mt-4 text-base sm:text-lg pt-3 sm:pt-5 px-2 sm:px-0">
              Built with simplicity and effectiveness in mind — every feature designed to help you get your items back.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-6 md:p-7 hover:border-green-500/30 hover:bg-gray-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/5"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-green-500/20 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 group-hover:text-green-300 transition-colors" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS - PROFESSIONALLY PLACED ============ */}
      <section id="how-it-works" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
        {/* Subtle Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {/* <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-4">
              <SparklesIcon className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
                Simple Process
              </span>
            </div> */}
            <span className="text-green-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              Process
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3">
              Simple, Convenient, Efficient
            </h2>
            {/* <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mt-4" /> */}
            <p className="text-gray-400 mt-4 text-base sm:text-lg px-2 sm:px-0 pb-5 pt-5">
              Follow the 3 simple steps as shown below
            </p>
          </div>

          {/* Steps with Professional Layout */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500/20 via-green-500/40 to-green-500/20" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 relative">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Step Card */}
                  <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 text-center hover:border-green-500/30 hover:bg-gray-800/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/5">
                    {/* Step Number - Positioned Outside */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25">
                        <span className="text-white font-bold text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:bg-green-500/20 transition-colors duration-300 mt-4">
                      <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-green-400 group-hover:text-green-300 transition-colors" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2.5">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>

                    {/* Decorative Arrow - Desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-gray-700">
                        <ArrowRightIcon className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Mobile Separator */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center py-2">
                      <div className="w-0.5 h-8 bg-gradient-to-b from-green-500/30 to-green-500/10" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Note */}
          <div className="max-w-2xl mx-auto mt-12 sm:mt-16 px-2 sm:px-0">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-5 text-center hover:border-green-500/20 transition-colors duration-300">
              <p className="text-xs sm:text-sm text-gray-400">
                💡 <span className="text-gray-300 font-medium">We're just getting started.</span> 
                Your reports and feedback will help us improve and grow the community. 
                <span className="text-green-400 font-medium"> Every report counts.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-gray-950 border-t border-gray-800/50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs sm:text-sm">© 2026 LosFon</span>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400" />
                Secure
              </span>
              <span className="flex items-center gap-1.5">
                <RocketLaunchIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400" />
                New
              </span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
                </span>
                Live
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;