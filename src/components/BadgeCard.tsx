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
    <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-4 text-primary">Crachá de Estacionamento</h2>
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Nome:</span> {name}
        </p>
        <p>
          <span className="font-semibold">Modelo:</span> {vehicle.model}
        </p>
        <p>
          <span className="font-semibold">Cor:</span> {vehicle.color}
        </p>
        <p>
          <span className="font-semibold">Placa:</span> {vehicle.plate.toUpperCase()}
        </p>
        <p>
          <span className="font-semibold">Vaga:</span> {vehicle.parkingNumber || '—'}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {vehicle.titular ? 'Titular' : 'Reserva'}
        </p>
      </div>
    </div>
  );
}