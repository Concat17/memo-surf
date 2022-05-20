import React from "react"
import { XmlProps } from "react-native-svg"
import { IconBasic } from "./IconBase"

type SettingsIconProps = Omit<XmlProps, "xml">

const settings = `<svg fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.29166 9.99999C7.29166 8.50421 8.50422 7.29165 9.99999 7.29165C11.4958 7.29165 12.7083 8.50421 12.7083 9.99999C12.7083 11.4958 11.4958 12.7083 9.99999 12.7083C8.50422 12.7083 7.29166 11.4958 7.29166 9.99999Z"  />
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.55059 1.53208C9.79628 1.27788 10.2037 1.27788 10.4494 1.53208L12.593 3.74999H15.625C15.9702 3.74999 16.25 4.02981 16.25 4.37499V7.40698L18.4679 9.55058C18.7221 9.79626 18.7221 10.2037 18.4679 10.4494L16.25 12.593V15.625C16.25 15.9702 15.9702 16.25 15.625 16.25H12.593L10.4494 18.4679C10.2037 18.7221 9.79628 18.7221 9.55059 18.4679L7.40699 16.25H4.375C4.02982 16.25 3.75 15.9702 3.75 15.625V12.593L1.5321 10.4494C1.2779 10.2037 1.2779 9.79626 1.5321 9.55058L3.75 7.40698V4.37499C3.75 4.02981 4.02982 3.74999 4.375 3.74999H7.40699L9.55059 1.53208ZM9.99999 6.04165C7.81387 6.04165 6.04166 7.81386 6.04166 9.99999C6.04166 12.1861 7.81387 13.9583 9.99999 13.9583C12.1861 13.9583 13.9583 12.1861 13.9583 9.99999C13.9583 7.81386 12.1861 6.04165 9.99999 6.04165Z"/>
</svg>
`
export const SettingsIcon = (props: SettingsIconProps) => (
  <IconBasic height="30" width="30" viewBox="0 0 20 20" xml={settings} {...props} />
)