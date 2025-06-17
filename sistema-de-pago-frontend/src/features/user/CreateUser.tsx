import type React from "react"
import { callApi } from "../../helpers/axios_helper"
import { useState, type FormEvent } from "react"



export const CreateUser: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    tipo_documento: "",
    numero_documento: "",
    saldo: 0,
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === "saldo" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido"
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email inválido"
    if (!formData.password.trim()) newErrors.password = "La contraseña es requerida"
    if (formData.password.length < 6) newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    if (!formData.tipo_documento) newErrors.tipo_documento = "El tipo de documento es requerido"
    if (!formData.numero_documento.trim()) newErrors.numero_documento = "El número de documento es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await callApi("/usuarios/crear","POST",formData)

      console.log("User registered:", formData)
      setSubmitSuccess(true)

    } catch (error) {
      console.error("Error registering user:", error)
    } finally {
      setIsSubmitting(false)
    }

    if (validateForm()) {
      
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        tipo_documento: "",
        numero_documento: "",
        saldo: 0,
      })
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear Nuevo Usuario</h2>

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
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.apellido ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.apellido && <p className="mt-1 text-sm text-red-500">{errors.apellido}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="tipo_documento" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Documento
            </label>
            <select
              id="tipo_documento"
              name="tipo_documento"
              value={formData.tipo_documento}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.tipo_documento ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="">Seleccionar...</option>
              <option value="DNI">DNI</option>
              <option value="Pasaporte">Pasaporte</option>
              <option value="Cédula">Cédula</option>
            </select>
            {errors.tipo_documento && <p className="mt-1 text-sm text-red-500">{errors.tipo_documento}</p>}
          </div>

          <div>
            <label htmlFor="numero_documento" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Documento
            </label>
            <input
              type="text"
              id="numero_documento"
              name="numero_documento"
              value={formData.numero_documento}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.numero_documento ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.numero_documento && <p className="mt-1 text-sm text-red-500">{errors.numero_documento}</p>}
          </div>

          <div>
            <label htmlFor="saldo" className="block text-sm font-medium text-gray-700 mb-1">
              Saldo
            </label>
            <input
              type="number"
              id="saldo"
              name="saldo"
              value={formData.saldo}
              onChange={handleChange}
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Crear Usuario
          </button>
        </div>
      </form>
    </div>
  )
}
