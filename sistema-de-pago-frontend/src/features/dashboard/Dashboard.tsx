
import type React from "react"
import { useState, useEffect } from "react"
import { callApi } from "../../helpers/axios_helper"
interface User {
    id: string
    nombre: string
    apellido: string
    email: string
    tipo_documento: string
    numero_documento: string
    saldo: number
}

interface PaymentMethod {
    id: number
    tipo: string
    proveedor: string
}

interface Recarga {
    id: number
    fecha: Date
    monto: number
    metodoPago: {
        id: number
        tipo: string
        proveedor: string
    }
    usuarioId: number
}

interface HistoryModalProps {
    isOpen: boolean
    onClose: () => void
}

interface Estacion {
    id: number
    nombre: string
    ubicacion?: string
}

interface Viaje {
    id: number
    fechaHora: string
    monto: number
    metodoDePago: {
        id: number
        tipo: string
        proveedor: string
    }
    estacionOrigen: {
        id: number
        nombre: string
        ubicacion: string
    }
    estacionDestino: {
        id: number
        nombre: string
        ubicacion: string
    }
}

interface TravelModalProps {
    isOpen: boolean
    onClose: () => void
    onTravel: (travelData: any) => void
    isLoading: boolean
}

interface TravelHistoryModalProps {
    isOpen: boolean
    onClose: () => void
}

