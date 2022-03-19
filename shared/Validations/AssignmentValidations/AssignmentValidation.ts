import * as yup from "yup";

const addCompanyValidation = yup.object().shape({
  name: yup.string().required("provide company name"),
  address: yup.string().required("Provide company address"),
})
const addStageAndStepsValidation = yup.object().shape({
  stage: yup.string().required("provide company name"),
  steps: yup.array().of(yup.string().required()).required(),
})

export {addCompanyValidation, addStageAndStepsValidation}
