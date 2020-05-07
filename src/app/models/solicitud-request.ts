import { AlimentoCombo } from './alimento-combo';
export interface SolicitudRequest {
    HijoId: number;
    TipoAlimento: Array<AlimentoCombo>;
}
