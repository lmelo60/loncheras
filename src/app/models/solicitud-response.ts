import { TipoAlimento } from './tipo-alimento';
export interface SolicitudResponse {
    HijoId: number;
    HijoNombre: string;
    SolicitudId: number;
    TipoAlimento: Array<TipoAlimento>;
    UsuarioNombre: string;
    gx_md5_hash: string;
}
