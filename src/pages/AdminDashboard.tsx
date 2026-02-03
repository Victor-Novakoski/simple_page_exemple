import { Link } from 'react-router-dom';
import type { User } from '../types';
import type { ChangeEvent } from 'react';

interface AdminProps {
  users: User[];
  onUpdateUser: (user: User) => void;
}

/**
 * Painel administrativo para visualização e edição de todos os usuários e veículos.
 * Permite que o administrador atribua número de vaga e indique se o veículo é titular ou reserva.
 */
export default function AdminDashboard({ users, onUpdateUser }: AdminProps) {
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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Área Administrativa</h1>
      {users.length === 0 ? (
        <p className="text-gray-600">Nenhum usuário cadastrado.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cor</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaga</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titular/Reserva</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crachá</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{user.cpf}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{user.vehicle.model}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{user.vehicle.color}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 uppercase">{user.vehicle.plate}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    <input
                      type="text"
                      value={user.vehicle.parkingNumber || ''}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => updateVehicleField(user, 'parkingNumber', e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    <select
                      value={user.vehicle.titular ? 'titular' : 'reserva'}
                      onChange={(e) => updateVehicleField(user, 'titular', e.target.value === 'titular' ? 'true' : 'false')}
                      className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="titular">Titular</option>
                      <option value="reserva">Reserva</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    <Link to={`/badge/${user.id}`} className="text-accent hover:underline">
                      Gerar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}