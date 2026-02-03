import type { User } from "../types";

interface BadgeCardProps {
  user: User;
}

/**
 * Exibe um crachá com informações do usuário e do veículo.
 * Inclui nome, modelo, cor, placa, número da vaga e indicação de titularidade.
 */
export default function BadgeCard({ user }: BadgeCardProps) {
  const { name, vehicle } = user;
  return (
    <div className="w-80 bg-slate-900/90 backdrop-blur-sm rounded-lg shadow-2xl border border-green-700/30 p-6">
      <h2 className="text-xl font-bold mb-4 text-green-400">Crachá de Estacionamento</h2>
      <div className="space-y-2 text-sm text-gray-100">
        <p>
          <span className="font-semibold text-green-400">Nome:</span> {name}
        </p>
        <p>
          <span className="font-semibold text-green-400">Modelo:</span> {vehicle.model}
        </p>
        <p>
          <span className="font-semibold text-green-400">Cor:</span> {vehicle.color}
        </p>
        <p>
          <span className="font-semibold text-green-400">Placa:</span> {vehicle.plate.toUpperCase()}
        </p>
        <p>
          <span className="font-semibold text-green-400">Vaga:</span> {vehicle.parkingNumber || '—'}
        </p>
        <p>
          <span className="font-semibold text-green-400">Status:</span> {vehicle.titular ? 'Titular' : 'Reserva'}
        </p>
      </div>
    </div>
  );
}