import React from "react"
import { XmlProps } from "react-native-svg"
import { IconBasic } from "./IconBase"

type TrashIconProps = Omit<XmlProps, "xml">

const trashIcon = `<svg fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.25 3C9.25 2.58579 9.58579 2.25 10 2.25H14C14.4142 2.25 14.75 2.58579 14.75 3V3.75H19C19.4142 3.75 19.75 4.08579 19.75 4.5C19.75 4.91421 19.4142 5.25 19 5.25H5C4.58579 5.25 4.25 4.91421 4.25 4.5C4.25 4.08579 4.58579 3.75 5 3.75H9.25V3Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.2399 7.94478C6.26803 7.69157 6.48206 7.5 6.73684 7.5H17.2632C17.5179 7.5 17.732 7.69157 17.7601 7.94478L17.9602 9.74613C18.321 12.9931 18.321 16.2701 17.9602 19.517L17.9405 19.6944C17.8091 20.8769 16.8926 21.8199 15.7143 21.9849C13.2501 22.3299 10.7499 22.3299 8.28574 21.9849C7.10737 21.8199 6.19085 20.8769 6.05945 19.6944L6.03975 19.517C5.67897 16.2701 5.67897 12.9931 6.03975 9.74613L6.2399 7.94478ZM10.75 11.4C10.75 10.9858 10.4142 10.65 10 10.65C9.58579 10.65 9.25 10.9858 9.25 11.4L9.25 18.4C9.25 18.8142 9.58579 19.15 10 19.15C10.4142 19.15 10.75 18.8142 10.75 18.4L10.75 11.4ZM14.75 11.4C14.75 10.9858 14.4142 10.65 14 10.65C13.5858 10.65 13.25 10.9858 13.25 11.4V18.4C13.25 18.8142 13.5858 19.15 14 19.15C14.4142 19.15 14.75 18.8142 14.75 18.4V11.4Z"/>
</svg>`

export const TrashIcon = (props: TrashIconProps) => (
  <IconBasic height="30" width="30" viewBox="0 0 20 20" xml={trashIcon} {...props} />
)
