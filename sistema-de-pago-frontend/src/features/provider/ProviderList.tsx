import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { callApi } from "../../helpers/axios_helper"

interface Provider {
  id: number
  tipo: string
  proveedor: string
}

export const ProviderList: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetchProviders()
  }, [])

  const fetchProviders = async () => {
    setLoading(true)
    try {
      const response = await callApi(`/proveedores/traer`, "GET")

      if (!response) {
        throw new Error("Failed to fetch providers")
      }

      setProviders(response.data)
    } catch (error) {
      console.error("Error fetching providers:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Proveedores</h2>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Cargando proveedores...</div>
      ) : providers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay proveedores registrados. Crea un proveedor para comenzar.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Proveedor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {providers.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{provider.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{provider.proveedor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => navigate(`/proveedores/editar/${provider.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("¿Estás seguro de que deseas eliminar este proveedor?")) {
                          // Esto se deja para la siguiente entrega
                        }
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
