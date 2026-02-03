import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { User, Vehicle } from '../types';

interface RegisterProps {
  onRegister: (user: Omit<User, 'id'>) => User;
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
 * Tela de cadastro de novos usuários.
 * Permite ao usuário informar dados pessoais e do veículo para se registrar.
 */
export default function RegisterPage({ onRegister }: RegisterProps) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [militaryId, setMilitaryId] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleType, setVehicleType] = useState<'carro' | 'moto'>('carro');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [cnhDocument, setCnhDocument] = useState<File | undefined>(undefined);
  const [document, setDocument] = useState<File | undefined>(undefined);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicle: Vehicle = {
      type: vehicleType,
      model,
      color,
      plate,
      document,
    };
    const newUser: Omit<User, 'id'> = {
      name,
      cpf,
      militaryId,
      password,
      cnh: cnhDocument,
      vehicle,
    };
    onRegister(newUser);
    // Após o cadastro, redireciona para a página de login
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-green-900 px-4">
      <div className="bg-slate-900/90 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-xl border border-green-700/30">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-400">Cadastro de Usuário</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              maxLength={14}
              required
              className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              placeholder="000.000.000-00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Identidade Militar</label>
            <input
              type="text"
              value={militaryId}
              onChange={(e) => setMilitaryId(e.target.value)}
              required
              className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              placeholder="Número da identidade militar"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
              placeholder="********"
            />
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
            <p className="text-xs text-gray-400 mt-1">Envie sua CNH em PDF ou imagem. Este arquivo não será salvo nesta demonstração.</p>
          </div>
          <hr className="my-4 border-gray-700" />
          <h2 className="text-lg font-semibold text-green-400">Dados do veículo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Tipo</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as 'carro' | 'moto')}
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
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
                placeholder="Ex.: Corolla, CG 160"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Cor</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2"
                placeholder="Ex.: Preto, Vermelho"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Placa</label>
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                required
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2 uppercase"
                placeholder="AAA0A00"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Documento do veículo</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setDocument(file);
                }}
                className="mt-1 block w-full rounded-md bg-slate-800 border-gray-600 text-gray-100 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50 px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-green-700 file:text-white hover:file:bg-green-600"
              />
              <p className="text-xs text-gray-400 mt-1">Envie o CRLV em PDF ou imagem. Este arquivo não será salvo nesta demonstração.</p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors font-medium mt-4"
          >
            Finalizar cadastro
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Já possui conta?{' '}
          <Link className="text-green-400 hover:text-green-300 hover:underline font-medium" to="/login">
            Acesse
          </Link>
        </p>
      </div>
    </div>
  );
}