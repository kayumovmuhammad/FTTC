import React, { useState, useEffect } from 'react';
import { ChevronDown, Recycle, Trophy, Star, Users, Package, TrendingUp, Leaf, Globe, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLeader, setCurrentLeader] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentLeader((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const leaders = [
    { name: 'Анна К.', sales: 1247, avatar: '👩‍🦰', category: 'Электроника' },
    { name: 'Михаил С.', sales: 1156, avatar: '👨‍💼', category: 'Металлолом' },
    { name: 'София Л.', sales: 1089, avatar: '👩‍🎨', category: 'Пластик' }
  ];

  const features = [
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Просмотр объявлений',
      desc: 'Удобный каталог по категориям',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Регистрация и вход',
      desc: 'Быстрая авторизация в системе',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Создание объявлений',
      desc: 'Легко размещайте свои товары',
      color: 'from-emerald-400 to-emerald-600'
    }
  ];

  const categories = [
    { name: 'Пластик', count: '2.4k', icon: '♻️', growth: '+15%' },
    { name: 'Металл', count: '1.8k', icon: '🔧', growth: '+22%' },
    { name: 'Электроника', count: '956', icon: '📱', growth: '+8%' },
    { name: 'Бумага', count: '3.2k', icon: '📄', growth: '+31%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-green-100 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-xl">
                <Recycle className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">FTC</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">
                Функции
              </a>
              <a href="#leaders" className="text-gray-700 hover:text-green-600 transition-colors">
                Лидеры
              </a>
              <a href="#categories" className="text-gray-700 hover:text-green-600 transition-colors">
                Категории
              </a>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  navigate('/login');
                }}
                className="px-4 py-2 text-green-600 border border-green-300 rounded-lg hover:bg-green-50 transition-all transform hover:scale-105"
              >
                Войти
              </button>
              <button
                onClick={() => {
                  navigate('/register');
                }}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
              >
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div
              className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Превращаем
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent animate-pulse"> мусор </span>в
                деньги
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Первый маркетплейс вторичного сырья в Таджикистане. Покупайте и продавайте отходы, зарабатывайте на переработке и спасайте
                планету!
              </p>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <button
                  onClick={() => {
                    navigate('/login');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105 animate-bounce"
                >
                  <Leaf className="w-5 h-5 inline mr-2" />
                  Начать продавать
                </button>
                <button
                  onClick={() => {
                    navigate('/categories/plastic');
                  }}
                  className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <Globe className="w-5 h-5 inline mr-2 text-blue-500" />
                  Смотреть каталог
                </button>
              </div>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              {[
                { number: '15.2k', label: 'Объявлений', icon: '📦' },
                { number: '8.7k', label: 'Пользователей', icon: '👥' },
                { number: '127', label: 'Тонн переработано', icon: '♻️' },
                { number: '4.9', label: 'Рейтинг', icon: '⭐' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Все возможности платформы</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Простые и удобные инструменты для эффективной торговли вторсырьем</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
                <div className="mt-4 w-0 group-hover:w-full h-1 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-500 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaders Section */}
      <section id="leaders" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Топ продавцов месяца</h2>
            <p className="text-lg text-gray-600">Лидеры по объёму переработанных материалов</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {leaders.map((leader, index) => (
              <div
                key={index}
                className={`relative bg-white p-8 rounded-3xl shadow-lg border-2 transition-all duration-500 transform hover:scale-105 ${
                  index === 0
                    ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50'
                    : index === 1
                      ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50'
                      : 'border-orange-300 bg-gradient-to-br from-orange-50 to-red-50'
                } ${currentLeader === index ? 'ring-4 ring-green-200 scale-105' : ''}`}
              >
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-500' : 'bg-orange-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl mb-4">{leader.avatar}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">{leader.sales}</p>
                  <p className="text-sm text-gray-600 mb-4">продаж</p>
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    <Star className="w-4 h-4 mr-1" />
                    {leader.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Популярные категории</h2>
            <p className="text-lg text-gray-600">Найдите именно то, что вам нужно</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all transform hover:scale-105 hover:-translate-y-1 group cursor-pointer"
              >
                <div className="text-3xl mb-4 group-hover:animate-bounce">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-700">{category.count}</span>
                  <span className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded-full">{category.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 animate-pulse text-red-300" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Присоединяйтесь к эко-революции!</h2>
          <p className="text-xl mb-8 opacity-90">
            Вместе мы можем сделать наш мир чище и лучше. Начните зарабатывать на переработке уже сегодня!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                navigate('/login');
              }}
              className="px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:shadow-lg transition-all transform hover:scale-105"
            >
              Создать объявление
            </button>
            <button
              onClick={() => {
                navigate('/categories/technical');
              }}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-green-600 transition-all transform hover:scale-105"
            >
              Узнать больше
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-xl">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">FTC</span>
              </div>
              <p className="text-gray-400">Маркетплейс будущего для переработки отходов и сохранения экологии.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Платформа</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Как это работает
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Цены
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Помощь
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Блог
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors">
                    Карьера
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 FTC. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
