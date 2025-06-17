import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { callApi } from "../../helpers/axios_helper"
interface AuthResponse {
    
        id: string
        name: string
        email: string
    
}

export const AuthForm: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    // Estados para Login
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        tipo_documento: "",
        numero_documento: "",
        password: "",
        confirmPassword: "",
    })

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        try {
            const response = await callApi(
                "/usuarios/index",  
                "POST",            
                {                 
                    email: loginData.email,
                    password: loginData.password
                }
            );

            const data: AuthResponse = await response.data
            console.log(data)

            if (response) {
                setMessage({ type: "success", text: "Inicio de sesión exitoso" })

                if (data?.id) {
                    localStorage.setItem("userId", data.id)
                    navigate("/")
                }

                console.log("Usuario logueado:", data)
            } else {message 
                setMessage({ type: "error", text: data.id|| "Error al iniciar sesión" })
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error de conexión con el servidor" })
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        if (registerData.password !== registerData.confirmPassword) {
            setMessage({ type: "error", text: "Las contraseñas no coinciden" })
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch("http://localhost:8080/usuarios/crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: registerData.nombre,
                    apellido: registerData.apellido,
                    email: registerData.email,
                    password: registerData.password,
                    numero_documento: registerData.numero_documento,
                    tipo_documento: registerData.tipo_documento,
                    saldo: 0,
                }),
            })

            const data: AuthResponse = await response.json()

            if (response.ok) {
                setMessage({ type: "success", text: "Registro exitoso. Ya puedes iniciar sesión." })


                setRegisterData({
                    nombre: "",
                    apellido: "",
                    email: "",
                    tipo_documento: "",
                    numero_documento: "",
                    password: "",
                    confirmPassword: "",
                })
            } else {
                setMessage({ type: "error", text:"Error al registrarse" })
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error de conexión con el servidor" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md">
                <div className="p-6 pb-4 text-center border-b">
                    <h1 className="text-2xl font-bold text-gray-900">Autenticación</h1>
                    <p className="text-gray-600 mt-1">Inicia sesión o crea una nueva cuenta</p>
                </div>

                <div className="p-6">
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={() => setActiveTab("register")}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === "register" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            Registrarse
                        </button>
                    </div>


                    {message && (
                        <div
                            className={`mb-4 p-4 rounded-md border ${message.type === "error"
                                ? "bg-red-50 border-red-200 text-red-700"
                                : "bg-green-50 border-green-200 text-green-700"
                                }`}
                        >
                            <p className="text-sm">{message.text}</p>
                        </div>
                    )}

                    {activeTab === "login" && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="login-email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={loginData.email}
                                        onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Tu contraseña"
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                        Iniciando sesión...
                                    </>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </button>
                        </form>
                    )}

                    {activeTab === "register" && (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="register-name"
                                        type="text"
                                        placeholder="Tu nombre"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={registerData.nombre}
                                        onChange={(e) => setRegisterData((prev) => ({ ...prev, nombre: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="register-apellido" className="block text-sm font-medium text-gray-700 mb-1">
                                    Apellido
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="register-apellido"
                                        type="text"
                                        placeholder="Tu Apellido"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={registerData.apellido}
                                        onChange={(e) => setRegisterData((prev) => ({ ...prev, apellido: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="register-email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="register-tipo_documento" className="block text-sm font-medium text-gray-700 mb-1">
                                    Tipo de Documento
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="register-tipo_documento"
                                        type="tipo_documento"
                                        placeholder="Tipo de documento"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={registerData.tipo_documento}
                                        onChange={(e) => setRegisterData((prev) => ({ ...prev, tipo_documento: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="register-numero_documento" className="block text-sm font-medium text-gray-700 mb-1">
                                    Numero de Documento
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="register-numero_documento"
                                        type="numero_documento"
                                        placeholder="Numero de documento"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={registerData.numero_documento}
                                        onChange={(e) => setRegisterData((prev) => ({ ...prev, numero_documento: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="register-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Tu contraseña"
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                                />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmar contraseña
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        id="confirm-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirma tu contraseña"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={registerData.confirmPassword}
                                        onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                        Registrando...
                                    </>
                                ) : (
                                    "Crear Cuenta"
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t text-center">
                    <p className="text-sm text-gray-600">Al registrarte, aceptas nuestros términos y condiciones</p>
                </div>
            </div>
        </div>
    )
}
