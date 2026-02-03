import { useState } from 'react';
import type { User } from '../types';

interface UserModalProps {
  /** Usuário selecionado para edição */
  user: User;
  /** Função chamada quando o modal deve ser fechado sem salvar */
  onClose: () => void;
  /** Função chamada ao salvar as alterações no usuário */
  onSave: (user: User) => void;
}

/**
 * Componente de modal para visualização e edição de um usuário. Ele exibe duas abas:
 * uma para os dados pessoais (nome, CPF e senha) e outra para os dados do veículo.
 * O administrador pode modificar qualquer campo e salvar as alterações.
 */
export default function UserModal({ user, onClose, onSave }: UserModalProps) {
  // aba ativa: 'dados' ou 'veiculo'
  const [activeTab, setActiveTab] = useState<'dados' | 'veiculo'>('dados');
  // Mantém um estado local do usuário sendo editado. Cada campo é atualizado ao digitar.
  const [editUser, setEditUser] = useState<User>(user);

  /**
   * Atualiza um campo de nível superior do usuário, como nome, CPF ou senha.
   */
  const handleUserFieldChange = (field: keyof User, value: string) => {
    setEditUser((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Atualiza um campo do veículo associado ao usuário.
   */
  const handleVehicleFieldChange = (field: keyof User['vehicle'], value: any) => {
    setEditUser((prev) => ({
      ...prev,
      vehicle: {
        ...prev.vehicle,
        [field]: value,
      },
    }));
  };

  /**
   * Salva as alterações feitas no usuário e fecha o modal.
   */
  const handleSave = () => {
    onSave(editUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-slate-900/95 backdrop-blur-sm rounded-lg p-6 w-full max-w-md shadow-2xl relative border border-green-700/30">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-green-400">Editar Usuário</h2>
          <button onClick={onClose} aria-label="Fechar" className="text-gray-400 hover:text-green-400 text-2xl leading-none">×</button>
        </div>
        <div className="mb-4 border-b border-gray-700">
          <nav className="-mb-px flex space-x-6">
            <button
              className={`pb-2 ${activeTab === 'dados' ? 'border-b-2 border-green-500 font-semibold text-green-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('dados')}
            >
              Dados pessoais
            </button>
            <button
              className={`pb-2 ${activeTab === 'veiculo' ? 'border-b-2 border-green-500 font-semibold text-green-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('veiculo')}
            >
              Veículo
            </button>
          </nav>
        </div>
        {activeTab === 'dados' && (
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm text-gray-300">Nome</span>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => handleUserFieldChange('name', e.target.value)}
                className="mt-1 w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">CPF</span>
              <input
                type="text"
                value={editUser.cpf}
                onChange={(e) => handleUserFieldChange('cpf', e.target.value)}
                className="mt-1 w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">ID Militar</span>
              <input
                type="text"
                value={editUser.militaryId}
                onChange={(e) => handleUserFieldChange('militaryId', e.target.value)}
                className="mt-1 w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Senha</span>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="password"
                  value={editUser.password}
                  onChange={(e) => handleUserFieldChange('password', e.target.value)}
                  className="w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => handleUserFieldChange('password', '')}
                  className="text-xs text-green-400 underline hover:text-green-300"
                  title="Redefinir senha para em branco"
                >
                  Redefinir
                </button>
              </div>
            </label>
          </div>
        )}
        {activeTab === 'veiculo' && (
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm text-gray-300">Tipo</span>
              <select
                value={editUser.vehicle.type}
                onChange={(e) => handleVehicleFieldChange('type', e.target.value as 'carro' | 'moto')}
                className="mt-1 w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="carro">Carro</option>
                <option value="moto">Moto</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Modelo</span>
              <input
                type="text"
                value={editUser.vehicle.model}
                onChange={(e) => handleVehicleFieldChange('model', e.target.value)}
                className="mt-1 w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Cor</span>
              <input
                type="text"
                value={editUser.vehicle.color}
                onChange={(e) => handleVehicleFieldChange('color', e.target.value)}
                className="mt-1 w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Placa</span>
              <input
                type="text"
                value={editUser.vehicle.plate}
                onChange={(e) => handleVehicleFieldChange('plate', e.target.value.toUpperCase())}
                className="mt-1 w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Número da vaga</span>
              <input
                type="text"
                value={editUser.vehicle.parkingNumber || ''}
                onChange={(e) => handleVehicleFieldChange('parkingNumber', e.target.value)}
                className="mt-1 w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-300">Titular/Reserva</span>
              <select
                value={editUser.vehicle.titular ? 'titular' : 'reserva'}
                onChange={(e) => handleVehicleFieldChange('titular', e.target.value === 'titular')}
                className="mt-1 w-full bg-slate-800 border border-gray-600 text-gray-100 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="titular">Titular</option>
                <option value="reserva">Reserva</option>
              </select>
            </label>
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-green-700 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}