import useAsync from '../useAsync';

import * as hotelApi from '../../services/hotelApi';

export default function useHotel() {
  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
  } = useAsync(hotelApi.getHotelsInfo);

  return {
    hotels,
    hotelsLoading,
    hotelsError,
  };
}
