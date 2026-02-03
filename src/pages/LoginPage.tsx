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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">Acesso ao Sistema</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
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
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-dark transition-colors font-medium"
          >
            Entrar
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Não possui conta?{' '}
          <Link className="text-accent hover:underline font-medium" to="/register">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}