import { TipoAlimento } from './tipo-alimento';
export interface SolicitudResponse {
    HijoId: number;
    HijoNombre: string;
    SolicitudEstado: boolean;
    SolicitudId: number;
    TipoAlimento: Array<TipoAlimento>;
    UsuarioNombre: string;
    gx_md5_hash: string;
}