function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
    const [recargas, setRecargas] = useState<Recarga[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (isOpen) {
            fetchRecargas()
        }
    }, [isOpen])

    const fetchRecargas = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const userId = localStorage.getItem("userId")


            const response = await callApi(`/recargas/traer/lista`, "POST",
                {
                    usuarioId: userId
                },
            )

            if (response) {
                const data = await response.data
                setRecargas(data)
                console.log(data)
            } else {
                throw new Error("Error al cargar el historial")
            }
        } catch (error: any) {
            setError(error.message || "Error al cargar el historial")
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getProviderIcon = (proveedor: string) => {
        const provider = proveedor.toLowerCase()
        if (provider.includes("visa")) {
            return "💳"
        } else if (provider.includes("mastercard")) {
            return "💳"
        } else if (provider.includes("paypal")) {
            return "🅿️"
        } else if (provider.includes("mercadopago")) {
            return "💙"
        } else if (provider.includes("naranja")) {
            return "🧡"
        } else if (provider.includes("uala")) {
            return "💛"
        }
        return "💳"
    }



    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">Historial de Recargas</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {isLoading ? (
                        <div className="text-center py-8">
                            <svg
                                className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <p className="text-gray-600">Cargando historial...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <svg
                                className="w-12 h-12 text-red-400 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button onClick={fetchRecargas} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Reintentar
                            </button>
                        </div>
                    ) : recargas.length > 0 ? (
                        <div className="space-y-4">
                            {recargas.map((recarga) => (
                                <div key={recarga.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <span className="text-2xl">{getProviderIcon(recarga.metodoPago.proveedor)}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Recarga con {recarga.metodoPago.proveedor}
                                                </p>
                                                <p className="text-sm text-gray-500">{recarga.metodoPago.proveedor}</p>
                                                <p className="text-xs text-gray-400">
                                                    {new Date(recarga.fecha).toLocaleString('es-AR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold text-green-600">+${recarga.monto.toFixed(2)}</p>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <svg
                                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <p className="text-gray-600">No tienes recargas registradas</p>
                            <p className="text-sm text-gray-500 mt-2">Tus recargas aparecerán aquí una vez que realices alguna</p>
                        </div>
                    )}
                </div>

                {recargas.length > 0 && (
                    <div className="px-6 py-4 bg-gray-50 border-t">
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            <span>Total de recargas: {recargas.length}</span>
                            <span>Total recargado: ${recargas.reduce((total, recarga) => total + recarga.monto, 0).toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function TravelModal({ isOpen, onClose, onTravel, isLoading }: TravelModalProps) {
    const [step, setStep] = useState<"stations" | "payment">("stations")
    const [estaciones, setEstaciones] = useState<Estacion[]>([])
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
    const [loadingData, setLoadingData] = useState(false)
    const [selectedOrigin, setSelectedOrigin] = useState<Estacion | null>(null)
    const [selectedDestination, setSelectedDestination] = useState<Estacion | null>(null)
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
    const [estimatedCost, setEstimatedCost] = useState<number>(0)
    const [selectedPaymentType, setSelectedPaymentType] = useState<"qr" | "tarjeta" | null>(null)

    useEffect(() => {
        if (isOpen) {
            fetchEstaciones()
            fetchPaymentMethods()
            setStep("stations")
            setSelectedOrigin(null)
            setSelectedDestination(null)
            setSelectedPaymentMethod(null)
            setEstimatedCost(0)
        }
    }, [isOpen])

    const fetchEstaciones = async () => {
        setLoadingData(true)
        try {
            const authToken = localStorage.getItem("authToken")
            const response = await callApi("/estaciones", "GET")

            if (response) {
                const data = await response.data
                setEstaciones(data)
            }
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setLoadingData(false)
        }
    }

    const fetchPaymentMethods = async () => {
        try {

            const response = await callApi("/MetodoDePagos", "GET")

            if (response) {
                const methods = await response.data
                setPaymentMethods(methods)
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const calculateCost = (origin: Estacion, destination: Estacion) => {
        
        return 500
    }

    const handleStationSelection = (station: Estacion, type: "origin" | "destination") => {
        if (type === "origin") {
            setSelectedOrigin(station)
            if (selectedDestination && station.id !== selectedDestination.id) {
                setEstimatedCost(calculateCost(station, selectedDestination))
            }
        } else {
            setSelectedDestination(station)
            if (selectedOrigin && station.id !== selectedOrigin.id) {
                setEstimatedCost(calculateCost(selectedOrigin, station))
            }
        }
    }

    const handleContinueToPayment = () => {
        if (selectedOrigin && selectedDestination && selectedOrigin.id !== selectedDestination.id) {
            setStep("payment")
        }
    }

    const handlePaymentTypeSelect = (type: "qr" | "tarjeta") => {
        setSelectedPaymentType(type)
    }

   const handleConfirmTravel = () => {
    if (selectedOrigin && selectedDestination && selectedPaymentType) {
       
        const PAYMENT_METHOD_IDS = {
            QR: 6,   
            TARJETA: 7,   
    
        };

        const travelData = {
            estacionOrigenId: selectedOrigin.id,
            estacionDestinoId: selectedDestination.id,
            metodoPagoId: selectedPaymentType === 'qr' 
                ? PAYMENT_METHOD_IDS.QR 
                : PAYMENT_METHOD_IDS.TARJETA,
            monto: estimatedCost,
        };
        
        onTravel(travelData);
    }
};
    const getProviderIcon = (proveedor: string) => {
        const provider = proveedor.toLowerCase()
        if (provider.includes("visa")) return "💳"
        if (provider.includes("mastercard")) return "💳"
        if (provider.includes("paypal")) return "🅿️"
        if (provider.includes("mercadopago")) return "💙"
        if (provider.includes("uala")) return "💛"
        if (provider.includes("naranja")) return "🧡" 
        return "💳"
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            {step === "payment" && (
                                <button
                                    onClick={() => setStep("stations")}
                                    className="mr-3 p-1 hover:bg-gray-100 rounded-full"
                                    disabled={isLoading}
                                >
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}
                            <h2 className="text-xl font-bold text-gray-900">
                                {step === "stations" ? "Seleccionar Ruta" : "Método de Pago"}
                            </h2>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" disabled={isLoading}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {step === "stations" && (
                        <div className="space-y-4">
                            {/* Estación Origen */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Estación de Origen</label>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {estaciones.map((estacion) => (
                                        <button
                                            key={`origin-${estacion.id}`}
                                            onClick={() => handleStationSelection(estacion, "origin")}
                                            className={`w-full p-3 text-left border rounded-lg transition-colors ${selectedOrigin?.id === estacion.id
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <span className="text-lg mr-3">🚇</span>
                                                <span className="font-medium">{estacion.ubicacion}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Estación Destino */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Estación de Destino</label>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {estaciones.map((estacion) => (
                                        <button
                                            key={`destination-${estacion.id}`}
                                            onClick={() => handleStationSelection(estacion, "destination")}
                                            disabled={selectedOrigin?.id === estacion.id}
                                            className={`w-full p-3 text-left border rounded-lg transition-colors ${selectedDestination?.id === estacion.id
                                                ? "border-blue-500 bg-blue-50"
                                                : selectedOrigin?.id === estacion.id
                                                    ? "border-gray-200 bg-gray-100 cursor-not-allowed opacity-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                <span className="text-lg mr-3">🚇</span>
                                                <span className="font-medium">{estacion.ubicacion}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Resumen de Ruta */}
                            {selectedOrigin && selectedDestination && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-green-700">
                                                <span className="font-medium">{selectedOrigin.nombre}</span> →{" "}
                                                <span className="font-medium">{selectedDestination.nombre}</span>
                                            </p>
                                            <p className="text-lg font-bold text-green-800">${estimatedCost.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleContinueToPayment}
                                disabled={!selectedOrigin || !selectedDestination || selectedOrigin.id === selectedDestination.id}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continuar
                            </button>
                        </div>
                    )}

                    {step === "payment" && (
                        <div className="space-y-4">
                            {/* Resumen del viaje */}
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <span className="font-medium">{selectedOrigin?.nombre}</span> →{" "}
                                    <span className="font-medium">{selectedDestination?.nombre}</span>
                                </p>
                                <p className="text-lg font-bold text-blue-800">${estimatedCost.toFixed(2)}</p>
                            </div>

                            {/* Métodos de pago */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionarr método de pago</label>
                                <div className="space-y-3">
                                    {/* Opción QR */}
                                    <button
                                        onClick={() => handlePaymentTypeSelect("qr")}
                                        className={`w-full p-4 text-left border rounded-lg transition-colors ${selectedPaymentType === "qr"
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-3xl mr-4">📱</span>
                                            <div>
                                                <p className="font-medium text-gray-900">Código QR</p>
                                                <p className="text-sm text-gray-500">Pago rápido con código QR</p>
                                            </div>
                                            {selectedPaymentType === "qr" && (
                                                <svg className="w-5 h-5 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </button>

                                    {/* Opción Tarjeta */}
                                    <button
                                        onClick={() => handlePaymentTypeSelect("tarjeta")}
                                        className={`w-full p-4 text-left border rounded-lg transition-colors ${selectedPaymentType === "tarjeta"
                                                ? "border-blue-500 bg-blue-50"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-3xl mr-4">💳</span>
                                            <div>
                                                <p className="font-medium text-gray-900">Tarjeta</p>
                                                <p className="text-sm text-gray-500">Pago con tarjeta física</p>
                                            </div>
                                            {selectedPaymentType === "tarjeta" && (
                                                <svg className="w-5 h-5 text-blue-500 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleConfirmTravel}
                                disabled={!selectedPaymentType || isLoading}
                                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Procesando...
                                    </>
                                ) : (
                                    "Confirmar Viaje"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function TravelHistoryModal({ isOpen, onClose }: TravelHistoryModalProps) {
    const [viajes, setViajes] = useState<Viaje[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<"history" | "stats">("history")

    useEffect(() => {
        if (isOpen) {
            fetchViajes()
        }
    }, [isOpen])

    const fetchViajes = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const userId = localStorage.getItem("userId")


            const response = await callApi(`/viajes/traer/usuario/${userId}`, "GET",)

            if (response) {
                const data = await response.data
                setViajes(data)
            } else {
                throw new Error("Error al cargar el historial de viajes")
            }
        } catch (error: any) {
            setError(error.message || "Error al cargar el historial de viajes")
        } finally {
            setIsLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getWeeklyExpenses = () => {
        const now = new Date()
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

        return viajes
            .filter((viaje) => new Date(viaje.fechaHora) >= oneWeekAgo)
            .reduce((total, viaje) => total + viaje.monto, 0)
    }

    const getMonthlyExpenses = () => {
        const now = new Date()
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

        return viajes
            .filter((viaje) => new Date(viaje.fechaHora) >= oneMonthAgo)
            .reduce((total, viaje) => total + viaje.monto, 0)
    }

    const getProviderIcon = (proveedor: string) => {
        const provider = proveedor.toLowerCase()
        if (provider.includes("qr")) return "📱"
        if (provider.includes("tarjeta")) return "💳"
        if (provider.includes("paypal")) return "🅿️"
        if (provider.includes("mercadopago")) return "💙"
        if (provider.includes("banco")) return "🏦"
        if (provider.includes("efectivo")) return "💵"
        return "💳"
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900">Historial de Viajes</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex mt-4 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "history" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Historial
                        </button>
                        <button
                            onClick={() => setActiveTab("stats")}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "stats" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Estadísticas
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {isLoading ? (
                        <div className="text-center py-8">
                            <svg
                                className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            <p className="text-gray-600">Cargando historial...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <svg
                                className="w-12 h-12 text-red-400 mx-auto mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button onClick={fetchViajes} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Reintentar
                            </button>
                        </div>
                    ) : (
                        <>
                            {activeTab === "history" && (
                                <div className="space-y-4">
                                    {viajes.length > 0 ? (
                                        viajes.map((viaje) => (
                                            <div key={viaje.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="flex-shrink-0">
                                                            <span className="text-2xl">🚇</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {viaje.estacionOrigen.ubicacion} → {viaje.estacionDestino.ubicacion}
                                                            </p>
                                                            <div className="flex items-center space-x-2 mt-1">
                                                                <span className="text-lg">{getProviderIcon(viaje.metodoDePago.proveedor)}</span>
                                                                <p className="text-sm text-gray-500">{viaje.metodoDePago.proveedor}</p>
                                                            </div>
                                                            <p className="text-xs text-gray-400">{formatDate(viaje.fechaHora)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-semibold text-red-600">-${viaje.monto.toFixed(2)}</p>
                                                        <p className="text-xs text-gray-500">ID: {viaje.id}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <svg
                                                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6"
                                                />
                                            </svg>
                                            <p className="text-gray-600">No tienes viajes registrados</p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Tus viajes aparecerán aquí una vez que realices alguno
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "stats" && (
                                <div className="space-y-6">
                                    {/* Estadísticas de gastos */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-blue-900">Gastos Semanales</p>
                                                    <p className="text-2xl font-bold text-blue-600">${getWeeklyExpenses().toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-green-900">Gastos Mensuales</p>
                                                    <p className="text-2xl font-bold text-green-600">${getMonthlyExpenses().toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Resumen general */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen General</h3>
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900">{viajes.length}</p>
                                                <p className="text-sm text-gray-600">Total de Viajes</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    ${viajes.reduce((total, viaje) => total + viaje.monto, 0).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-600">Total Gastado</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

interface RechargeModalProps {
    isOpen: boolean
    onClose: () => void
    onRecharge: (amount: number, paymentMethodId: number | null) => void
    isLoading: boolean
}

const DashboardProfile: React.FC<RechargeModalProps> = ({
    isOpen,
    onClose,
    onRecharge,
    isLoading
}) => {
    const [amount, setAmount] = useState("")
    const [step, setStep] = useState<"methods" | "amount">("methods")
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
    const [loadingMethods, setLoadingMethods] = useState(false)

    useEffect(() => {
        if (isOpen) {
            fetchPaymentMethods()
            setStep("methods")
            setSelectedMethod(null)
            setAmount("")
        }
    }, [isOpen])

    const fetchPaymentMethods = async () => {
        setLoadingMethods(true)
        try {

            const response = await callApi("/MetodoDePagos", "GET")

            if (response) {
                const methods = await response.data
                setPaymentMethods(methods)
            } else {
                throw new Error("Error al cargar métodos de pago")
            }
        } catch (error) {
            console.error("Error:", error)
            setPaymentMethods([])
        } finally {
            setLoadingMethods(false)
        }
    }

    const handleBack = () => {
        setStep("methods")
        setSelectedMethod(null)
    }

    const getProviderIcon = (proveedor: string) => {
        const provider = proveedor.toLowerCase()
        if (provider.includes("visa")) {
            return "💳"
        } else if (provider.includes("mastercard")) {
            return "💳"
        } else if (provider.includes("uala")) {
            return "💛"
        } else if (provider.includes("naranja")) {
            return "🧡"
        } else if (provider.includes("banco")) {
            return "🏦"
        } else if (provider.includes("efectivo")) {
            return "💵"
        }
        return "💳"
    }

    const handleMethodSelect = (method: PaymentMethod) => {
        setSelectedMethod(method)
        setStep("amount")
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const numAmount = Number.parseFloat(amount)
        if (numAmount > 0 && selectedMethod) {
            onRecharge(numAmount, selectedMethod.id)
            setAmount("")
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            {step === "amount" && (
                                <button onClick={handleBack} className="mr-3 p-1 hover:bg-gray-100 rounded-full" disabled={isLoading}>
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}
                            <h2 className="text-xl font-bold text-gray-900">
                                {step === "methods" ? "Seleccionar Método de Pago" : "Ingresar Monto"}
                            </h2>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" disabled={isLoading}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {step === "methods" && (
                        <div className="space-y-4">
                            {loadingMethods ? (
                                <div className="text-center py-8">
                                    <svg
                                        className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    <p className="text-gray-600">Cargando métodos de pago...</p>
                                </div>
                            ) : paymentMethods.length > 0 ? (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => handleMethodSelect(method)}
                                            className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-left"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <span className="text-2xl mr-3">{getProviderIcon(method.proveedor)}</span>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{method.proveedor}</p>
                                                        <p className="text-sm text-gray-500">{method.tipo}</p>
                                                    </div>
                                                </div>
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg
                                        className="w-12 h-12 text-gray-400 mx-auto mb-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                                        />
                                    </svg>
                                    <p className="text-gray-600">No hay métodos de pago disponibles</p>
                                </div>
                            )}
                        </div>
                    )}

                    {step === "amount" && selectedMethod && (
                        <div className="space-y-4">

                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-center">
                                    <span className="text-xl mr-3">{getProviderIcon(selectedMethod.proveedor)}</span>
                                    <div>
                                        <p className="font-medium text-blue-900">{selectedMethod.proveedor}</p>
                                        <p className="text-sm text-blue-700">{selectedMethod.tipo}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                                        Monto a recargar
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            id="amount"
                                            type="number"
                                            step="0.01"
                                            min="1"
                                            placeholder="0.00"
                                            className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>


                                <div className="mb-4">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Montos sugeridos:</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[500, 800, 1000, 1500, 2000, 3000].map((suggestedAmount) => (
                                            <button
                                                key={suggestedAmount}
                                                type="button"
                                                onClick={() => setAmount(suggestedAmount.toString())}
                                                className="py-2 px-3 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                disabled={isLoading}
                                            >
                                                ${suggestedAmount}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={isLoading}
                                    >
                                        Cambiar Método
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading || !amount || Number.parseFloat(amount) <= 0}
                                        className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Procesando...
                                            </>
                                        ) : (
                                            "Recargar"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isRecharging, setIsRecharging] = useState(false)
    const [showRechargeModal, setShowRechargeModal] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
    const [showHistoryModal, setShowHistoryModal] = useState(false)
    const [showTravelModal, setShowTravelModal] = useState(false)
    const [showTravelHistoryModal, setShowTravelHistoryModal] = useState(false)
    const [isTraveling, setIsTraveling] = useState(false)
    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        try {
            const userId = localStorage.getItem("userId")


            if (!userId) {
                window.location.href = "/auth"
                return
            }

            const response = await callApi(`/usuarios/traer`, "POST"
                , {
                    id: userId
                }
            )

            if (response) {
                const userData = response.data
                setUser(userData)
            } else {
                throw new Error("Error al obtener datos del usuario")
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error al cargar los datos del usuario" })
            console.error("Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRecharge = async (amount: number, paymentMethodId: number | null) => {
        setIsRecharging(true)
        setMessage(null)

        try {
            const userId = localStorage.getItem("userId")



            const response = await callApi(`/recargas/crear`, "POST",
                {
                    monto: amount,
                    fecha: new Date().toISOString(),
                    usuarioId: userId,
                    metodoPagoId: paymentMethodId
                }
            )


            const data = await response.data

            if (response) {
                setMessage({ type: "success", text: `Saldo recargado exitosamente: $${amount.toFixed(2)}` })
                setShowRechargeModal(false)
                // Actualizar los datos del usuario
                await fetchUserData()
            } else {
                throw new Error(data.message || "Error al recargar saldo")
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Error al recargar saldo" })
        } finally {
            setIsRecharging(false)
        }
    }

    const handleTravel = async (travelData: any) => {
        setIsTraveling(true)
        setMessage(null)

        try {
            const userId = localStorage.getItem("userId")
            const authToken = localStorage.getItem("authToken")



            const response = await callApi(`/viajes/crear`, "POST",
                {
                    ...travelData,
                    usuarioId: userId,
                    fechaHora: new Date().toISOString()
                }
            )

            const data = await response.data;

            if (response) {
                setMessage({ type: "success", text: `Viaje realizado exitosamente. Costo: $${travelData.monto.toFixed(2)}` })
                setShowTravelModal(false)
                // Actualizar los datos del usuario
                await fetchUserData()
            } else {
                throw new Error(data.message || "Error al realizar el viaje")
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message || "Error al realizar el viaje" })
        } finally {
            setIsTraveling(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("authToken")
        window.location.href = "/auth"
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <svg
                        className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <p className="text-gray-600">Cargando datos del usuario...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error al cargar los datos del usuario</p>
                    <button
                        onClick={() => (window.location.href = "/login")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Volver al Login
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-semibold text-gray-900">Mi Cuenta</h1>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-md border ${message.type === "error"
                            ? "bg-red-50 border-red-200 text-red-700"
                            : "bg-green-50 border-green-200 text-green-700"
                            }`}
                    >
                        <p className="text-sm">{message.text}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="text-center">
                                <h2 className="text-lg font-medium text-gray-900 mb-2">Saldo Disponible</h2>
                                <div className="text-3xl font-bold text-green-600 mb-4">${user.saldo.toFixed(2)}</div>
                                <button
                                    onClick={() => setShowRechargeModal(true)}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Recargar Saldo
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="px-6 py-4 border-b">
                                <h2 className="text-lg font-medium text-gray-900">Información Personal</h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                        <div className="p-3 bg-gray-50 rounded-md border">
                                            <p className="text-gray-900">{user.nombre}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                        <div className="p-3 bg-gray-50 rounded-md border">
                                            <p className="text-gray-900">{user.apellido}</p>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <div className="p-3 bg-gray-50 rounded-md border">
                                            <p className="text-gray-900">{user.email}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
                                        <div className="p-3 bg-gray-50 rounded-md border">
                                            <p className="text-gray-900">{user.tipo_documento}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Número de Documento</label>
                                        <div className="p-3 bg-gray-50 rounded-md border">
                                            <p className="text-gray-900">{user.numero_documento}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-white rounded-lg shadow-sm border">
                        <div className="px-6 py-4 border-b">
                            <h2 className="text-lg font-medium text-gray-900">Acciones Rápidas</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <button
                                    onClick={() => setShowHistoryModal(true)}
                                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900">Historial</p>
                                        <p className="text-sm text-gray-500">Ver movimientos</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setShowTravelModal(true)}
                                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6"
                                        />
                                    </svg>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900">Viajar</p>
                                        <p className="text-sm text-gray-500">Simular viaje</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setShowTravelHistoryModal(true)}
                                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900">Historial de Viajes</p>
                                        <p className="text-sm text-gray-500">Ver estadísticas</p>
                                    </div>
                                </button>

                                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <svg className="w-8 h-8 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <div className="text-left">
                                        <p className="font-medium text-gray-900">Configuración</p>
                                        <p className="text-sm text-gray-500">Ajustes de cuenta</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <DashboardProfile
                isOpen={showRechargeModal}
                onClose={() => setShowRechargeModal(false)}
                onRecharge={handleRecharge}
                isLoading={isRecharging}
            />
            <HistoryModal isOpen={showHistoryModal} onClose={() => setShowHistoryModal(false)} />
            <TravelModal
                isOpen={showTravelModal}
                onClose={() => setShowTravelModal(false)}
                onTravel={handleTravel}
                isLoading={isTraveling}
            />

            <TravelHistoryModal isOpen={showTravelHistoryModal} onClose={() => setShowTravelHistoryModal(false)} />
        </div>
    )
}
