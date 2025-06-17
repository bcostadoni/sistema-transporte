import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { callApi } from "../../helpers/axios_helper"


interface User {
  id_usuario: number
  nombre: string
  apellido: string
  email: string
  password: string
  tipo_documento: string
  numero_documento: string
  saldo: number
}


export const UserList: React.FC = () => {

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState<boolean>(true)

     let navigate = useNavigate()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        
    
        setLoading(true)
        try {
    
          const response = await callApi(`/usuarios/traer`, "GET")
    
          if (!response) {
            throw new Error("Failed to fetch clinics")
          }
    
    
          setUsers(response.data)
        } catch (error) {
          console.error("Error fetching users:", error)
        } finally {
          setLoading(false)
        }
      }


  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Lista de Usuarios</h2>

      {users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay usuarios registrados. Crea un usuario para comenzar.
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
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Documento
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Saldo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id_usuario} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id_usuario}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.nombre} {user.apellido}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.tipo_documento}: {user.numero_documento}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.saldo.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
