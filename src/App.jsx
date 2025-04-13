import React, { useState, useEffect } from 'react'
import { FaChartLine, FaUsers, FaRobot, FaCheckCircle, FaStar, FaRocket, FaLightbulb, FaBars, FaTimes, FaArrowUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0()

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
      setShowScrollTop(position > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide()
      }
    }, 8000)
    return () => clearInterval(timer)
  }, [isTransitioning])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % 3)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + 3) % 3)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  const goToSlide = (index) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  const handleLogin = () => {
    loginWithRedirect()
  }

  const handleSignup = () => {
    loginWithRedirect({
      screen_hint: 'signup'
    })
  }

  const handleLogout = () => {
    logout({ returnTo: window.location.origin })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="fixed w-full bg-gray-900/90 backdrop-blur-sm shadow-sm z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-4 py-2 bg-gray-900 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-gray-900"></div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-900"></div>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-wider">VÍNCULO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition font-medium">Home</a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition font-medium">Funcionalidades</a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition font-medium">Preços</a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-indigo-400 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-medium font-bold"
                >
                  Sair
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition shadow-lg transform hover:scale-105 font-bold"
                >
                  Entrar
                </button>
                <button
                  onClick={handleSignup}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition shadow-lg transform hover:scale-105 font-bold"
                >
                  Criar Conta
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <a href="#" className="block text-gray-300 hover:text-indigo-400 transition font-medium">Home</a>
              <a href="#" className="block text-gray-300 hover:text-indigo-400 transition font-medium">Funcionalidades</a>
              <a href="#" className="block text-gray-300 hover:text-indigo-400 transition font-medium">Preços</a>
              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">{user?.name}</span>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-medium"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleLogin}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition font-medium"
                    >
                      Entrar
                    </button>
                    <button
                      onClick={handleSignup}
                      className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition"
                    >
                      Criar Conta
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Parallax */}
      <main className="pt-32 pb-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 opacity-50"
          style={{
            transform: `translateY(${scrollPosition * 0.1}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-900/50 text-indigo-400 rounded-full mb-6 animate-pulse">
                <FaRocket className="mr-2" />
                <span className="font-medium">CRM #1 em Crescimento</span>
              </div>
              <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                Transforme suas <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">vendas</span> com IA
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Aumente suas vendas em até 300% com o CRM mais avançado do mercado. 
                <span className="inline mt-2 text-indigo-400">Inteligência Artificial + Automação = </span>
                <span className="inline mt-2 text-indigo-400 font-bold">Resultados Reais</span>
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handleSignup}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg transform hover:scale-105 group"
                >
                  <span className="flex items-center justify-center">
                    Comece Grátis
                    <FaRocket className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="px-8 py-4 bg-gray-800 text-indigo-400 border-2 border-indigo-500 rounded-lg font-semibold hover:bg-gray-700 transition group">
                  <span className="flex items-center justify-center">
                    Agende uma Demo
                    <FaLightbulb className="ml-2 transform group-hover:rotate-12 transition-transform" />
                  </span>
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-800 shadow-md transform hover:scale-110 transition"></div>
                  ))}
                </div>
                <div>
                  <p className="text-gray-300 font-medium">+5000 empresas em crescimento</p>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                    <span className="ml-2 text-gray-300">4.9/5.0</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-3xl font-bold text-indigo-400">+300%</div>
                  <div className="text-gray-300">Aumento nas Vendas</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-3xl font-bold text-indigo-400">-50%</div>
                  <div className="text-gray-300">Redução de Custos</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-900/50 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-900/50 rounded-full opacity-50 animate-pulse"></div>
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-gray-800 p-4 rounded-2xl shadow-2xl border border-gray-700">
                    <div className="relative overflow-hidden rounded-xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent z-10"></div>
                      <div className="grid grid-cols-2 gap-4 p-4">
                        <div className="space-y-4">
                          <div className="bg-gray-700 rounded-lg p-4 transform hover:scale-105 transition">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-300">Pipeline Ativo</span>
                            </div>
                            <div className="mt-2 h-2 bg-gray-600 rounded-full w-3/4"></div>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-4 transform hover:scale-105 transition">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-300">Novos Leads</span>
                            </div>
                            <div className="mt-2 h-2 bg-gray-600 rounded-full w-1/2"></div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-700 rounded-lg p-4 transform hover:scale-105 transition">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                              <span className="text-sm text-gray-300">Em Negociação</span>
                            </div>
                            <div className="mt-2 h-2 bg-gray-600 rounded-full w-2/3"></div>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-4 transform hover:scale-105 transition">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-sm text-gray-300">Fechados</span>
                            </div>
                            <div className="mt-2 h-2 bg-gray-600 rounded-full w-1/4"></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-indigo-500 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium text-white">Dashboard Vínculo</p>
                              <p className="text-xs text-gray-400">Atualizado agora</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Social Proof Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">98%</div>
              <div className="text-gray-300">Satisfação dos Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">24/7</div>
              <div className="text-gray-300">Suporte Premium</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">+10k</div>
              <div className="text-gray-300">Empresas Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime Garantido</div>
            </div>
          </div>
        </div>
      </section>

      {/* Carrossel de Imagens */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900 z-10"></div>
        <div className="container mx-auto px-6 relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Transformando Negócios</h2>
            <p className="text-xl text-gray-300">Veja como empresas estão revolucionando suas vendas</p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-all duration-1000 ease-in-out" 
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  opacity: isTransitioning ? 0.7 : 1
                }}
              >
                {/* Primeiro Grupo */}
                <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                      <div className="aspect-w-16 aspect-h-9">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 animate-pulse"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Dashboard Inteligente</h3>
                        <p className="text-gray-400">Visualize seus dados em tempo real</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                      <div className="aspect-w-16 aspect-h-9">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Análise Avançada</h3>
                        <p className="text-gray-400">Insights poderosos para sua equipe</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                      <div className="aspect-w-16 aspect-h-9">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Automação Inteligente</h3>
                        <p className="text-gray-400">Fluxos de trabalho otimizados</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segundo Grupo */}
                <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                      <div className="aspect-w-16 aspect-h-9">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-500 animate-pulse"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Gestão de Equipe</h3>
                        <p className="text-gray-400">Equipes mais produtivas</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                      <div className="aspect-w-16 aspect-h-9">
                        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 animate-pulse"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Relatórios Personalizados</h3>
                        <p className="text-gray-400">Dados que fazem a diferença</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                      <div className="aspect-w-16 aspect-h-9">
                        <div className="bg-gradient-to-br from-red-500 to-pink-500 animate-pulse"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Integrações</h3>
                        <p className="text-gray-400">Conecte suas ferramentas</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terceiro Grupo */}
                <div className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                      <div className="aspect-w-16 aspect-h-9">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 animate-pulse"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Mobile First</h3>
                        <p className="text-gray-400">Acesse de qualquer lugar</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                      <div className="aspect-w-16 aspect-h-9">
                        <div className="bg-gradient-to-br from-violet-500 to-purple-500 animate-pulse"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Segurança</h3>
                        <p className="text-gray-400">Seus dados protegidos</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    <div className="bg-gray-800 rounded-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                      <div className="aspect-w-16 aspect-h-9">
                        <div className="bg-gradient-to-br from-rose-500 to-pink-500 animate-pulse"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Suporte Premium</h3>
                        <p className="text-gray-400">Sempre ao seu lado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controles de Navegação */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-gray-800/50 hover:bg-gray-800 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isTransitioning}
            >
              <FaChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-gray-800/50 hover:bg-gray-800 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isTransitioning}
            >
              <FaChevronRight size={24} />
            </button>
          </div>

          <div className="mt-12 flex justify-center space-x-4">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-indigo-500 scale-125' 
                    : 'bg-gray-700 hover:bg-gray-600'
                } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Funcionalidades Essenciais</h2>
            <p className="text-xl text-gray-300">Simplicidade e poder em um só lugar</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <FaChartLine className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Pipeline Inteligente</h3>
              <p className="text-gray-300 mb-6">Acompanhe cada etapa do seu funil de vendas com IA e automação.</p>
              <ul className="space-y-3">
                {['Previsões de vendas', 'Automação de etapas', 'Análise de performance', 'Recomendações IA'].map((item) => (
                  <li key={item} className="flex items-center space-x-2 text-gray-300">
                    <FaCheckCircle className="text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <FaUsers className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Gestão de Equipe</h3>
              <p className="text-gray-300 mb-6">Gerencie sua equipe com ferramentas avançadas de performance.</p>
              <ul className="space-y-3">
                {['Metas inteligentes', 'Comissões automáticas', 'Gamificação', 'Análise de performance'].map((item) => (
                  <li key={item} className="flex items-center space-x-2 text-gray-300">
                    <FaCheckCircle className="text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-700 p-8 rounded-xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <FaRobot className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">IA e Automação</h3>
              <p className="text-gray-300 mb-6">Automatize tarefas e tome decisões baseadas em dados.</p>
              <ul className="space-y-3">
                {['Workflows inteligentes', 'Integrações automáticas', 'Gatilhos IA', 'Análise preditiva'].map((item) => (
                  <li key={item} className="flex items-center space-x-2 text-gray-300">
                    <FaCheckCircle className="text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Planos que se adaptam a você</h2>
            <p className="text-xl text-gray-300">Escolha o plano ideal para o seu negócio</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Plano Grátis */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 transform hover:scale-105 transition duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Grátis</h3>
                <div className="text-4xl font-bold text-white mb-4">R$0<span className="text-lg text-gray-400">/mês</span></div>
                <p className="text-gray-400">Ideal para começar</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Até 3 usuários
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Pipeline básico
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Relatórios simples
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Suporte por email
                </li>
              </ul>
              <button
                onClick={handleSignup}
                className="w-full py-3 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Comece Grátis
              </button>
            </div>

            {/* Plano Profissional */}
            <div className="bg-gray-800 rounded-2xl p-8 border-2 border-indigo-500 transform hover:scale-105 transition duration-300 relative">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-tl-lg rounded-br-lg text-sm font-medium">
                Mais Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Profissional</h3>
                <div className="text-4xl font-bold text-white mb-4">R$99<span className="text-lg text-gray-400">/mês</span></div>
                <p className="text-gray-400">Para equipes em crescimento</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Até 10 usuários
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Pipeline avançado
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Relatórios detalhados
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Suporte prioritário
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Integrações básicas
                </li>
              </ul>
              <button
                onClick={handleSignup}
                className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition"
              >
                Assinar Agora
              </button>
            </div>

            {/* Plano Corporativo */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 transform hover:scale-105 transition duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Corporativo</h3>
                <div className="text-4xl font-bold text-white mb-4">R$299<span className="text-lg text-gray-400">/mês</span></div>
                <p className="text-gray-400">Para empresas estabelecidas</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Usuários ilimitados
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Pipeline personalizado
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Relatórios avançados
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Suporte 24/7
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Todas as integrações
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  API dedicada
                </li>
              </ul>
              <button
                onClick={handleSignup}
                className="w-full py-3 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Assinar Agora
              </button>
            </div>

            {/* Plano Enterprise */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 transform hover:scale-105 transition duration-300">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-white mb-4">Sob Consulta</div>
                <p className="text-gray-400">Solução personalizada</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Usuários ilimitados
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Solução sob medida
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Suporte dedicado
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Treinamento personalizado
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  SLA garantido
                </li>
                <li className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Integração total
                </li>
              </ul>
              <button
                onClick={handleSignup}
                className="w-full py-3 px-6 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Fale Conosco
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Pronto para se conectar?</h2>
          <p className="text-xl text-indigo-200 mb-8">Experimente gratuitamente por 14 dias. Sem cartão de crédito.</p>
          <button
            onClick={handleSignup}
            className="px-8 py-4 bg-white text-indigo-900 rounded-lg font-semibold hover:bg-indigo-100 transition shadow-lg transform hover:scale-105"
          >
            Comece Agora
          </button>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition z-50"
        >
          <FaArrowUp />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-4 py-2 bg-gray-900 ring-1 ring-gray-900/5 rounded-lg leading-none flex items-center">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-gray-900"></div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-900"></div>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-wider">VÍNCULO</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Termos</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Privacidade</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contato</a>
            </div>
            <div className="text-center text-gray-400">
              <p>© 2025 Vínculo. Todos os direitos reservados.</p>
              <p>Made by: Giuseppe Bertholdi</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
