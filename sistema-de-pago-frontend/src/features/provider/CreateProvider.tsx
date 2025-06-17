import type React from "react"
import { callApi } from "../../helpers/axios_helper"
import { useState, type FormEvent } from "react"

interface Provider {
  id?: number
  tipo: string
  proveedor: string
}

export const CreateProvider: React.FC = () => {
  const [formData, setFormData] = useState<Provider>({
    tipo: "",
    proveedor: "",
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

    if (!formData.tipo.trim()) newErrors.tipo = "El tipo es requerido"
    if (!formData.proveedor.trim()) newErrors.proveedor = "El nombre del proveedor es requerido"

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
      const response = await callApi("/proveedores/crear", "POST", formData)

      console.log("Provider registered:", response.data)
      setSubmitSuccess(true)

      // Reset form
      setFormData({
        tipo: "",
        proveedor: "",
      })

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error registering provider:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear Nuevo Proveedor</h2>

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">Proveedor creado exitosamente</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <option value="Servicios">Servicios</option>
              <option value="Productos">Productos</option>
              <option value="Consultoría">Consultoría</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.tipo && <p className="mt-1 text-sm text-red-500">{errors.tipo}</p>}
          </div>

          <div>
            <label htmlFor="proveedor" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Proveedor
            </label>
            <input
              type="text"
              id="proveedor"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.proveedor ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.proveedor && <p className="mt-1 text-sm text-red-500">{errors.proveedor}</p>}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creando..." : "Crear Proveedor"}
          </button>
        </div>
      </form>
    </div>
  )
}
