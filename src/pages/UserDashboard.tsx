import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface DashboardProps {
  user: User;
  onSave: (user: User) => void;
}

/**
 * Página de dashboard para usuários comuns. Exibe e permite atualizar
 * informações pessoais e do veículo associado.
 */
export default function UserDashboard({ user, onSave }: DashboardProps) {
  // Estado local para edição das informações
  const [form, setForm] = useState<User>({ ...user });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('vehicle.')) {
      const key = name.replace('vehicle.', '') as keyof User['vehicle'];
      setForm((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    alert('Dados atualizados com sucesso!');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Meu Perfil</h1>
        <button
          onClick={() => navigate('/login')}
          className="text-sm text-accent hover:underline"
        >
          Sair
        </button>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
            />
          </div>
        </div>
        <hr />
        <h2 className="text-lg font-semibold text-primary">Veículo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              name="vehicle.type"
              value={form.vehicle.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
            >
              <option value="carro">Carro</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              name="vehicle.model"
              value={form.vehicle.model}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cor</label>
            <input
              type="text"
              name="vehicle.color"
              value={form.vehicle.color}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Placa</label>
            <input
              type="text"
              name="vehicle.plate"
              value={form.vehicle.plate}
              onChange={(e) => {
                // converte para maiúsculas
                e.target.value = e.target.value.toUpperCase();
                handleChange(e);
              }}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2 uppercase"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-dark transition-colors font-medium"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}