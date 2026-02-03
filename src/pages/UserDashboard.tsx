import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';

interface DashboardProps {
  user: User;
  onSave: (user: User) => void;
}

// Função para formatar CPF
const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
};

/**
 * Página de dashboard para usuários comuns. Exibe e permite atualizar
 * informações pessoais e do veículo associado.
 */
export default function UserDashboard({ user, onSave }: DashboardProps) {
  // Estado local para edição das informações
  const [form, setForm] = useState<User>({ ...user });
  const [cnhDocument, setCnhDocument] = useState<File | undefined>(user.cnh);
  const [vehicleDocument, setVehicleDocument] = useState<File | undefined>(user.vehicle.document);
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

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setForm((prev) => ({ ...prev, cpf: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Atualiza os documentos no formulário antes de salvar
    const updatedForm = {
      ...form,
      cnh: cnhDocument,
      vehicle: {
        ...form.vehicle,
        document: vehicleDocument,
      },
    };
    onSave(updatedForm);
    alert('Dados atualizados com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-green-900">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-400">Meu Perfil</h1>
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-green-400 hover:text-green-300 hover:underline"
          >
            Sair
          </button>
        </div>
        <form onSubmit={handleSubmit} className="bg-slate-900/90 backdrop-blur-sm p-6 rounded-lg shadow-2xl space-y-6 border border-green-700/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Nome</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">CPF</label>
              <input
                type="text"
                name="cpf"
                value={form.cpf}
                onChange={handleCpfChange}
                maxLength={14}
                required
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Identidade Militar</label>
              <input
                type="text"
                name="militaryId"
                value={form.militaryId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Senha</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">CNH (Carteira Nacional de Habilitação)</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setCnhDocument(file);
              }}
              className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-green-700 file:text-white hover:file:bg-green-600"
            />
            <p className="text-xs text-gray-400 mt-1">
              {cnhDocument ? `Arquivo atual: ${cnhDocument.name}` : 'Nenhum arquivo enviado. Envie sua CNH em PDF ou imagem.'}
            </p>
          </div>
          <hr className="border-gray-700" />
          <h2 className="text-lg font-semibold text-green-400">Veículo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Tipo</label>
              <select
                name="vehicle.type"
                value={form.vehicle.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              >
                <option value="carro">Carro</option>
                <option value="moto">Moto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Modelo</label>
              <input
                type="text"
                name="vehicle.model"
                value={form.vehicle.model}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Cor</label>
              <input
                type="text"
                name="vehicle.color"
                value={form.vehicle.color}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Placa</label>
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
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2 uppercase"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Documento do Veículo</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setVehicleDocument(file);
              }}
              className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-green-700 file:text-white hover:file:bg-green-600"
            />
            <p className="text-xs text-gray-400 mt-1">
              {vehicleDocument ? `Arquivo atual: ${vehicleDocument.name}` : 'Nenhum arquivo enviado. Envie o CRLV em PDF ou imagem.'}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors font-medium"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}