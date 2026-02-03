import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Propriedades aceitas pelo componente de login.
 * onLogin deve retornar um objeto informando se a autenticação foi bem-sucedida
 * e, se for o caso, a rota para redirecionamento.
 */
interface LoginProps {
  onLogin: (cpf: string, password: string) => { success: boolean; redirect?: string };
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
 * Tela de autenticação de usuários e administradores.
 * Permite que o usuário informe seu CPF e senha para entrar no sistema.
 */
export default function LoginPage({ onLogin }: LoginProps) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = onLogin(cpf, password);
    if (result.success && result.redirect) {
      // Limpa mensagem de erro e redireciona para a página apropriada
      setError('');
      navigate(result.redirect);
    } else {
      setError('CPF ou senha inválidos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-green-900 px-4">
      <div className="bg-slate-900/90 backdrop-blur-sm p-8 rounded-lg shadow-2xl w-full max-w-md border border-green-700/30">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-400">Acesso ao Sistema</h1>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
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
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors font-medium"
          >
            Entrar
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Não possui conta?{' '}
          <Link className="text-green-400 hover:text-green-300 hover:underline font-medium" to="/register">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}