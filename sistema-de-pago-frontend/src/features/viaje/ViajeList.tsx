"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { callApi } from "../../helpers/axios_helper"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Estacion {
  id: number
  nombre: string
  tipo: string
  ubicacion: string
}

interface Usuario {
  id_usuario: number
  nombre: string
  apellido: string
  email: string
}

interface MetodoDePago {
  id: number
  nombre: string
}

interface Viaje {
  id: number
  fechaYHora: string
  linea: string
  estacionOrigen: Estacion
  estacionDestino: Estacion
  usuario: Usuario
  metodoDePago: MetodoDePago
}

export const ViajeList: React.FC = () => {
  const [viajes, setViajes] = useState<Viaje[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetchViajes()
  }, [])

  const fetchViajes = async () => {
    setLoading(true)
    try {
      const response = await callApi(`/viajes/traer`, "GET")

      if (!response) {
        throw new Error("Failed to fetch viajes")
      }

      setViajes(response.data)
    } catch (error) {
      console.error("Error fetching viajes:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDateTime = (dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr)
      return format(date, "dd/MM/yyyy HH:mm", { locale: es })
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateTimeStr
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Viajes</h2>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Cargando viajes...</div>
      ) : viajes.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay viajes registrados. Crea un viaje para comenzar.
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
                  Fecha y Hora
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Línea
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Origen
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Destino
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Usuario
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Método de Pago
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
              {viajes.map((viaje) => (
                <tr key={viaje.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{viaje.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDateTime(viaje.fechaYHora)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{viaje.linea}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{viaje.estacionOrigen.nombre}</div>
                    <div className="text-xs text-gray-500">{viaje.estacionOrigen.tipo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{viaje.estacionDestino.nombre}</div>
                    <div className="text-xs text-gray-500">{viaje.estacionDestino.tipo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {viaje.usuario.nombre} {viaje.usuario.apellido}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{viaje.metodoDePago.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => navigate(`/viajes/detalle/${viaje.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => navigate(`/viajes/editar/${viaje.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("¿Estás seguro de que deseas eliminar este viaje?")) {
                          // Implementar lógica de eliminación
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
