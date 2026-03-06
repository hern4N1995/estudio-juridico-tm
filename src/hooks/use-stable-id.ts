import { useId as useReactId } from 'react';
import { useEffect, useState } from 'react';

/**
 * Hook que proporciona un ID estable entre cliente y servidor
 * Evita errores de hidratación de React
 */
export function useStableId(prefix = '') {
  const reactId = useReactId();
  const [id, setId] = useState<string>('');

  useEffect(() => {
    // Solo establecer el ID en el cliente después de que se haya hidratado
    setId(prefix ? `${prefix}-${reactId}` : reactId);
  }, [reactId, prefix]);

  // Retornar el ID del servidor durante SSR, el ID real en el cliente
  return id || (prefix ? `${prefix}-ssr` : 'ssr-id');
}
