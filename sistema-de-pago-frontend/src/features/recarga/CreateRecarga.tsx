import type React from "react"
import { callApi } from "../../helpers/axios_helper"
import { useState, useEffect, type FormEvent } from "react"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

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

interface RecargaFormData {
  monto: number
  fecha: string
  canal: string
  validacion: boolean
  usuarioId: number
  metodoDePagoId: number
}

export const CreateRecarga: React.FC = () => {
  const [formData, setFormData] = useState<RecargaFormData>({
    monto: 0,
    fecha: new Date().toISOString().slice(0, 16), // Formato YYYY-MM-DDTHH:MM
    canal: "",
    validacion: false,
    usuarioId: 0,
    metodoDePagoId: 0,
  })

  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [metodosDePago, setMetodosDePago] = useState<MetodoDePago[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)

  const canalesRecarga = [
    { value: "App Móvil", label: "App Móvil" },
    { value: "Web", label: "Web" },
    { value: "Kiosco", label: "Kiosco" },
    { value: "Terminal Automática", label: "Terminal Automática" },
    { value: "Ventanilla", label: "Ventanilla" },
    { value: "Transferencia Bancaria", label: "Transferencia Bancaria" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setApiError(null)
      try {
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
        setApiError("No se pudieron cargar los datos necesarios. Por favor, intenta nuevamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name === "monto"
            ? Number.parseFloat(value) || 0
            : ["usuarioId", "metodoDePagoId"].includes(name)
              ? Number.parseInt(value, 10) || 0
              : value,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.monto <= 0) {
      newErrors.monto = "El monto debe ser mayor a 0"
    }

    if (!formData.fecha) {
      newErrors.fecha = "La fecha es requerida"
    }

    if (!formData.canal) {
      newErrors.canal = "El canal es requerido"
    }

    if (!formData.usuarioId) {
      newErrors.usuarioId = "El usuario es requerido"
    }

    if (!formData.metodoDePagoId) {
      newErrors.metodoDePagoId = "El método de pago es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setApiError(null)

    try {
      // Preparar datos para enviar a la API
      const recargaData = {
        monto: formData.monto,
        fecha: formData.fecha,
        canal: formData.canal,
        validacion: formData.validacion,
        usuario: { id_usuario: formData.usuarioId },
        metodoDePago: { id: formData.metodoDePagoId },
      }

      const response = await callApi("/recargas/crear", "POST", recargaData)

      console.log("Recarga registrada:", response.data)
      setSubmitSuccess(true)

      // Reset form
      setFormData({
        monto: 0,
        fecha: new Date().toISOString().slice(0, 16),
        canal: "",
        validacion: false,
        usuarioId: 0,
        metodoDePagoId: 0,
      })

      
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error: any) {
      console.error("Error registering recarga:", error)

      if (error.response && error.response.data && error.response.data.message) {
        setApiError(error.response.data.message)
      } else {
        setApiError("Ocurrió un error al crear la recarga. Por favor, intenta nuevamente.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center py-8 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Cargando datos necesarios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear Nueva Recarga</h2>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Recarga creada exitosamente</span>
        </div>
      )}

      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-1">
              Monto <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="monto"
                name="monto"
                value={formData.monto}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full pl-7 pr-3 py-2 border ${
                  errors.monto ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
            </div>
            {errors.monto && <p className="mt-1 text-sm text-red-500">{errors.monto}</p>}
          </div>

          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha y Hora <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.fecha ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.fecha && <p className="mt-1 text-sm text-red-500">{errors.fecha}</p>}
          </div>

          <div>
            <label htmlFor="canal" className="block text-sm font-medium text-gray-700 mb-1">
              Canal <span className="text-red-500">*</span>
            </label>
            <select
              id="canal"
              name="canal"
              value={formData.canal}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.canal ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="">Seleccionar canal...</option>
              {canalesRecarga.map((canal) => (
                <option key={canal.value} value={canal.value}>
                  {canal.label}
                </option>
              ))}
            </select>
            {errors.canal && <p className="mt-1 text-sm text-red-500">{errors.canal}</p>}
          </div>

          <div>
            <label htmlFor="usuarioId" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario <span className="text-red-500">*</span>
            </label>
            <select
              id="usuarioId"
              name="usuarioId"
              value={formData.usuarioId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.usuarioId ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
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
              Método de Pago <span className="text-red-500">*</span>
            </label>
            <select
              id="metodoDePagoId"
              name="metodoDePagoId"
              value={formData.metodoDePagoId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.metodoDePagoId ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
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

          <div className="md:col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="validacion"
                name="validacion"
                checked={formData.validacion}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="validacion" className="ml-2 block text-sm text-gray-700">
                Recarga validada
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Marcar si la recarga ya ha sido validada. Las recargas no validadas quedarán pendientes de confirmación.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => {
              setFormData({
                monto: 0,
                fecha: new Date().toISOString().slice(0, 16),
                canal: "",
                validacion: false,
                usuarioId: 0,
                metodoDePagoId: 0,
              })
              setErrors({})
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Limpiar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Creando...
              </>
            ) : (
              "Crear Recarga"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
