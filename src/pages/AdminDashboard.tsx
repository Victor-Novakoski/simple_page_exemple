import { Link, useNavigate } from 'react-router-dom';
import UserModal from '../components/UserModal';
import type { User } from '../types';
import { useState, type ChangeEvent } from 'react';

interface AdminProps {
  users: User[];
  onUpdateUser: (user: User) => void;
}

/**
 * Painel administrativo para visualização e edição de todos os usuários e veículos.
 * Permite que o administrador atribua número de vaga e indique se o veículo é titular ou reserva.
 */
export default function AdminDashboard({ users, onUpdateUser }: AdminProps) {
  // Hook para navegação programática
  const navigate = useNavigate();

  // Usuário selecionado para exibição/edição detalhada no modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  /**
   * Atualiza campos específicos do veículo para determinado usuário
   */
  const updateVehicleField = (user: User, field: keyof User['vehicle'], value: string) => {
    // Converte o valor para o tipo correto
    let parsed: any = value;
    if (field === 'titular') {
      // Converte 'true' ou 'false' em booleano
      parsed = value === 'true' || value === 'titular';
    }
    const updatedUser: User = {
      ...user,
      vehicle: {
        ...user.vehicle,
        [field]: parsed,
      },
    };
    onUpdateUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-green-900">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-400">Área Administrativa</h1>
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-green-400 hover:text-green-300 hover:underline"
          >
            Sair
          </button>
        </div>
        {users.length === 0 ? (
          <p className="text-gray-400">Nenhum usuário cadastrado.</p>
        ) : (
          <div className="overflow-x-auto bg-slate-900/90 backdrop-blur-sm rounded-lg shadow-2xl border border-green-700/30">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">CPF</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Modelo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cor</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Placa</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vaga</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Titular/Reserva</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100">{user.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100">{user.cpf}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100">{user.vehicle.model}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100">{user.vehicle.color}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100 uppercase">{user.vehicle.plate}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100">
                      <input
                        type="text"
                        value={user.vehicle.parkingNumber || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateVehicleField(user, 'parkingNumber', e.target.value)}
                        className="w-20 px-2 py-1 bg-slate-700 border border-gray-600 text-gray-100 rounded-md text-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                      />
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-100">
                      <select
                        value={user.vehicle.titular ? 'titular' : 'reserva'}
                        onChange={(e) => updateVehicleField(user, 'titular', e.target.value === 'titular' ? 'true' : 'false')}
                        className="px-2 py-1 bg-slate-700 border border-gray-600 text-gray-100 rounded-md text-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                      >
                        <option value="titular">Titular</option>
                        <option value="reserva">Reserva</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 space-x-3">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-accent hover:underline"
                      >
                        Detalhes
                      </button>
                      <Link to={`/badge/${user.id}`} className="text-green-400 hover:text-green-300 hover:underline">
                        Crachá
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            onSave={(updatedUser) => {
              onUpdateUser(updatedUser);
              setSelectedUser(null);
            }}
          />
        )}
      </div>
    </div>
  );
}