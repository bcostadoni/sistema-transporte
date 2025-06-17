import type React from "react"
import { useNavigate } from "react-router-dom"
import {
  Users,
  Train,
  CreditCard,
  Building2,
  Map,
  PlusCircle,
  List,
  Home,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react"

interface EntityCard {
  title: string
  description: string
  icon: React.ElementType
  createPath: string
  listPath: string
  color: string
}

export const HomeP: React.FC = () => {
  const navigate = useNavigate()

  const entities: EntityCard[] = [
    {
      title: "Usuarios",
      description: "Gestiona los usuarios del sistema",
      icon: Users, 
      createPath: "/create/user",
      listPath: "/list/user",
      color: "bg-blue-500",
    },
    {
      title: "Viajes",
      description: "Administra los viajes realizados",
      icon: Train,
      createPath: "/create/viaje",
      listPath: "/list/viaje",
      color: "bg-purple-500",
    },
    {
      title: "Recargas",
      description: "Gestiona las recargas de saldo",
      icon: CreditCard,
      createPath: "/create/recarga",
      listPath: "/list/recarga",
      color: "bg-green-500",
    },
    {
      title: "Proveedores",
      description: "Administra los proveedores del sistema",
      icon: Building2,
      createPath: "/create/provider",
      listPath: "/list/provider",
      color: "bg-yellow-500",
    },
    {
      title: "Estaciones",
      description: "Gestiona las estaciones de transporte",
      icon: Map,
      createPath: "/create/estacion",
      listPath: "/list/estacion",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Sistema de Gestión</h2>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => navigate("/home")}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-md"
            >
              <Home className="h-5 w-5 mr-3 text-gray-500" />
              Inicio
            </button>
            {entities.map((entity) => (
              <button
                key={entity.title}
                onClick={() => navigate(entity.listPath)}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md"
              >
                <entity.icon className="h-5 w-5 mr-3 text-gray-500" />
                {entity.title}
              </button>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md">
                <TrendingUp className="h-5 w-5 mr-3 text-gray-500" />
                Estadísticas
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md">
                <Settings className="h-5 w-5 mr-3 text-gray-500" />
                Configuración
              </button>
              <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md">
                <LogOut className="h-5 w-5 mr-3 text-gray-500" />
                Cerrar Sesión
              </button>
            </div>
          </nav>
        </div>

        <div className="flex-1">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
                <div className="md:hidden">
                  <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">Abrir menú</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <main className="py-6 sm:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Bienvenido al Sistema de Gestión</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Selecciona una de las siguientes opciones para administrar los diferentes módulos del sistema.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {entities.map((entity) => (
                  <div
                    key={entity.title}
                    className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-md ${entity.color} text-white`}>
                          <entity.icon className="h-8 w-8" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">{entity.title}</h3>
                          <p className="text-sm text-gray-500">{entity.description}</p>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                          onClick={() => navigate(entity.createPath)}
                          className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <PlusCircle className="h-4 w-4 mr-1" />
                          Crear
                        </button>
                        <button
                          onClick={() => navigate(entity.listPath)}
                          className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <List className="h-4 w-4 mr-1" />
                          Listar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumen del Sistema</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Usuarios</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">12,345</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Viajes Hoy</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">2,584</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Recargas Hoy</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">1,293</dd>
                    </div>
                  </div>
                  <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Estaciones Activas</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">42</dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Actividad Reciente</h2>
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <li key={item} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">Usuario registrado: Juan Pérez</p>
                            <p className="text-sm text-gray-500 truncate">Hace 2 horas</p>
                          </div>
                          <div>
                            <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                              Ver
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
