import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { callApi } from "../../helpers/axios_helper"

interface Estacion {
  id: number
  nombre: string
  tipo: string
  ubicacion: string
}

export const EstacionList: React.FC = () => {
  const [estaciones, setEstaciones] = useState<Estacion[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetchEstaciones()
  }, [])

  const fetchEstaciones = async () => {
    setLoading(true)
    try {
      const response = await callApi(`/estaciones`, "GET")

      if (!response) {
        throw new Error("Failed to fetch estaciones")
      }

      setEstaciones(response.data)
    } catch (error) {
      console.error("Error fetching estaciones:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Estaciones</h2>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Cargando estaciones...</div>
      ) : estaciones.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay estaciones registradas. Crea una estación para comenzar.
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
                  Nombre
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
                  Ubicación
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
              {estaciones.map((estacion) => (
                <tr key={estacion.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estacion.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estacion.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estacion.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{estacion.ubicacion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => navigate(`/estaciones/editar/${estacion.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("¿Estás seguro de que deseas eliminar esta estación?")) {
                          // Se implementara en la proxima entrega
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
