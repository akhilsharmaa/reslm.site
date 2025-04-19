import { useState } from 'react';
import { Search, Upload, MessageSquare, BookOpen, ChevronRight, ArrowRight } from 'lucide-react';

export default function RagHomePage() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-indigo-600">reslm.site</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Features</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">How It Works</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Pricing</a>
                <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-40 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-2/3">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Chat with your research papers</span>
                <span className="block text-blue-600 pt-6 text-4xl">Get accurate answers instantly</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
                Upload your academic papers and research documents. Our advanced RAG system will analyze them and provide precise answers to your questions.
              </p>
              <div className="mt-10">
                <a
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-6 md:text-lg md:px-12 transition-all duration-200 shadow-lg hover:shadow-xl"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  href="/chat/new"
                >
                  Launch App
                  {isHovered ? <ArrowRight className="ml-2" /> : <ChevronRight className="ml-2" />}
                </a>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 lg:flex lg:justify-end">
              <img 
                src="https://cdn.prod.website-files.com/6082f2094ccb2d6ff32eb5d8/65325315a9d2e2a0e3efa52e_LLM%20Optimization%20Parameters.png" 
                alt="Research assistant interface demo" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Key Features</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Everything you need to analyze and understand your research documents
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Easy Upload</h3>
              <p className="mt-2 text-center text-gray-500">
                Upload multiple papers in various formats including PDF, DOCX, and LaTeX files.
              </p>
              <img 
                src="/api/placeholder/300/200" 
                alt="Upload interface" 
                className="mt-4 rounded-md shadow-md"
              />
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Smart Search</h3>
              <p className="mt-2 text-center text-gray-500">
                Our RAG system comprehends context and provides accurate answers based on your documents.
              </p>
              <img 
                src="/api/placeholder/300/200" 
                alt="Search functionality" 
                className="mt-4 rounded-md shadow-md"
              />
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900">Interactive Chat</h3>
              <p className="mt-2 text-center text-gray-500">
                Ask follow-up questions and explore your research through natural conversation.
              </p>
              <img 
                src="/api/placeholder/300/200" 
                alt="Chat interface" 
                className="mt-4 rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Get started in three simple steps
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-between">
                <div className="bg-indigo-600 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div className="bg-indigo-600 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div className="bg-indigo-600 h-12 w-12 rounded-full flex items-center justify-center text-white font-bold">3</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-3">
              <div className="flex flex-col items-center">
                <img 
                  src="/api/placeholder/350/200" 
                  alt="Upload process" 
                  className="rounded-lg shadow-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900">Upload Your Papers</h3>
                <p className="mt-2 text-gray-500 text-center">
                  Simply drag and drop your research papers or click to upload. We support multiple file formats.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="/api/placeholder/350/200" 
                  alt="Analysis process" 
                  className="rounded-lg shadow-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900">System Analyzes Content</h3>
                <p className="mt-2 text-gray-500 text-center">
                  Our advanced RAG system processes and indexes your documents for accurate retrieval.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="/api/placeholder/350/200" 
                  alt="Chat interface" 
                  className="rounded-lg shadow-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-900">Chat and Get Answers</h3>
                <p className="mt-2 text-gray-500 text-center">
                  Ask questions in natural language and receive precise answers with references to your papers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900">See PaperChat in action</h2>
              <p className="mt-4 text-lg text-gray-500">
                Watch how researchers are using our platform to gain insights from their papers faster than ever before.
              </p>
              <div className="mt-6">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-gray-600">Extract key insights from multiple papers</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-gray-600">Compare findings across different research</span>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="ml-2 text-gray-600">Generate summaries with accurate citations</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/2">
              <div className="relative">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="Product demo" 
                  className="rounded-xl shadow-2xl mx-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-indigo-600 bg-opacity-75 flex items-center justify-center">
                    <svg className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to transform your research experience?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-100">
              Start chatting with your papers and get the insights you need.
            </p>
            <div className="mt-8">
              <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-6 md:text-lg md:px-12 transition-all duration-200 shadow-lg hover:shadow-xl">
                Launch App <ArrowRight className="ml-2" />
              </button>
            </div>
            <div className="mt-10">
              <img 
                src="/api/placeholder/800/300" 
                alt="App interface preview" 
                className="rounded-lg shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">PaperChat</span>
              </div>
              <p className="mt-2 text-gray-400">
                Your research assistant powered by AI
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
                <div className="mt-4 space-y-4">
                  <a href="#" className="text-base text-gray-300 hover:text-white block">Features</a>
                  <a href="#" className="text-base text-gray-300 hover:text-white block">Pricing</a>
                  <a href="#" className="text-base text-gray-300 hover:text-white block">FAQ</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                <div className="mt-4 space-y-4">
                  <a href="#" className="text-base text-gray-300 hover:text-white block">About</a>
                  <a href="#" className="text-base text-gray-300 hover:text-white block">Blog</a>
                  <a href="#" className="text-base text-gray-300 hover:text-white block">Contact</a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <div className="mt-4 space-y-4">
                  <a href="#" className="text-base text-gray-300 hover:text-white block">Privacy</a>
                  <a href="#" className="text-base text-gray-300 hover:text-white block">Terms</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="text-base text-gray-400">
              &copy; 2025 PaperChat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}