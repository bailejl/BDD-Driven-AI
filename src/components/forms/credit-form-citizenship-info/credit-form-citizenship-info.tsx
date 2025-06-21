import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { createApplicationData, useFormData } from '@services'

/* eslint-disable-next-line */
export interface CreditFormCitizenshipInfoProps {}

type CitizenshipInputs = {
  countryOfCitizenShip: string
  countryOfCitizenShipSecondary: string
}

// Data validation functions for the data in this section of the form.
const schema = yup.object().shape({
  countryOfCitizenShip: yup
    .string()
    .required()
    .min(2)
    .matches(/^[A-Za-z .]+$/i),
  countryOfCitizenShipSecondary: yup
    .string()
    .required()
    .min(2)
    .matches(/^[A-Za-z .]+$/i),
})

export const CreditFormCitizenshipInfo = () => {
  const { register, handleSubmit, setValue, formState } =
    useForm<CitizenshipInputs>({
      resolver: yupResolver(schema),
    })
  const { errors = {} } = formState || {}
  const formData = useFormData()
  const navigate = useNavigate()
  const [countryOfCitizenShip, setCountryOfCitizenShip] = React.useState('')
  const [countryOfCitizenShipSecondary, setCountryOfCitizenShipSecondary] =
    React.useState('')

  const cachedData = formData?.data || createApplicationData()

  // Submit this stage of the form and go to the next page
  const onSubmit = (data: CitizenshipInputs) => {
    formData?.appendFormData(data)
    navigate('/user/form/employment')
  }

  // These input fields need special handling to get similar behaviors to
  // other inputs, specifically how cached data is handled.
  const handleChangeCountryOfCitizenShip = (e: SelectChangeEvent<string>) => {
    const newSelection = e.target.value
    setValue('countryOfCitizenShip', newSelection, { shouldDirty: true })
    setCountryOfCitizenShip(newSelection)
    cachedData.countryOfCitizenShip = newSelection
    formData?.appendFormData(cachedData)
  }

  // These input fields need special handling to get similar behaviors to
  // other inputs, specifically how cached data is handled.
  const handleChangeCountryOfCitizenShipSecondary = (
    e: SelectChangeEvent<string>
  ) => {
    const newSelection = e.target.value
    setCountryOfCitizenShipSecondary(newSelection)
    setValue('countryOfCitizenShipSecondary', newSelection, {
      shouldDirty: true,
    })
    cachedData.countryOfCitizenShipSecondary = newSelection
    formData?.appendFormData(cachedData)
  }

  // This code adds the cache data handling, so these inputs behave similar to
  // other inputs.
  React.useEffect(() => {
    register('countryOfCitizenShip') // custom register and input
    register('countryOfCitizenShipSecondary') // custom register and input
    if (cachedData.countryOfCitizenShip) {
      setValue('countryOfCitizenShip', cachedData.countryOfCitizenShip, {
        shouldDirty: true,
      })
      setCountryOfCitizenShip(cachedData.countryOfCitizenShip)
    }
    if (cachedData.countryOfCitizenShipSecondary) {
      setValue(
        'countryOfCitizenShipSecondary',
        cachedData.countryOfCitizenShipSecondary,
        { shouldDirty: true }
      )
      setCountryOfCitizenShipSecondary(cachedData.countryOfCitizenShipSecondary)
    }
  }, [
    register,
    cachedData.countryOfCitizenShip,
    setCountryOfCitizenShip,
    setCountryOfCitizenShipSecondary,
    cachedData.countryOfCitizenShipSecondary,
    setValue,
  ])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5">Citizenship Information</Typography>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <FormControl>
          <InputLabel id="citizenship-country-label">
            Country of Citizenship
          </InputLabel>
          <Select
            name="countryOfCitizenShip"
            required
            native
            labelId="citizenship-country-label"
            onChange={handleChangeCountryOfCitizenShip}
            error={errors.countryOfCitizenShip?.message !== undefined}
            value={countryOfCitizenShip}
          >
            <option aria-label="None" value="" />
            <option value="AR">Argentina</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermuda</option>
            <option value="BO">Bolivia</option>
            <option value="BR">Brazil</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CO">Colombia</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">Côte D&apos; Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="EE">Estonia</option>
            <option value="ET">Ethiopia</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GM">Gambia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GB">Great Britain</option>
            <option value="GR">Greece</option>
            <option value="GT">Guatemala</option>
            <option value="GN">Guinea</option>
            <option value="GY">Guyana</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hong Kong</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JO">Jordan</option>
            <option value="KE">Kenya</option>
            <option value="KW">Kuwait</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="MX">Mexico</option>
            <option value="MA">Morocco</option>
            <option value="NL">Netherlands</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PA">Panama</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="PR">Puerto Rico</option>
            <option value="QA">Qatar</option>
            <option value="KR">Republic of Korea</option>
            <option value="RO">Romania</option>
            <option value="RU">Russian Federation</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="ZA">South Africa</option>
            <option value="ES">Spain</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="SR">Surinam</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syria</option>
            <option value="SY">Syrian Arab Republic</option>
            <option value="TW">Taiwan, Province of China</option>
            <option value="TZ">Tanzania</option>
            <option value="TH">Thailand</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="TN">Tunisia</option>
            <option value="TR">Turkey</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="US">United States</option>
            <option value="UY">Uruguay</option>
            <option value="VE">Venezuela</option>
            <option value="VN">Vietnam</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
          </Select>
          <FormHelperText>
            {errors.countryOfCitizenShip?.message}
          </FormHelperText>
        </FormControl>

        <FormControl>
          <InputLabel id="second-citizenship-country-label">
            Second Country of Citizenship
          </InputLabel>
          <Select
            native
            required
            name="countryOfCitizenShipSecondary"
            id="second-citizenship-country-label"
            onChange={handleChangeCountryOfCitizenShipSecondary}
            error={errors.countryOfCitizenShipSecondary?.message !== undefined}
            value={countryOfCitizenShipSecondary}
          >
            <option aria-label="None" value="" />
            <option value="XX">Unselected</option>
            <option value="AR">Argentina</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermuda</option>
            <option value="BO">Bolivia</option>
            <option value="BR">Brazil</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CO">Colombia</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">Côte D&apos; Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="EE">Estonia</option>
            <option value="ET">Ethiopia</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GM">Gambia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GB">Great Britain</option>
            <option value="GR">Greece</option>
            <option value="GT">Guatemala</option>
            <option value="GN">Guinea</option>
            <option value="GY">Guyana</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hong Kong</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JO">Jordan</option>
            <option value="KE">Kenya</option>
            <option value="KW">Kuwait</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="MX">Mexico</option>
            <option value="MA">Morocco</option>
            <option value="NL">Netherlands</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PA">Panama</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="PR">Puerto Rico</option>
            <option value="QA">Qatar</option>
            <option value="KR">Republic of Korea</option>
            <option value="RO">Romania</option>
            <option value="RU">Russian Federation</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="ZA">South Africa</option>
            <option value="ES">Spain</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="SR">Surinam</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syria</option>
            <option value="SY">Syrian Arab Republic</option>
            <option value="TW">Taiwan, Province of China</option>
            <option value="TZ">Tanzania</option>
            <option value="TH">Thailand</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="TN">Tunisia</option>
            <option value="TR">Turkey</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="US">United States</option>
            <option value="UY">Uruguay</option>
            <option value="VE">Venezuela</option>
            <option value="VN">Vietnam</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
          </Select>
          <FormHelperText>
            {errors.countryOfCitizenShip?.message}
          </FormHelperText>
        </FormControl>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}
        >
          <Button variant="contained">Cancel</Button>
          <Button variant="contained" color="secondary">
            Previous
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreditFormCitizenshipInfo
