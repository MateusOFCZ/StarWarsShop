import * as Yup from 'yup';
import messages from './ErrorMessages';

const ValidationShape = {
  name: Yup.string().required(messages.name),
  lastName: Yup.string().required(messages.lastName),
};

const BuildShape = Yup.object().shape(ValidationShape);

export default BuildShape;