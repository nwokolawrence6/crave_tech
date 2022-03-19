/** @format */
import React, { ReactNode, Fragment} from 'react';
import {Field, Form as FormikForm, Formik} from 'formik';
import {ButtonProps} from "semantic-ui-react";
import {FormikHelpers} from "formik/dist/types";
import {Button, Form} from "semantic-ui-react";
import styled from "styled-components";

export interface IFormsInputs extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, React.AriaAttributes {
  as: ReactNode | string
  options?: object
  name: string
  icon?: string | ReactNode
}

interface IErrors {
  [key: string]: [key: string]
}

interface CustomFormInterface {
  title?: string
  enableReinitialize?: boolean
  initialValues: object | any,
  validationSchema: object
  onSubmitFunction: ((values: object[], formikHelpers: FormikHelpers<object[]>) => (void | Promise<any>)) & ((values: object[], formikHelpers: FormikHelpers<object[]>) => any)
  formInputs: Array<IFormsInputs>
  btnText?: string
  loading: boolean
  disabled?: boolean
  btnProps?: ButtonProps
}

const defaultProps = {
  disabled: false,
  dashForm: false,
  noPaddedForm: false
}
const CustomForm = (props: CustomFormInterface & typeof defaultProps) => {
  return (
    <>
      <Formik
        validateOnChange={false}
        enableReinitialize={props.enableReinitialize }
        initialValues={props.initialValues}
        validationSchema={props.validationSchema}
        onSubmit={props.onSubmitFunction}>
        {({errors, setFieldValue, handleSubmit}) => (
          <Form as={FormikForm}>
            <Title className="login100-form-title">
              {props.title}
            </Title>
            {props.formInputs &&
              props.formInputs.map(
                ({name, placeholder, type, as, options, icon}, i) => (
                  <Fragment key={name}>
                    <Field
                      onChange={(e: any, secondaryValue: any) => {
                        setFieldValue(name, e.target?.value || e.value || secondaryValue?.value);
                      }}
                      icon={icon}
                      error={(errors as unknown as IErrors)[name]}
                      as={as || 'input'}
                      {...(options || null)}
                      placeholder={placeholder}
                      name={name}
                      type={type}
                    />
                  </Fragment>
                )
              )}
            {props.btnText && (
              <Button type="submit" onClick={() => handleSubmit()} {...props.btnProps}
                      disabled={props.loading || props.disabled} loading={props.loading} className="form-button">
                {props.btnText}
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};
const Title = styled.span`
  font-size: 22px;
  line-height: 44px;
`
CustomForm.defaultProps = defaultProps
export default CustomForm;
