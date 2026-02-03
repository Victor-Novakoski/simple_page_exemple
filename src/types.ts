/**
 * Tipos usados pelo sistema de controle de estacionamento.
 */

export interface Vehicle {
  /** Tipo de veículo: carro ou moto */
  type: 'carro' | 'moto';
  /** Modelo do veículo (ex.: Corolla, CG 160) */
  model: string;
  /** Cor do veículo */
  color: string;
  /** Placa (no formato AAA0A00) */
  plate: string;
  /** Documento do veículo opcional (apenas no cadastro; não será enviado ao back‑end nesta versão) */
  document?: File;
  /** Número da vaga atribuído pelo administrador */
  parkingNumber?: string;
  /** Indica se o veículo é titular (true) ou reserva (false) */
  titular?: boolean;
}

export interface User {
  /** Identificador interno gerado no front-end */
  id: number;
  /** Nome completo do usuário */
  name: string;
  /** CPF (usado para login) */
  cpf: string;
  /** Senha (armazenada apenas no front-end para fins de demonstração) */
  password: string;
  /** Dados do veículo associado ao usuário */
  vehicle: Vehicle;
}