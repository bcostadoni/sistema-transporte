import type React from "react"
import { callApi } from "../../helpers/axios_helper"
import { useState, type FormEvent } from "react"

interface Estacion {
  id?: number
  nombre: string
  tipo: string
  ubicacion: string
}

export const CreateEstacion: React.FC = () => {
  const [formData, setFormData] = useState<Estacion>({
    nombre: "",
    tipo: "",
    ubicacion: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.tipo.trim()) newErrors.tipo = "El tipo es requerido"
    if (!formData.ubicacion.trim()) newErrors.ubicacion = "La ubicación es requerida"

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
      const response = await callApi("/estaciones/crear", "POST", formData)

      console.log("Estación registered:", response.data)
      setSubmitSuccess(true)

      setFormData({
        nombre: "",
        tipo: "",
        ubicacion: "",
      })

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error registering estación:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear Nueva Estación</h2>

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">Estación creada exitosamente</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.nombre ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
          </div>

          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.tipo ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="">Seleccionar tipo...</option>
              <option value="Subterránea">Subterránea</option>
              <option value="Superficie">Superficie</option>
              <option value="Elevada">Elevada</option>
              <option value="Terminal">Terminal</option>
              <option value="Intermodal">Intermodal</option>
            </select>
            {errors.tipo && <p className="mt-1 text-sm text-red-500">{errors.tipo}</p>}
          </div>

          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación
            </label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.ubicacion ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.ubicacion && <p className="mt-1 text-sm text-red-500">{errors.ubicacion}</p>}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creando..." : "Crear Estación"}
          </button>
        </div>
      </form>
    </div>
  )
}
