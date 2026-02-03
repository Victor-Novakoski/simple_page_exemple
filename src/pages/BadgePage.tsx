import { useParams, Link } from 'react-router-dom';
import BadgeCard from '../components/BadgeCard';
import type { User } from '../types';

interface BadgePageProps {
  users: User[];
}

/**
 * Página responsável por exibir o crachá de um usuário específico.
 * O ID é obtido a partir dos parâmetros da rota.
 */
export default function BadgePage({ users }: BadgePageProps) {
  const { id } = useParams();
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-green-900">
        <div className="bg-slate-900/90 backdrop-blur-sm p-6 rounded-lg shadow-2xl text-center border border-green-700/30">
          <p className="text-gray-100 mb-4">Usuário não encontrado.</p>
          <Link to="/admin" className="text-green-400 hover:text-green-300 hover:underline">Voltar</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-green-900 py-8 px-4">
      <BadgeCard user={user} />
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600 transition-colors font-medium"
        >
          Imprimir Crachá
        </button>
        <Link to="/admin" className="px-4 py-2 bg-slate-700 text-gray-100 rounded-md hover:bg-slate-600 transition-colors font-medium">
          Voltar para administração
        </Link>
      </div>
    </div>
  );
}