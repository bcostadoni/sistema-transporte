import type React from "react"
import { callApi } from "../../helpers/axios_helper"
import { useState, useEffect, type FormEvent } from "react"

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

interface ViajeFormData {
  fechaYHora: string
  linea: string
  estacionOrigenId: number
  estacionDestinoId: number
  usuarioId: number
  metodoDePagoId: number
}

export const CreateViaje: React.FC = () => {
  const [formData, setFormData] = useState<ViajeFormData>({
    fechaYHora: "",
    linea: "",
    estacionOrigenId: 0,
    estacionDestinoId: 0,
    usuarioId: 0,
    metodoDePagoId: 0,
  })

  const [estaciones, setEstaciones] = useState<Estacion[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [metodosDePago, setMetodosDePago] = useState<MetodoDePago[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch estaciones
        const estacionesResponse = await callApi("/estaciones/traer", "GET")
        if (estacionesResponse && estacionesResponse.data) {
          setEstaciones(estacionesResponse.data)
        }

        // Fetch usuarios
        const usuariosResponse = await callApi("/usuarios/traer", "GET")
        if (usuariosResponse && usuariosResponse.data) {
          setUsuarios(usuariosResponse.data)
        }

        // Fetch métodos de pago
        const metodosResponse = await callApi("/metodos-pago/traer", "GET")
        if (metodosResponse && metodosResponse.data) {
          setMetodosDePago(metodosResponse.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: ["estacionOrigenId", "estacionDestinoId", "usuarioId", "metodoDePagoId"].includes(name)
        ? Number.parseInt(value, 10) || 0
        : value,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fechaYHora) newErrors.fechaYHora = "La fecha y hora son requeridas"
    if (!formData.linea.trim()) newErrors.linea = "La línea es requerida"
    if (!formData.estacionOrigenId) newErrors.estacionOrigenId = "La estación de origen es requerida"
    if (!formData.estacionDestinoId) newErrors.estacionDestinoId = "La estación de destino es requerida"
    if (formData.estacionOrigenId === formData.estacionDestinoId && formData.estacionOrigenId !== 0)
      newErrors.estacionDestinoId = "La estación de destino debe ser diferente a la de origen"
    if (!formData.usuarioId) newErrors.usuarioId = "El usuario es requerido"
    if (!formData.metodoDePagoId) newErrors.metodoDePagoId = "El método de pago es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Preparar datos para enviar a la API
      const viajeData = {
        fechaYHora: formData.fechaYHora,
        linea: formData.linea,
        estacionOrigen: { id: formData.estacionOrigenId },
        estacionDestino: { id: formData.estacionDestinoId },
        usuario: { id_usuario: formData.usuarioId },
        metodoDePago: { id: formData.metodoDePagoId },
      }

      const response = await callApi("/viajes/crear", "POST", viajeData)

      console.log("Viaje registered:", response.data)
      setSubmitSuccess(true)

      // Reset form
      setFormData({
        fechaYHora: "",
        linea: "",
        estacionOrigenId: 0,
        estacionDestinoId: 0,
        usuarioId: 0,
        metodoDePagoId: 0,
      })

 
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error registering viaje:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Cargando datos necesarios...</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear Nuevo Viaje</h2>

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">Viaje creado exitosamente</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fechaYHora" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha y Hora
            </label>
            <input
              type="datetime-local"
              id="fechaYHora"
              name="fechaYHora"
              value={formData.fechaYHora}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.fechaYHora ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.fechaYHora && <p className="mt-1 text-sm text-red-500">{errors.fechaYHora}</p>}
          </div>

          <div>
            <label htmlFor="linea" className="block text-sm font-medium text-gray-700 mb-1">
              Línea
            </label>
            <input
              type="text"
              id="linea"
              name="linea"
              value={formData.linea}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.linea ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.linea && <p className="mt-1 text-sm text-red-500">{errors.linea}</p>}
          </div>

          <div>
            <label htmlFor="estacionOrigenId" className="block text-sm font-medium text-gray-700 mb-1">
              Estación de Origen
            </label>
            <select
              id="estacionOrigenId"
              name="estacionOrigenId"
              value={formData.estacionOrigenId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.estacionOrigenId ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="">Seleccionar estación de origen...</option>
              {estaciones.map((estacion) => (
                <option key={`origen-${estacion.id}`} value={estacion.id}>
                  {estacion.nombre} - {estacion.tipo} ({estacion.ubicacion})
                </option>
              ))}
            </select>
            {errors.estacionOrigenId && <p className="mt-1 text-sm text-red-500">{errors.estacionOrigenId}</p>}
          </div>

          <div>
            <label htmlFor="estacionDestinoId" className="block text-sm font-medium text-gray-700 mb-1">
              Estación de Destino
            </label>
            <select
              id="estacionDestinoId"
              name="estacionDestinoId"
              value={formData.estacionDestinoId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.estacionDestinoId ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="">Seleccionar estación de destino...</option>
              {estaciones.map((estacion) => (
                <option key={`destino-${estacion.id}`} value={estacion.id}>
                  {estacion.nombre} - {estacion.tipo} ({estacion.ubicacion})
                </option>
              ))}
            </select>
            {errors.estacionDestinoId && <p className="mt-1 text-sm text-red-500">{errors.estacionDestinoId}</p>}
          </div>

          <div>
            <label htmlFor="usuarioId" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <select
              id="usuarioId"
              name="usuarioId"
              value={formData.usuarioId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.usuarioId ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="">Seleccionar usuario...</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id_usuario} value={usuario.id_usuario}>
                  {usuario.nombre} {usuario.apellido} ({usuario.email})
                </option>
              ))}
            </select>
            {errors.usuarioId && <p className="mt-1 text-sm text-red-500">{errors.usuarioId}</p>}
          </div>

          <div>
            <label htmlFor="metodoDePagoId" className="block text-sm font-medium text-gray-700 mb-1">
              Método de Pago
            </label>
            <select
              id="metodoDePagoId"
              name="metodoDePagoId"
              value={formData.metodoDePagoId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.metodoDePagoId ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="">Seleccionar método de pago...</option>
              {metodosDePago.map((metodo) => (
                <option key={metodo.id} value={metodo.id}>
                  {metodo.nombre}
                </option>
              ))}
            </select>
            {errors.metodoDePagoId && <p className="mt-1 text-sm text-red-500">{errors.metodoDePagoId}</p>}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creando..." : "Crear Viaje"}
          </button>
        </div>
      </form>
    </div>
  )
}
