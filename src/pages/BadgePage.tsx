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
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-700 mb-4">Usuário não encontrado.</p>
          <Link to="/admin" className="text-accent hover:underline">Voltar</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <BadgeCard user={user} />
      <Link to="/admin" className="mt-6 text-accent hover:underline">Voltar para administração</Link>
    </div>
  );
}