import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { User, Vehicle } from '../types';

interface RegisterProps {
  onRegister: (user: Omit<User, 'id'>) => User;
}

/**
 * Tela de cadastro de novos usuários.
 * Permite ao usuário informar dados pessoais e do veículo para se registrar.
 */
export default function RegisterPage({ onRegister }: RegisterProps) {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleType, setVehicleType] = useState<'carro' | 'moto'>('carro');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
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
      password,
      vehicle,
    };
    onRegister(newUser);
    // Após o cadastro, redireciona para a página de login
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">Cadastro de Usuário</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
              placeholder="00000000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
              placeholder="********"
            />
          </div>
          <hr className="my-4" />
          <h2 className="text-lg font-semibold text-primary">Dados do veículo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as 'carro' | 'moto')}
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
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
                placeholder="Ex.: Corolla, CG 160"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cor</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
                placeholder="Ex.: Preto, Vermelho"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Placa</label>
              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2 uppercase"
                placeholder="AAA0A00"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Documento do veículo</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setDocument(file);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">Envie o CRLV em PDF ou imagem. Este arquivo não será salvo nesta demonstração.</p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-dark transition-colors font-medium mt-4"
          >
            Finalizar cadastro
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Já possui conta?{' '}
          <Link className="text-accent hover:underline font-medium" to="/login">
            Acesse
          </Link>
        </p>
      </div>
    </div>
  );
}