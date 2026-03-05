import { NativeSelect as ChakraNativeSelect } from "@chakra-ui/react"
import * as React from "react"

// Упрощенный Root без лишних интерфейсов
export const NativeSelectRoot = (props: ChakraNativeSelect.RootProps) => {
  return (
    <ChakraNativeSelect.Root {...props}>
      {props.children}
    </ChakraNativeSelect.Root>
  )
}

// Поле выбора с индикатором (стрелочкой) внутри
export const NativeSelectField = React.forwardRef<
  HTMLSelectElement,
  ChakraNativeSelect.FieldProps
>(function NativeSelectField(props, ref) {
  const { children, ...rest } = props
  return (
    <>
      <ChakraNativeSelect.Field ref={ref} {...rest}>
        {children}
      </ChakraNativeSelect.Field>
      <ChakraNativeSelect.Indicator />
    </>
  )
})