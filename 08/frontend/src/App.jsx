import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ExternalLink, 
  Code, 
  Layout, 
  Database, 
  Smartphone,
  ChevronDown,
  Send,
  Sparkles,
  Loader2,
  CheckCircle
} from 'lucide-react';

// Renamed from Portfolio to App to ensure correct rendering
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // AI State
  const [aiSummary, setAiSummary] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);
  
  // Form State
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({ name: '', email: '' });

  // API Key - Injected at runtime
  const apiKey = "";

  // --- MOCK BACKEND LOGIC (Simulating server.js) ---
  // Since we can't run a Node server in the preview, this function 
  // simulates the exact behavior of the /api/contact endpoint.
  const submitToBackend = async (data) => {
    // 1. Simulate Network Delay (1.5s)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 2. Simulate Server-Side Validation
    if (!data.name || !data.email || !data.message) {
      throw new Error('All fields are required.');
    }

    // 3. Simulate Email Sending Success
    console.log("Server received:", data);
    return { success: true, message: 'Message sent successfully!' };
  };
  // -------------------------------------------------

  const callGemini = async (prompt) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (!response.ok) throw new Error('API call failed');
      
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate content.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Sorry, the AI service is temporarily unavailable.";
    }
  };

  const generateSkillSummary = async () => {
    setIsGeneratingSummary(true);
    const allSkills = skills.map(s => s.items.join(', ')).join(', ');
    const prompt = `Generate a professional, compelling professional summary (max 80 words) for a developer with the following skills: ${allSkills}. Focus on versatility and problem-solving. Write it in the first person ("I").`;
    
    const result = await callGemini(prompt);
    setAiSummary(result);
    setIsGeneratingSummary(false);
  };

  const polishContactMessage = async () => {
    if (!contactMessage.trim()) return;
    setIsDrafting(true);
    const prompt = `Rewrite the following draft message into a clear, professional business inquiry for a freelance developer. Keep the tone friendly but professional. Draft: "${contactMessage}"`;
    
    const result = await callGemini(prompt);
    setContactMessage(result);
    setIsDrafting(false);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      // Call our "Combined" backend logic
      await submitToBackend({
        name: formData.name,
        email: formData.email,
        message: contactMessage
      });

      setFormStatus('success');
      setContactMessage('');
      setFormData({ name: '', email: '' });
      
      // Reset form status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);

    } catch (error) {
      console.error("Submission error:", error);
      setFormStatus('idle');
      alert("Failed to send message. Please try again.");
    }
  };

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const projects = [
    {
      title: "E-Commerce Dashboard",
      description: "A comprehensive analytics dashboard for online retailers featuring real-time data visualization, inventory management, and sales reporting.",
      tags: ["React", "Tailwind", "Recharts", "Node.js"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool allowing teams to organize workflows, assign tasks, and track progress in real-time.",
      tags: ["React", "Firebase", "DnD Kit", "Tailwind"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "AI Content Generator",
      description: "SaaS platform leveraging AI to generate marketing copy, social media posts, and blog articles with a minimal editor interface.",
      tags: ["React", "OpenAI API", "Stripe", "Next.js"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const skills = [
    { icon: <Layout size={24} />, title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "TypeScript"] },
    { icon: <Database size={24} />, title: "Backend", items: ["Node.js", "PostgreSQL", "Firebase", "GraphQL"] },
    { icon: <Smartphone size={24} />, title: "Tools", items: ["Git", "Figma", "Docker", "Jest"] },
    { icon: <Code size={24} />, title: "Core", items: ["JavaScript (ES6+)", "HTML5", "CSS3", "Algorithms"] }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600 tracking-tighter cursor-pointer" onClick={() => scrollToSection('home')}>
            dev.portfolio
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-indigo-600 ${activeSection === link.id ? 'text-indigo-600' : 'text-slate-600'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-600 hover:text-indigo-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-lg transition-all duration-300 origin-top ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0'}`}>
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`text-left font-medium text-lg ${activeSection === link.id ? 'text-indigo-600' : 'text-slate-600'}`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
              Available for work
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8">
              Building digital <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                experiences that matter.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
              I'm a creative frontend developer specialized in building accessible, 
              pixel-perfect, and performant web applications using modern technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2"
              >
                View Work <ChevronDown size={18} />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 font-semibold rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2"
              >
                Contact Me
              </button>
            </div>
            
            <div className="mt-16 flex gap-6 text-slate-400">
              <a href="#" className="hover:text-indigo-600 transition-colors"><Github size={24} /></a>
              <a href="#" className="hover:text-indigo-600 transition-colors"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-indigo-600 transition-colors"><Mail size={24} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" 
                  alt="Profile" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-2 border-indigo-600 rounded-2xl z-0 hidden md:block"></div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">About Me</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                I am a passionate developer who bridges the gap between design and engineering. 
                With a strong foundation in computer science and a keen eye for detail, I create 
                interfaces that are not only functional but also delightful to use.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                When I'm not coding, I'm exploring new design trends, contributing to open source, 
                or refining my coffee brewing technique. I believe in continuous learning and 
                building software that solves real-world problems.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="text-3xl font-bold text-indigo-600 mb-1">5+</h3>
                  <p className="text-sm text-slate-500 font-medium">Years Experience</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="text-3xl font-bold text-indigo-600 mb-1">50+</h3>
                  <p className="text-sm text-slate-500 font-medium">Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Technical Expertise</h2>
            <p className="text-slate-600 mb-8">
              My tech stack focuses on performance, scalability, and developer experience.
            </p>

            {/* AI Feature 1: Skill Summarizer */}
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="text-indigo-600" size={20} />
                <span className="font-bold text-indigo-900">AI Professional Summary</span>
              </div>
              
              {!aiSummary ? (
                <button 
                  onClick={generateSkillSummary}
                  disabled={isGeneratingSummary}
                  className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-full shadow-sm border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all duration-300 disabled:opacity-70 flex items-center gap-2 mx-auto"
                >
                  {isGeneratingSummary ? <><Loader2 className="animate-spin" size={18}/> Generating...</> : '✨ Generate Summary with AI'}
                </button>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-slate-700 leading-relaxed italic text-lg">"{aiSummary}"</p>
                  <button 
                    onClick={() => setAiSummary('')}
                    className="mt-4 text-xs text-indigo-600 font-semibold hover:underline"
                  >
                    Generate New
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-6">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{skill.title}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-slate-600">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
              <p className="text-slate-600 max-w-xl">
                A selection of projects that showcase my ability to solve complex problems.
              </p>
            </div>
            <a href="#" className="hidden md:flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors mt-4 md:mt-0">
              View Github <ExternalLink size={18} className="ml-2" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button className="p-3 bg-white rounded-full text-slate-900 hover:text-indigo-600 transition-colors">
                      <Github size={20} />
                    </button>
                    <button className="p-3 bg-white rounded-full text-slate-900 hover:text-indigo-600 transition-colors">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <a href="#" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              View Github <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 bg-indigo-600 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Let's work together</h2>
                  <p className="text-indigo-100 mb-8">
                    Have a project in mind or just want to say hi? I'm always open to discussing new projects and opportunities.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="text-indigo-200" size={20} />
                      <span>hello@portfolio.dev</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Linkedin className="text-indigo-200" size={20} />
                      <span>linkedin.com/in/developer</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <div className="flex gap-4">
                    <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                    <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                    <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-slate-700">Message</label>
                      {/* AI Feature 2: Message Polisher */}
                      <button
                        type="button"
                        onClick={polishContactMessage}
                        disabled={isDrafting || !contactMessage.trim()}
                        className="text-xs flex items-center gap-1 text-indigo-600 font-semibold hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                         {isDrafting ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
                         {isDrafting ? 'Polishing...' : 'Polish with AI'}
                      </button>
                    </div>
                    <textarea 
                      rows="4"
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                      placeholder="Tell me about your project... (Tip: Type a draft and click Polish with AI)"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={formStatus === 'loading' || formStatus === 'success'}
                    className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
                      formStatus === 'success' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    {formStatus === 'loading' ? (
                      <>Sending... <Loader2 className="animate-spin" size={18} /></>
                    ) : formStatus === 'success' ? (
                      <>Message Sent! <CheckCircle size={18} /></>
                    ) : (
                      <>Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-white tracking-tight">dev.portfolio</span>
              <p className="mt-2 text-sm">© 2024 All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;