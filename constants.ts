import { HistoryItem, MapMarkerData } from './types';

export const HISTORY_DATA: HistoryItem[] = [
  {
    id: '1',
    timestamp: 'Hace 20 minutos',
    locationName: 'S58b-e4, Sector Guamaní',
    address: 'La Venecia 1'
  },
  {
    id: '2',
    timestamp: 'Hace 45 minutos',
    locationName: 'Av. Maldonado',
    address: 'Morán Valverde, Sur de Quito'
  },
  {
    id: '3',
    timestamp: 'Ayer, 18:30',
    locationName: 'Campus EPN',
    address: 'Ladrón de Guevara'
  }
];

export const MARKERS: MapMarkerData[] = [
  {
    id: 'current',
    top: '50%',
    left: '55%',
    color: '#2D5BFF', // Secondary
    label: 'Ubicación Actual',
    isCurrent: true
  },
  {
    id: 'loc1',
    top: '75%',
    left: '45%',
    color: '#FF2D5B', // Red-ish
    label: 'Hace 20 min - Guamaní'
  },
  {
    id: 'loc2',
    top: '65%',
    left: '50%',
    color: '#FFB800', // Amber
    label: 'Hace 45 min - Av. Maldonado'
  }
];

export const MAP_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuCx33cx8-lrSTDNs-pPRBxE7jmn2a_amrjLHvMUE2jj6dOBcWlpeYnueTBrsMfFa0cipEojmeAwgFY2guPhz4vnJplgBO9T61P1T9QQnyzyGT9wXcD8oXpsvyWqmH8GVsvlrUO0vFjR1KCMHAVHlcmROlBWgDcLpsGqrDxy-WRzMe0poBXWo6QaSZy5Iwb7PORPOAb_GvcAdUyWth76biRkMGJOKKyvft1vqSdrQDnlP3B5r59CUTm3DXv9vf3x05cMuOiOwAeM9E8";

export const USER_IMAGE_URL = "https://picsum.photos/100/100"; 
export const LOGO_IMAGE_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuA7rZTwkukSPGzBRkKKeIXcZecPdqYuGM_ENWBkjkxd_WVt7Ls99NcixHgWIRm8Mmtjw8FhCLoK7tNMM4Y-We1uLXbDzmIuJH6weFZ_gdPutlFmH-zYFrIsXCUiZh9Vqp44j2O4Xk1ibNbNifwOzulB5pZ2FiyntJ0oNpKc8qghY9eMs6pELGSIRwcQ3efkvycYj_D1xLR8pZRqt_bd-h4srfgqtt3DtH7-kOX3QUxkbXY_G3VB-KO-NlZRjnl_XVX-BbIYaeRXsAY";
