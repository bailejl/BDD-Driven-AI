import React from 'react';
import {useProviderFormData, formDataContext} from '@services';

import './form-wizard-context.module.scss';

export interface FormWizardContextProps {
  children: React.ReactNode
}

// This makes the form data available to all the form sections.  Each form 
// section is its own page in the new credit card wizard UI.  This allows 
// section to append data and do validation when the form is submitted.  
export const FormWizardContext = (props: FormWizardContextProps) => {
  const formData = useProviderFormData();
  return (
    <formDataContext.Provider value={formData}>
      {props.children}
    </formDataContext.Provider>
  );
}

export default FormWizardContext;
