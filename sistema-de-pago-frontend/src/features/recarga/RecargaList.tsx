"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { callApi } from "../../helpers/axios_helper"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Eye, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"

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

interface Recarga {
  id: number
  monto: number
  fecha: string
  canal: string
  validacion: boolean
  usuario: Usuario
  metodoDePago: MetodoDePago
}

export const RecargaList: React.FC = () => {
  const [recargas, setRecargas] = useState<Recarga[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchRecargas()
  }, [])

  const fetchRecargas = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await callApi(`/recargas/traer`, "GET")

      if (!response) {
        throw new Error("Failed to fetch recargas")
      }

      setRecargas(response.data)
    } catch (error) {
      console.error("Error fetching recargas:", error)
      setError("No se pudieron cargar las recargas. Por favor, intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      return format(date, "dd/MM/yyyy", { locale: es })
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateStr
    }
  }

  const formatMonto = (monto: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(monto)
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta recarga?")) {
      try {
        await callApi(`/recargas/eliminar/${id}`, "DELETE")
        // Actualizar la lista después de eliminar
        setRecargas(recargas.filter((recarga) => recarga.id !== id))
      } catch (error) {
        console.error("Error deleting recarga:", error)
        alert("No se pudo eliminar la recarga. Por favor, intenta nuevamente.")
      }
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Lista de Recargas</h2>
        <button
          onClick={() => fetchRecargas()}
          className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md hover:bg-gray-200 transition-colors"
        >
          Actualizar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Cargando recargas...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          <XCircle className="h-8 w-8 mx-auto mb-2" />
          <p>{error}</p>
          <button
            onClick={() => fetchRecargas()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      ) : recargas.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay recargas registradas. Crea una recarga para comenzar.
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
                  Monto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Canal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Validación
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
              {recargas.map((recarga) => (
                <tr key={recarga.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recarga.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatMonto(recarga.monto)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(recarga.fecha)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recarga.canal}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {recarga.validacion ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" /> Validada
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <XCircle className="h-4 w-4 mr-1" /> Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {recarga.usuario.nombre} {recarga.usuario.apellido}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{recarga.metodoDePago.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/recargas/detalle/${recarga.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver detalles"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/recargas/editar/${recarga.id}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(recarga.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
