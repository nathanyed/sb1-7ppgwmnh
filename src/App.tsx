import React from 'react';
import { ArrowRight, Bot, TrendingUp, Zap, Target, Users, CheckCircle, Calendar, Mail, Phone } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Flowmint</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a>
              <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
            </nav>
            <a 
              href="https://calendly.com/flowmint1ai/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Book Free Call
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Grow Smarter with 
              <span className="text-blue-400"> AI </span>+
              <span className="text-teal-400"> Brand Scaling</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              We build AI systems and marketing strategies that help your business scale faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://calendly.com/flowmint1ai/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-500 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                Book a Free Strategy Call
                <ArrowRight className="h-5 w-5" />
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>30-minute consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Core Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Two powerful service areas that work together to accelerate your business growth
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* AI & Automation */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-700 hover:border-blue-500/50">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4 border border-blue-500/30">
                  <Bot className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">AI & Automation</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                Transform your business operations with intelligent automation that works 24/7
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Custom AI Agent Development</h4>
                    <p className="text-gray-400 text-sm">Lead capture, scheduling, and customer support agents</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Business Process Automation</h4>
                    <p className="text-gray-400 text-sm">Internal workflow automation and system integrations</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Chatbots & Voice Agents</h4>
                    <p className="text-gray-400 text-sm">CRM-connected, 24/7 customer support solutions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Scaling */}
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl hover:shadow-teal-500/10 transition-all duration-300 border border-gray-700 hover:border-teal-500/50">
              <div className="flex items-center mb-6">
                <div className="bg-teal-600/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4 border border-teal-500/30">
                  <Target className="h-6 w-6 text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Brand Scaling</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                Build a powerful brand presence that converts visitors into loyal customers
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Conversion-Optimized Website Design</h4>
                    <p className="text-gray-400 text-sm">Beautiful, high-converting websites that drive results</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Full-Funnel Digital Marketing</h4>
                    <p className="text-gray-400 text-sm">Complete marketing strategy from awareness to conversion</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Content & Social Media Automation</h4>
                    <p className="text-gray-400 text-sm">Consistent, engaging content that builds your brand</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">CRM Setup & Nurture Campaigns</h4>
                    <p className="text-gray-400 text-sm">Automated systems that turn leads into customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Flowmint */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">The Flowmint Transformation</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how businesses transform when they partner with Flowmint
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Before */}
            <div className="bg-gray-700/30 rounded-2xl p-8 border border-red-500/30">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Before Flowmint</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Manual Everything</h4>
                    <p className="text-gray-400 text-sm">Spending hours on repetitive tasks like lead follow-up, scheduling, and customer support</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Inconsistent Marketing</h4>
                    <p className="text-gray-400 text-sm">Sporadic social media posts, no clear strategy, and leads falling through the cracks</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Limited Growth</h4>
                    <p className="text-gray-400 text-sm">Stuck at the same revenue level, unable to scale without working more hours</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Missed Opportunities</h4>
                    <p className="text-gray-400 text-sm">Leads going cold, no follow-up system, and potential customers slipping away</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* After */}
            <div className="bg-gray-700/30 rounded-2xl p-8 border border-green-500/30">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">After Flowmint</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">AI-Powered Automation</h4>
                    <p className="text-gray-400 text-sm">24/7 lead capture, automatic scheduling, and intelligent customer support that never sleeps</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Strategic Brand Growth</h4>
                    <p className="text-gray-400 text-sm">Consistent content, optimized funnels, and automated nurture campaigns that convert</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Scalable Revenue</h4>
                    <p className="text-gray-400 text-sm">3x ROI within 12 months and systems that grow your business while you sleep</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Never Miss a Lead</h4>
                    <p className="text-gray-400 text-sm">Instant responses, automated follow-ups, and a CRM that turns prospects into customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700/50 rounded-xl border border-gray-600">
              <div className="text-3xl font-bold text-blue-400 mb-2">50%</div>
              <div className="text-gray-300">Increase in lead conversion</div>
            </div>
            
            <div className="text-center p-6 bg-gray-700/50 rounded-xl border border-gray-600">
              <div className="text-3xl font-bold text-teal-400 mb-2">24/7</div>
              <div className="text-gray-300">AI-powered automation</div>
            </div>
            
            <div className="text-center p-6 bg-gray-700/50 rounded-xl border border-gray-600">
              <div className="text-3xl font-bold text-green-400 mb-2">3x ROI</div>
              <div className="text-gray-300">Within the first year</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Scale Your Business with AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a free 30-minute strategy call to discover how AI automation and brand scaling can transform your business
          </p>
          <a 
            href="https://calendly.com/flowmint1ai/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
          >
            <Calendar className="h-5 w-5" />
            Schedule Your Free Strategy Call
          </a>
          <div className="mt-4 text-blue-100 text-sm">
            ✓ No sales pitch • ✓ Actionable insights • ✓ Custom growth roadmap
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Flowmint</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering SMBs with AI automation and brand scaling strategies for accelerated growth.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">AI Agent Development</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Process Automation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Website Design</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Digital Marketing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>hello@flowmint.ai</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Book a call to connect</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Flowmint. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;