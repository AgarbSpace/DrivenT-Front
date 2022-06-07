import useAsync from '../useAsync';
import useToken from '../useToken';

import * as enrollmentApi from '../../services/enrollmentApi';

export default function useTypeOfEnrollment() {
  const token = useToken();
  const {
    data: typeOfEnrollment,
    loading: typeOfEnrollmentLoading,
    error: typeOfEnrollmentError,
    act: getTypeOfEnrollment
  } = useAsync((data) => enrollmentApi.getTypeOfEnrollment(data, token));

  return {
    typeOfEnrollment,
    typeOfEnrollmentLoading,
    typeOfEnrollmentError,
    getTypeOfEnrollment
  };
}
